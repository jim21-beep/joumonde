// ==================== USER ACCOUNT SYSTEM ====================
// Powered by Supabase Auth + Database

// User State
let currentUser = null;

function accountT(key, fallback) {
    if (typeof window.t === 'function') {
        const translated = window.t(key);
        if (translated && translated !== key) return translated;
    }
    return fallback;
}

// Expose current user id for other scripts (e.g. checkout/order save flow).
window.getCurrentUserId = function getCurrentUserId() {
    return currentUser && currentUser.id ? currentUser.id : null;
};

window.getCurrentShippingCountry = function getCurrentShippingCountry() {
    if (!currentUser || !Array.isArray(currentUser.addresses)) return null;
    const defaultAddress = currentUser.addresses.find(address => address.isDefault)
        || currentUser.addresses[0];
    return defaultAddress?.country?.trim() || null;
};

function refreshCartShippingProgress() {
    if (typeof window.updateCart === 'function') window.updateCart();
}

function getAvatarStorageKey(userId) {
    return `profileAvatar_${userId}`;
}

function getUserInitials(firstName, lastName) {
    const first = (firstName || '').trim().charAt(0);
    const last = (lastName || '').trim().charAt(0);
    return `${first}${last}`.toUpperCase() || 'U';
}

function getDashboardAvatarMarkup() {
    const initials = getUserInitials(currentUser?.firstName, currentUser?.lastName);
    if (currentUser?.avatarUrl) {
        return `<img src="${currentUser.avatarUrl}" alt="Profilbild" class="user-avatar-large-image">`;
    }
    return `<span>${initials}</span>`;
}

// ==================== AUTHENTICATION ====================

// Profil + Daten aus Supabase laden und currentUser befüllen
// isActualLogin = false when restoring session on page load (no notification, no language override)
async function loginUser(supabaseUser, isActualLogin = true) {
    const [profileRes, addressesRes, ordersRes] = await Promise.all([
        supabaseClient.from('profiles').select('*').eq('id', supabaseUser.id).single(),
        supabaseClient.from('addresses').select('*').eq('user_id', supabaseUser.id),
        supabaseClient.from('orders').select('*, order_items(*)').eq('user_id', supabaseUser.id).order('created_at', { ascending: false })
    ]);

    const profile   = profileRes.data || {};
    const addresses = addressesRes.data || [];
    const orders    = ordersRes.data || [];

    currentUser = {
        id:         supabaseUser.id,
        email:      supabaseUser.email,
        firstName:  profile.first_name || '',
        lastName:   profile.last_name  || '',
        avatarUrl:  localStorage.getItem(getAvatarStorageKey(supabaseUser.id)) || null,
        preferences: {
            newsletter:      profile.newsletter      || false,
            defaultCurrency: profile.default_currency || 'CHF',
            defaultSize:     profile.default_size || localStorage.getItem('defaultTopSize') || localStorage.getItem('defaultSize') || null,
            defaultTopSize:  profile.default_size || localStorage.getItem('defaultTopSize') || localStorage.getItem('defaultSize') || null,
            defaultPantsSize: supabaseUser.user_metadata?.defaultPantsSize || localStorage.getItem('defaultPantsSize') || null
        },
        addresses: addresses.map(a => ({
            id: a.id, firstName: a.first_name || '', lastName: a.last_name || '',
            company: a.company || '', street: a.street, addressExtra: a.address_extra || '',
            zip: a.zip, city: a.city, country: a.country, phone: a.phone,
            isDefault: a.is_default
        })),
        orderHistory: orders.map(o => ({
            id: o.id, date: o.created_at, status: o.status,
            total: parseFloat(o.total || 0), currency: o.currency,
            paymentMethod: o.payment_method || null,
            items: (o.order_items || []).map(i => ({
                name:          i.product_name,
                price:         parseFloat(i.unit_price || 0),
                quantity:      i.quantity,
                size:          i.size,
                color:         i.color,
                articleNumber: i.article_number
            }))
        }))
    };

    // Only apply profile preferences and show notification on actual login,
    // not on page-load session restore (localStorage already has correct values)
    if (typeof setPreferredSizes === 'function') {
        setPreferredSizes(currentUser.preferences.defaultTopSize, currentUser.preferences.defaultPantsSize);
    } else if (typeof setPreferredSize === 'function') {
        setPreferredSize(currentUser.preferences.defaultTopSize);
    }

    if (isActualLogin) {
        if (currentUser.preferences.defaultCurrency && typeof changeCurrency === 'function')
            changeCurrency(currentUser.preferences.defaultCurrency);
    }

    // Wishlist: load user's own wishlist from localStorage namespace
    const userWishlistKey = `wishlist_${supabaseUser.id}`;
    const anonymousWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const userWishlist = JSON.parse(localStorage.getItem(userWishlistKey) || '[]');
    // Merge anonymous items that are not already in user wishlist
    const mergedWishlist = [...userWishlist];
    anonymousWishlist.forEach(item => {
        if (!mergedWishlist.some(w => w.name === item.name)) mergedWishlist.push(item);
    });
    if (typeof wishlist !== 'undefined') {
        wishlist = mergedWishlist;
        localStorage.setItem(userWishlistKey, JSON.stringify(wishlist));
        localStorage.removeItem('wishlist');
        if (typeof updateWishlistCount === 'function') updateWishlistCount();
    }

    updateAccountUI();
    refreshCartShippingProgress();
    if (isActualLogin) {
        showNotification(`${accountT('accountWelcomeBack', 'Willkommen zurueck')}, ${currentUser.firstName || currentUser.email}!`, 'success');
    }
}

// Logout – Supabase Auth
window.logoutUser = async function logoutUser(scope = 'local') {
    // Save user's wishlist under their ID namespace before logout
    if (currentUser && currentUser.id && typeof wishlist !== 'undefined') {
        localStorage.setItem(`wishlist_${currentUser.id}`, JSON.stringify(wishlist));
    }
    const { error } = await supabaseClient.auth.signOut({ scope });
    if (error) {
        showNotification(accountT('accountLogoutError', 'Abmelden fehlgeschlagen. Bitte versuche es erneut.'), 'error');
        return;
    }
    if (typeof wishlist !== 'undefined') wishlist = [];
    if (typeof updateWishlistCount === 'function') updateWishlistCount();
    currentUser = null;
    refreshCartShippingProgress();
    document.body.classList.remove('modal-open');
    window.location.href = 'account.html';
}

// Update Account UI
function updateAccountUI() {
    const accountBtn = document.querySelector('.account-btn');
    if (!accountBtn) return;
    
    if (currentUser) {
        // User is logged in
        accountBtn.innerHTML = `
            <div style="position: relative;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span style="position: absolute; top: -5px; right: -5px; width: 8px; height: 8px; background: #4caf50; border-radius: 50%; border: 2px solid white;"></span>
            </div>
        `;
        accountBtn.setAttribute('title', [currentUser.firstName, currentUser.lastName].filter(Boolean).join(' ') || currentUser.email);
    } else {
        // User is logged out
        accountBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        `;
        accountBtn.setAttribute('title', accountT('accountLogin', 'Anmelden'));
    }
}

// Show Account Message
function showAccountMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `account-message ${type}`;
    messageDiv.setAttribute('role', type === 'error' ? 'alert' : 'status');
    messageDiv.textContent = message;
    
    const messageTarget = document.querySelector('.account-modal .auth-modal-panel')
        || document.querySelector('.account-modal .contact-modal-content')
        || document.querySelector('.account-auth-panel');
    if (!messageTarget) return;

    const existingMessage = messageTarget.querySelector('.account-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const firstForm = messageTarget.querySelector('.account-auth-form');
    messageTarget.insertBefore(messageDiv, firstForm || messageTarget.firstChild);
    
    if (type === 'error') {
        setTimeout(() => messageDiv.remove(), 3000);
    }
}

async function sendAccountLoginCode(resend = false) {
    const emailInput = document.getElementById('account-login-email');
    const submitButton = document.getElementById('account-send-code');
    const resendButton = document.getElementById('account-resend-code');
    const email = emailInput?.value.trim().toLowerCase();

    if (!window.supabaseClient?.auth) {
        showAccountMessage(accountT('accountLoginUnavailable', 'Anmeldung ist momentan nicht verfügbar. Bitte lade die Seite neu und versuche es erneut.'), 'error');
        return;
    }
    if (!emailInput?.checkValidity()) {
        emailInput?.reportValidity();
        return;
    }

    if (submitButton) submitButton.disabled = true;
    if (resendButton) resendButton.disabled = true;
    showAccountMessage(accountT('accountPageSendingCode', 'Anmeldecode wird gesendet …'), 'info');

    try {
        const { error } = await window.supabaseClient.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: true,
                emailRedirectTo: `${window.location.origin}${window.location.pathname}`
            }
        });

        if (error) {
            console.error('Email sign-in code request failed:', error.message);
            showAccountMessage(accountT('accountPageCodeSendError', 'Der Anmeldecode konnte nicht gesendet werden. Bitte versuche es erneut.'), 'error');
            return;
        }

        document.getElementById('account-login-email-value').textContent = email;
        document.getElementById('account-page-email-form').hidden = true;
        document.getElementById('account-page-code-step').hidden = false;
        document.body.classList.add('account-code-active');
        document.getElementById('account-google-login').hidden = true;
        document.querySelector('.account-auth-divider').hidden = true;
        document.getElementById('account-page-auth-title').textContent = accountT('accountPageEnterCodeTitle', 'Code eingeben');
        document.getElementById('account-page-auth-subtitle').textContent = accountT(
            'accountPageCodePrompt',
            'Gib den 6-stelligen Code ein, den wir dir per E-Mail gesendet haben.'
        );
        if (resend) {
            showAccountMessage(accountT('accountPageCodeResent', 'Wir haben dir einen neuen Code gesendet.'), 'success');
        } else {
            document.querySelector('.account-auth-panel .account-message')?.remove();
        }
        document.querySelector('.account-code-digit').focus();
    } catch (error) {
        console.error('Email sign-in code request failed:', error.message);
        showAccountMessage(accountT('accountPageCodeSendError', 'Der Anmeldecode konnte nicht gesendet werden. Bitte versuche es erneut.'), 'error');
    } finally {
        if (submitButton?.isConnected) submitButton.disabled = false;
        if (resendButton?.isConnected) resendButton.disabled = false;
    }
}

async function verifyAccountLoginCode(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const email = document.getElementById('account-login-email')?.value.trim().toLowerCase();
    const codeInputs = [...document.querySelectorAll('.account-code-digit')];
    const token = codeInputs.map(input => input.value).join('');
    const submitButton = document.getElementById('account-verify-code');

    if (!window.supabaseClient?.auth) {
        showAccountMessage(accountT('accountLoginUnavailable', 'Anmeldung ist momentan nicht verfügbar. Bitte lade die Seite neu und versuche es erneut.'), 'error');
        return;
    }
    if (!email || !/^\d{6}$/.test(token)) {
        codeInputs.find(input => !input.value)?.focus();
        return;
    }

    if (form.dataset.verifying === 'true') return;
    form.dataset.verifying = 'true';
    if (submitButton) submitButton.disabled = true;
    codeInputs.forEach(input => { input.disabled = true; });
    showAccountMessage(accountT('accountPageVerifyingCode', 'Code wird überprüft …'), 'info');

    let focusFirstCode = false;
    try {
        const { error } = await window.supabaseClient.auth.verifyOtp({
            email,
            token,
            type: 'email'
        });

        if (error) {
            showAccountMessage(accountT('accountPageInvalidCode', 'Der Code ist ungültig oder abgelaufen. Bitte prüfe ihn und versuche es erneut.'), 'error');
            codeInputs.forEach(input => { input.value = ''; });
            focusFirstCode = true;
            return;
        }

        if (typeof trackLogin === 'function') trackLogin('email_otp');
        event.target.reset();
    } catch (error) {
        console.error('Email sign-in code verification failed:', error.message);
        showAccountMessage(accountT('accountPageInvalidCode', 'Der Code ist ungültig oder abgelaufen. Bitte prüfe ihn und versuche es erneut.'), 'error');
        codeInputs.forEach(input => { input.value = ''; });
        focusFirstCode = true;
    } finally {
        if (form.isConnected) form.dataset.verifying = 'false';
        codeInputs.forEach(input => { if (input.isConnected) input.disabled = false; });
        if (submitButton?.isConnected) submitButton.disabled = false;
        if (focusFirstCode && codeInputs[0].isConnected) codeInputs[0].focus();
    }
}

function handleAccountCodeInput(event) {
    const input = event.target;
    const codeInputs = [...document.querySelectorAll('.account-code-digit')];
    const currentIndex = codeInputs.indexOf(input);
    const digits = input.value.replace(/\D/g, '');

    if (digits.length > 1) {
        digits.slice(0, codeInputs.length - currentIndex).split('').forEach((digit, offset) => {
            codeInputs[currentIndex + offset].value = digit;
        });
    } else {
        input.value = digits;
    }

    const nextEmpty = codeInputs.findIndex(codeInput => !codeInput.value);
    if (nextEmpty !== -1) {
        codeInputs[nextEmpty].focus();
    } else {
        document.getElementById('account-page-code-form').requestSubmit();
    }
}

function handleAccountCodeKeydown(event) {
    const codeInputs = [...document.querySelectorAll('.account-code-digit')];
    const index = codeInputs.indexOf(event.target);

    if (event.key === 'Backspace' && !event.target.value && index > 0) {
        codeInputs[index - 1].value = '';
        codeInputs[index - 1].focus();
    } else if (event.key === 'ArrowLeft' && index > 0) {
        event.preventDefault();
        codeInputs[index - 1].focus();
    } else if (event.key === 'ArrowRight' && index < codeInputs.length - 1) {
        event.preventDefault();
        codeInputs[index + 1].focus();
    }
}

function handleAccountCodePaste(event) {
    event.preventDefault();

    const codeInputs = [...document.querySelectorAll('.account-code-digit')];
    const pastedDigits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, codeInputs.length);
    if (!pastedDigits) return;

    codeInputs.forEach((input, index) => {
        input.value = pastedDigits[index] || '';
    });

    if (pastedDigits.length === codeInputs.length) {
        document.getElementById('account-page-code-form').requestSubmit();
    } else {
        codeInputs[pastedDigits.length].focus();
    }
}

function changeAccountLoginEmail() {
    document.querySelectorAll('.account-code-digit').forEach(input => { input.value = ''; });
    document.getElementById('account-page-code-step').hidden = true;
    document.getElementById('account-page-email-form').hidden = false;
    document.body.classList.remove('account-code-active');
    document.getElementById('account-google-login').hidden = false;
    document.querySelector('.account-auth-divider').hidden = false;
    document.querySelector('.account-auth-panel .account-message')?.remove();
    document.getElementById('account-page-auth-title').textContent = accountT('accountPageLoginTitle', 'Anmelden');
    document.getElementById('account-page-auth-subtitle').textContent = accountT('accountPageLoginSubtitle', 'Melde dich mit einem Code per E-Mail oder mit Google an.');
    document.getElementById('account-login-email').focus();
}

async function signInWithGoogle() {
    if (!window.supabaseClient?.auth) {
        showAccountMessage(accountT('accountLoginUnavailable', 'Anmeldung ist momentan nicht verfügbar. Bitte lade die Seite neu und versuche es erneut.'), 'error');
        return;
    }

    const button = document.getElementById('account-google-login');
    button.disabled = true;
    try {
        const { error } = await window.supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}${window.location.pathname}${window.location.search}`
            }
        });
        if (error) throw error;
    } catch (error) {
        console.error('Google sign-in failed:', error.message);
        showAccountMessage('Die Anmeldung mit Google ist momentan nicht verfügbar. Bitte versuche es erneut.', 'error');
        if (button.isConnected) button.disabled = false;
    }
}

function renderAccountSignInPage() {
        const accountPageRoot = document.getElementById('account-page-root');
        if (!accountPageRoot) return;

        document.body.classList.add('account-page-auth');
        document.querySelector('.account-page-avatar')?.setAttribute('hidden', '');
        accountPageRoot.innerHTML = `
            <section class="account-auth-panel" aria-labelledby="account-page-auth-title">
                <h1 id="account-page-auth-title">${accountT('accountPageLoginTitle', 'Anmelden')}</h1>
                <p class="account-auth-subtitle" id="account-page-auth-subtitle">${accountT('accountPageLoginSubtitle', 'Melde dich mit einem Code per E-Mail oder mit Google an.')}</p>

                <button type="button" class="account-google-button" id="account-google-login" onclick="signInWithGoogle()">
                    <svg viewBox="0 0 48 48" aria-hidden="true">
                        <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4 6v5h6.5c3.8-3.5 6.1-8.6 6.1-14.7z"/>
                        <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.5-5c-1.8 1.2-4.1 2-7 2-5.3 0-9.8-3.6-11.4-8.4H5.9v5.2C9.3 39.6 16.1 44 24 44z"/>
                        <path fill="#FBBC05" d="M12.6 27.8a12 12 0 0 1 0-7.6V15H5.9a20 20 0 0 0 0 18z"/>
                        <path fill="#EA4335" d="M24 11.8c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.7 29.5 4 24 4 16.1 4 9.3 8.4 5.9 15l6.7 5.2c1.6-4.8 6.1-8.4 11.4-8.4z"/>
                    </svg>
                    <span>${accountT('accountPageGoogle', 'Weiter mit Google')}</span>
                </button>

                <div class="account-auth-divider" aria-hidden="true"><span>${accountT('accountPageEmailDivider', 'oder mit E-Mail')}</span></div>

                <form id="account-page-email-form" class="account-auth-form" onsubmit="event.preventDefault(); sendAccountLoginCode()">
                    <label for="account-login-email">${accountT('accountPageEmailAddress', 'E-Mail-Adresse')}</label>
                    <input id="account-login-email" type="email" name="email" autocomplete="email" placeholder="${accountT('accountPageEmailPlaceholder', 'name@beispiel.ch')}" required>
                    <button type="submit" class="account-auth-submit" id="account-send-code">${accountT('accountPageSendCode', 'Code per E-Mail senden')}</button>
                </form>

                <div id="account-page-code-step" class="account-auth-code-step" hidden>
                    <p class="account-auth-code-copy">
                        <span>${accountT('accountPageSentTo', 'Gesendet an')}</span>
                        <strong id="account-login-email-value"></strong>
                        <button type="button" class="account-auth-change-email" onclick="changeAccountLoginEmail()">${accountT('accountPageChangeEmail', 'Ändern')}</button>
                    </p>
                    <form id="account-page-code-form" class="account-auth-form" onsubmit="verifyAccountLoginCode(event)">
                        <label class="sr-only" id="account-code-label">${accountT('accountPageCodeLabel', '6-stelliger Code')}</label>
                        <div class="account-code-inputs" role="group" aria-labelledby="account-code-label">
                            ${Array.from({ length: 6 }, (_, index) => `<input class="account-code-digit" type="text" inputmode="numeric" autocomplete="${index === 0 ? 'one-time-code' : 'off'}" pattern="[0-9]" maxlength="1" aria-label="${accountT('accountPageCodeDigit', 'Ziffer')} ${index + 1}" required oninput="handleAccountCodeInput(event)" onkeydown="handleAccountCodeKeydown(event)" onpaste="handleAccountCodePaste(event)">`).join('')}
                        </div>
                        <button type="submit" class="sr-only" id="account-verify-code">${accountT('accountPageVerifyCode', 'Anmelden')}</button>
                    </form>
                    <button type="button" class="account-auth-text-button" id="account-resend-code" onclick="sendAccountLoginCode(true)">${accountT('accountPageResendCode', 'Code erneut senden')}</button>
                </div>

                <p class="account-auth-legal">${accountT('accountPageLegal', 'Wenn du fortfährst, stimmst du unseren')} <a href="agb.html">${accountT('terms', 'AGB')}</a> ${accountT('accountPageAnd', 'und der')} <a href="cookie-policy.html">${accountT('privacyPolicy', 'Datenschutzerklärung')}</a>${accountT('accountPageAgree', 'zu.')}</p>
                <a class="account-auth-back" href="shop.html">${accountT('accountPageBackShop', 'Zurück zum Shop')}</a>
            </section>`;
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== ACCOUNT MODAL ====================

// Toggle Account Modal
function toggleAccount() {
    const modal = document.getElementById('account-modal');
    if (modal?.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        return;
    }

    window.location.href = 'account.html';
}

// Show Account Dashboard
function showAccountDashboard() {
    const accountPageRoot = document.getElementById('account-page-root');
    const modal = document.getElementById('account-modal');
    const modalContent = modal?.querySelector('.auth-modal-panel') || modal?.querySelector('.contact-modal-content');
    const pageAvatar = document.querySelector('.account-page-avatar');

    if (pageAvatar) {
        pageAvatar.innerHTML = getDashboardAvatarMarkup();
        pageAvatar.setAttribute('aria-label', `Profilbild ${getUserInitials(currentUser?.firstName, currentUser?.lastName)}`);
    }
    
    const dashboardMarkup = `
        <div class="account-dashboard">
            <div class="dashboard-header">
                <div class="user-avatar-large">${getDashboardAvatarMarkup()}</div>
                <h2>${escapeHtml([currentUser.firstName, currentUser.lastName].filter(Boolean).join(' ') || currentUser.email)}</h2>
            </div>
            
            <div class="dashboard-tabs">
                <button class="dashboard-tab active" onclick="showDashboardSection('orders')">${accountT('accountOrders', 'Bestellungen')}</button>
                <button class="dashboard-tab" onclick="showDashboardSection('profile')">${accountT('accountProfile', 'Profil')}</button>
            </div>
            
            <div class="dashboard-content">
                <div id="dashboard-profile" class="dashboard-section">
                    ${getDashboardPreferences()}
                    <div class="profile-address-section">
                        ${getDashboardAddresses()}
                    </div>
                    <section class="profile-marketing-section">
                        <form class="marketing-preferences-form" onsubmit="event.preventDefault()">
                            <div class="preferences-section-header">
                                <h3>${accountT('accountMarketingSettings', 'Marketing-Einstellungen')}</h3>
                                <span class="marketing-save-status preferences-save-status" role="status" aria-live="polite"></span>
                            </div>
                            <label class="marketing-preference-row">
                            <span class="marketing-preference-label">
                                <span class="marketing-preference-icon" aria-hidden="true">✉</span>
                                <span>${accountT('accountEmail', 'E-Mail')}</span>
                            </span>
                            <span class="marketing-toggle">
                                <input type="checkbox" name="newsletter" onchange="saveMarketingPreferences(event)" ${currentUser.preferences.newsletter ? 'checked' : ''}>
                                <span class="marketing-toggle-track" aria-hidden="true"></span>
                            </span>
                            </label>
                        </form>
                    </section>
                    ${getDashboardSizePreferences()}
                    <div class="dashboard-footer">
                        <button class="btn-logout" onclick="logoutUser()">${accountT('accountLogout', 'Abmelden')}</button>
                        <button class="btn-logout-all" onclick="logoutUser('global')">${accountT('accountLogoutAllDevices', 'Von allen Geräten abmelden')}</button>
                    </div>
                </div>
                <div id="dashboard-orders" class="dashboard-section active">
                    ${getDashboardOrders()}
                </div>
            </div>
        </div>
    `;

    if (accountPageRoot) {
        document.body.classList.remove('account-page-auth');
        document.querySelector('.account-page-avatar')?.removeAttribute('hidden');
        accountPageRoot.innerHTML = `<div class="account-page-shell account-dashboard-panel">${dashboardMarkup}</div>`;
        return;
    }

    if (!modal || !modalContent) return;
    if (modalContent.classList.contains('auth-modal-panel')) {
        modalContent.classList.add('account-dashboard-panel');
    }
    modalContent.innerHTML = `<button class="contact-close" onclick="toggleAccount()">&times;</button>${dashboardMarkup}`;
    
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

// Show Dashboard Section
function showDashboardSection(section) {
    const tabs = document.querySelectorAll('.dashboard-tab');
    const sections = document.querySelectorAll('.dashboard-section');
    const selectedTab = Array.from(tabs).find(tab => tab.getAttribute('onclick')?.includes(`'${section}'`));
    const selectedSection = document.getElementById(`dashboard-${section}`);
    if (!selectedTab || !selectedSection) return;

    tabs.forEach(tab => tab.classList.toggle('active', tab === selectedTab));
    sections.forEach(item => item.classList.toggle('active', item === selectedSection));
}

// Dashboard Orders
function getDashboardOrders() {
    if (currentUser.orderHistory.length === 0) {
        const featuredProducts = [
            'klassischer Blazer.jpg',
            'PoloCasual.jpg',
            'ripped knit zip-polo.jpg',
            'Bundfalthose.jpg',
            'Weste.jpg',
            'Quarter Zipper.jpg',
            'Strickpullover.jpg',
            'Leinenhose.jpg',
            'Kaschmirpullover.jpg',
            'oxfordhemd.jpg',
            'Wollmantel.jpg',
            'Hoodie.jpg',
            'T-Shirt.jpg',
            'Trainerhose.jpg'
        ];
        return `
            <div class="orders-welcome-card">
                <div class="orders-welcome-copy">
                    <div>
                        <h3>${accountT('accountOrdersWelcomeTitle', 'Willkommen')}</h3>
                        <p>${accountT('accountOrdersWelcomeText', 'Bereit zum Shoppen?')}</p>
                    </div>
                    <a href="shop.html?collection=old-money" class="orders-welcome-button">${accountT('accountShopNow', 'Jetzt shoppen')}</a>
                </div>
                <div class="orders-welcome-products" aria-hidden="true">
                    <div class="orders-welcome-wheel">
                        ${featuredProducts.map((image, index) => {
                            return `
                            <div class="orders-welcome-product" style="--wheel-angle: ${index * (360 / featuredProducts.length)}deg">
                                <div class="orders-welcome-product-face">
                                    <img src="assets/images/${image}" alt="" loading="lazy">
                                </div>
                            </div>
                        `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    const ordersHTML = currentUser.orderHistory.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <strong>${accountT('accountOrderPrefix', 'Bestellung')} ${order.id}</strong>
                    <span class="order-date">${new Date(order.date).toLocaleDateString('de-DE')}</span>
                </div>
                <span class="order-status status-${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name} × ${item.quantity}</span>
                        <span>CHF ${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-footer">
                <strong>${accountT('accountTotalLabel', 'Gesamt')}: CHF ${order.total.toFixed(2)}</strong>
                <button class="btn-secondary" onclick="viewOrderDetails('${order.id}')">${accountT('accountViewDetails', 'Details ansehen')}</button>
            </div>
        </div>
    `).join('');
    
    return `
        <h3>${accountT('accountOrders', 'Bestellungen')}</h3>
        <div class="orders-list">${ordersHTML}</div>
    `;
}

// Dashboard Addresses
function getDashboardAddresses() {
    const addressesHTML = currentUser.addresses.length > 0
        ? currentUser.addresses.map(addr => `
            <div class="address-card ${addr.isDefault ? 'default' : ''}">
                <span class="address-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="2.5"></circle>
                    </svg>
                </span>
                <div class="address-content">
                    <div class="address-title-line">
                        <strong>${escapeHtml([addr.firstName, addr.lastName].filter(Boolean).join(' ') || [currentUser.firstName, currentUser.lastName].filter(Boolean).join(' '))}</strong>
                        ${addr.isDefault ? `<span class="default-badge">Standard</span>` : ''}
                    </div>
                    <p class="address-single-line">${escapeHtml([
                        addr.street,
                        addr.addressExtra,
                        [addr.zip, addr.city].filter(Boolean).join(' '),
                        addr.country
                    ].filter(Boolean).join(', '))}</p>
                </div>
                <button type="button" class="address-open-button" onclick="editAddress('${addr.id}')" aria-label="${accountT('accountAddressEdit', 'Adresse bearbeiten')}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </button>
            </div>
        `).join('')
        : `<div class="empty-state"><p>${accountT('accountNoSavedAddresses', 'Keine Adressen gespeichert.')}</p></div>`;
    
    return `
        <div class="address-section-header">
            <h3>${accountT('accountAddresses', 'Adressen')}</h3>
            <button type="button" class="addresses-add-button" onclick="showAddAddressForm()">${accountT('accountAddressAddButton', 'Hinzufügen')}</button>
        </div>
        <div class="addresses-list">${addressesHTML}</div>
    `;
}

// Dashboard Preferences
function getDashboardPreferences() {
    return `
        <section class="profile-contact-section">
            <div class="profile-section-heading">
                <h3>${escapeHtml([currentUser.firstName, currentUser.lastName].filter(Boolean).join(' ') || currentUser.email || '')}</h3>
                <button type="button" class="profile-edit-button" onclick="openProfileEditDialog()">${accountT('accountAddressEdit', 'Bearbeiten')}</button>
            </div>
            <div class="profile-email-row">
                <span>${accountT('accountEmail', 'E-Mail')}</span>
                <strong>${escapeHtml(currentUser.email || '')}</strong>
            </div>
        </section>
    `;
}

function getDashboardSizePreferences() {
    return `
        <form class="preferences-form" onsubmit="event.preventDefault()">
            <div class="settings-card settings-card-compact preferences-settings-card">
                <div class="preferences-section-header">
                    <div>
                        <h4>${accountT('accountDefaultSizes', 'Meine Größen')}</h4>
                        <p class="settings-hint">${accountT('accountSettingsHintShopping', 'Deine Voreinstellungen werden automatisch gespeichert.')}</p>
                    </div>
                    <span class="preferences-save-status" role="status" aria-live="polite"></span>
                </div>
                <div class="preferences-list">
                    <label class="preference-row">
                        <span class="preference-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                                <path d="m8 4 4 2 4-2 4 2-2 5-2-1v10H8V10l-2 1-2-5 4-2Z"></path>
                            </svg>
                        </span>
                        <span class="preference-label">${accountT('accountDefaultTopSize', 'Standardgröße Oberteile')}</span>
                        <select name="defaultTopSize" aria-label="${accountT('accountDefaultTopSize', 'Standardgröße Oberteile')}" onchange="savePreferences(event)">
                            <option value="">${accountT('accountNone', 'Keine')}</option>
                            <option value="S" ${currentUser.preferences.defaultTopSize === 'S' ? 'selected' : ''}>S</option>
                            <option value="M" ${currentUser.preferences.defaultTopSize === 'M' ? 'selected' : ''}>M</option>
                            <option value="L" ${currentUser.preferences.defaultTopSize === 'L' ? 'selected' : ''}>L</option>
                            <option value="XL" ${currentUser.preferences.defaultTopSize === 'XL' ? 'selected' : ''}>XL</option>
                            <option value="XXL" ${currentUser.preferences.defaultTopSize === 'XXL' ? 'selected' : ''}>XXL</option>
                        </select>
                    </label>
                    <label class="preference-row">
                        <span class="preference-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                                <path d="M6 3h12l-1 7-2 11h-3l-1-9-1 9H7L5 10 6 3Z"></path>
                                <path d="M6 7h12M12 3v9"></path>
                            </svg>
                        </span>
                        <span class="preference-label">${accountT('accountDefaultPantsSize', 'Standardgröße Hosen')}</span>
                        <select name="defaultPantsSize" aria-label="${accountT('accountDefaultPantsSize', 'Standardgröße Hosen')}" onchange="savePreferences(event)">
                            <option value="">${accountT('accountNone', 'Keine')}</option>
                            <option value="30" ${currentUser.preferences.defaultPantsSize === '30' ? 'selected' : ''}>30</option>
                            <option value="32" ${currentUser.preferences.defaultPantsSize === '32' ? 'selected' : ''}>32</option>
                            <option value="34" ${currentUser.preferences.defaultPantsSize === '34' ? 'selected' : ''}>34</option>
                            <option value="36" ${currentUser.preferences.defaultPantsSize === '36' ? 'selected' : ''}>36</option>
                        </select>
                    </label>
                    <label class="preference-row">
                        <span class="preference-icon preference-icon-currency" aria-hidden="true">CHF</span>
                        <span class="preference-label">${accountT('accountDefaultCurrency', 'Standardwährung')}</span>
                        <select name="defaultCurrency" aria-label="${accountT('accountDefaultCurrency', 'Standardwährung')}" onchange="savePreferences(event)">
                            <option value="CHF" ${currentUser.preferences.defaultCurrency === 'CHF' ? 'selected' : ''}>CHF</option>
                            <option value="EUR" ${currentUser.preferences.defaultCurrency === 'EUR' ? 'selected' : ''}>EUR</option>
                            <option value="USD" ${currentUser.preferences.defaultCurrency === 'USD' ? 'selected' : ''}>USD</option>
                        </select>
                    </label>
                </div>
            </div>
        </form>
    `;
}

function openProfileEditDialog() {
    let dialog = document.getElementById('profile-edit-dialog');
    if (!dialog) {
        document.body.insertAdjacentHTML('beforeend', `
            <dialog class="profile-edit-dialog" id="profile-edit-dialog" aria-labelledby="profile-edit-title">
                <form class="profile-edit-form" onsubmit="saveProfileDetails(event)" oninput="updateProfileEditDirtyState(this)">
                    <div class="profile-edit-dialog-heading">
                        <h2 id="profile-edit-title">${accountT('accountProfileEditTitle', 'Profil bearbeiten')}</h2>
                        <button type="button" class="profile-edit-close" onclick="closeProfileEditDialog()" aria-label="${accountT('accountClose', 'Schließen')}">&times;</button>
                    </div>
                    <div class="profile-edit-name-fields">
                        <label>
                            <span>${accountT('accountFirstName', 'Vorname')}</span>
                            <input name="firstName" type="text" value="${escapeHtml(currentUser.firstName || '')}" autocomplete="given-name" required>
                        </label>
                        <label>
                            <span>${accountT('accountLastName', 'Nachname')}</span>
                            <input name="lastName" type="text" value="${escapeHtml(currentUser.lastName || '')}" autocomplete="family-name" required>
                        </label>
                    </div>
                    <label class="profile-edit-email-field">
                        <span>${accountT('accountEmailAddress', 'E-Mail-Adresse')}</span>
                        <input name="email" type="email" value="${escapeHtml(currentUser.email || '')}" autocomplete="email" required>
                    </label>
                    <p class="profile-edit-email-hint">${accountT('accountProfileEmailHint', 'Diese E-Mail-Adresse wird für die Anmeldung und für Bestellupdates verwendet.')}</p>
                    <p class="profile-edit-email-status" role="status" aria-live="polite"></p>
                    <div class="profile-edit-dialog-actions">
                        <button type="button" class="profile-edit-cancel" onclick="closeProfileEditDialog()">${accountT('accountProfileCancel', 'Stornieren')}</button>
                        <button type="submit" class="profile-edit-submit" disabled>${accountT('accountSave', 'Speichern')}</button>
                    </div>
                </form>
            </dialog>
        `);
        dialog = document.getElementById('profile-edit-dialog');
        dialog.addEventListener('click', event => {
            if (event.target === dialog) closeProfileEditDialog();
        });
    }

    const form = dialog.querySelector('form');
    form.elements.firstName.value = currentUser.firstName || '';
    form.elements.lastName.value = currentUser.lastName || '';
    form.elements.email.value = currentUser.email || '';
    updateProfileEditDirtyState(form);
    dialog.querySelector('.profile-edit-email-status').textContent = '';
    dialog.showModal();
    form.elements.firstName.focus();
    form.elements.firstName.select();
}

function updateProfileEditDirtyState(form) {
    const isDirty = form.elements.firstName.value.trim() !== (currentUser.firstName || '')
        || form.elements.lastName.value.trim() !== (currentUser.lastName || '')
        || form.elements.email.value.trim().toLowerCase() !== (currentUser.email || '').toLowerCase();
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = !isDirty;
}

function closeProfileEditDialog() {
    const dialog = document.getElementById('profile-edit-dialog');
    if (dialog?.open) dialog.close();
}

async function saveProfileDetails(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = form.querySelector('.profile-edit-email-status');
    const submitButton = form.querySelector('button[type="submit"]');
    const firstName = form.elements.firstName.value.trim();
    const lastName = form.elements.lastName.value.trim();
    const email = form.elements.email.value.trim().toLowerCase();
    if (!email || !currentUser) return;

    if (!firstName || !lastName) return;
    const nameChanged = firstName !== currentUser.firstName || lastName !== currentUser.lastName;
    const emailChanged = email !== currentUser.email;
    if (!nameChanged && !emailChanged) {
        closeProfileEditDialog();
        return;
    }

    if (submitButton) submitButton.disabled = true;

    if (nameChanged) {
        const { error: profileError } = await supabaseClient.from('profiles').update({
            first_name: firstName,
            last_name: lastName
        }).eq('id', currentUser.id);
        if (profileError) {
            if (submitButton) submitButton.disabled = false;
            showNotification(profileError.message || accountT('accountProfileUpdateError', 'Das Profil konnte nicht aktualisiert werden.'), 'error');
            return;
        }
        currentUser.firstName = firstName;
        currentUser.lastName = lastName;
    }

    if (emailChanged) {
        if (status) status.textContent = accountT('accountEmailUpdating', 'E-Mail wird aktualisiert …');
        const { error: emailError } = await supabaseClient.auth.updateUser({ email });
        if (emailError) {
            if (submitButton) submitButton.disabled = false;
            closeProfileEditDialog();
            showAccountDashboard();
            showDashboardSection('profile');
            showNotification(emailError.message || accountT('accountEmailUpdateError', 'Die E-Mail-Adresse konnte nicht aktualisiert werden.'), 'error');
            return;
        }
    }

    closeProfileEditDialog();
    showAccountDashboard();
    showDashboardSection('profile');
    if (emailChanged) {
        showNotification(accountT('accountEmailConfirmationSent', 'Bitte bestätige die neue E-Mail-Adresse über den zugesandten Link.'), 'info');
    } else {
        showNotification(accountT('accountProfileSaved', 'Dein Profil wurde aktualisiert.'), 'success');
    }
}

// Einstellungen in Supabase speichern
async function savePreferences(event) {
    const form = event.target.closest('.preferences-form');
    if (!form) return;
    const formData = new FormData(form);
    const saveStatus = form.querySelector('.preferences-save-status');

    const prefs = {
        defaultSize:     formData.get('defaultTopSize') || null,
        defaultTopSize:  formData.get('defaultTopSize') || null,
        defaultPantsSize: formData.get('defaultPantsSize') || null,
        defaultCurrency: formData.get('defaultCurrency')
    };

    if (saveStatus) saveStatus.textContent = accountT('accountSettingsSaving', 'Speichert …');

    const { error } = await supabaseClient.from('profiles').update({
        default_size:     prefs.defaultTopSize,
        default_currency: prefs.defaultCurrency
    }).eq('id', currentUser.id);

    if (error) {
        event.target.value = currentUser.preferences[event.target.name] || '';
        if (saveStatus) saveStatus.textContent = '';
        showNotification(accountT('accountSaveError', 'Fehler beim Speichern der Einstellungen.'), 'error');
        return;
    }

    if (prefs.defaultPantsSize !== currentUser.preferences.defaultPantsSize) {
        const { error: sizePreferenceError } = await supabaseClient.auth.updateUser({
            data: { defaultPantsSize: prefs.defaultPantsSize }
        });
        if (sizePreferenceError) {
            event.target.value = currentUser.preferences.defaultPantsSize || '';
            if (saveStatus) saveStatus.textContent = '';
            showNotification(accountT('accountSaveError', 'Fehler beim Speichern der Einstellungen.'), 'error');
            return;
        }
    }

    currentUser.preferences = { ...currentUser.preferences, ...prefs };
    // Top size is synced via profile; pants size is stored locally for now.
    if (typeof setPreferredSizes === 'function') {
        setPreferredSizes(prefs.defaultTopSize, prefs.defaultPantsSize);
    } else if (typeof setPreferredSize === 'function') {
        setPreferredSize(prefs.defaultTopSize);
    }
    if (typeof changeCurrency === 'function') changeCurrency(prefs.defaultCurrency);

    updateAccountUI();
    if (saveStatus) {
        saveStatus.textContent = accountT('accountSettingsSaved', 'Gespeichert');
        window.setTimeout(() => {
            if (saveStatus.isConnected) saveStatus.textContent = '';
        }, 2200);
    }
}

async function saveMarketingPreferences(event) {
    const checkbox = event.target;
    const newsletter = checkbox.checked;
    const saveStatus = checkbox.closest('.marketing-preferences-form')?.querySelector('.marketing-save-status');
    if (saveStatus) saveStatus.textContent = accountT('accountSettingsSaving', 'Speichert …');

    const { error } = await supabaseClient.from('profiles').update({ newsletter }).eq('id', currentUser.id);

    if (error) {
        checkbox.checked = currentUser.preferences.newsletter;
        if (saveStatus) saveStatus.textContent = '';
        showNotification(accountT('accountSaveError', 'Fehler beim Speichern der Einstellungen.'), 'error');
        return;
    }

    currentUser.preferences.newsletter = newsletter;
    if (saveStatus) {
        saveStatus.textContent = accountT('accountSettingsSaved', 'Gespeichert');
        window.setTimeout(() => {
            if (saveStatus.isConnected) saveStatus.textContent = '';
        }, 2200);
    }
}

window.refreshAccountLanguageUI = function refreshAccountLanguageUI() {
    const accountPageRoot = document.getElementById('account-page-root');
    const modal = document.getElementById('account-modal');
    if (!currentUser || (!accountPageRoot && (!modal || !modal.classList.contains('active')))) return;

    const activeSection = document.querySelector('.dashboard-section.active')?.id?.replace('dashboard-', '') || 'profile';
    showAccountDashboard();
    showDashboardSection(activeSection);
};

// Add Address
function getAddressFormMarkup(address = null, addressId = null) {
    const countries = [
        { value: 'Schweiz', label: accountT('switzerland', 'Schweiz') },
        { value: 'Deutschland', label: accountT('germany', 'Deutschland') },
        { value: 'Österreich', label: accountT('austria', 'Österreich') },
        { value: 'Frankreich', label: accountT('france', 'Frankreich') },
        { value: 'Italien', label: accountT('italy', 'Italien') },
        { value: 'Andere', label: accountT('otherCountry', 'Andere') }
    ];
    const currentCountry = address?.country || accountT('switzerland', 'Schweiz');
    if (!countries.some(country => country.value === currentCountry)) {
        countries.push({ value: currentCountry, label: currentCountry });
    }
    const countryOptions = countries.map(country =>
        `<option value="${escapeHtml(country.value)}" ${country.value === currentCountry ? 'selected' : ''}>${escapeHtml(country.label)}</option>`
    ).join('');
    const isFirstAddress = !address && currentUser.addresses.length === 0;
    const heading = address
        ? accountT('accountAddressEditTitle', 'Adresse bearbeiten')
        : accountT('accountAddressAddTitle', 'Adresse hinzufügen');
    const onsubmit = address
        ? `updateAddress(event, '${addressId}')`
        : 'saveAddress(event)';

    return `
        <div class="address-form-modal" id="address-form-modal" onclick="if(event.target===this)closeAddressForm()">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${heading}</h3>
                    <button type="button" class="modal-close" onclick="closeAddressForm()" aria-label="${accountT('accountClose', 'Schließen')}">&times;</button>
                </div>
                <form onsubmit="${onsubmit}" oninput="updateAddressSaveButton(this)" onchange="updateAddressSaveButton(this)">
                    <div class="form-group country-group">
                        <label for="address-country">${accountT('accountCountryRegion', 'Land/Region')}</label>
                        <select id="address-country" name="country" required>${countryOptions}</select>
                    </div>
                    <div class="address-form-grid">
                        <div class="form-group">
                            <input type="text" name="firstName" placeholder="${accountT('accountFirstName', 'Vorname')}" value="${escapeHtml(address?.firstName || '')}" autocomplete="given-name" required>
                        </div>
                        <div class="form-group">
                            <input type="text" name="lastName" placeholder="${accountT('accountLastName', 'Nachname')}" value="${escapeHtml(address?.lastName || '')}" autocomplete="family-name" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" name="company" placeholder="${accountT('accountCompanyOptional', 'Unternehmen')}" value="${escapeHtml(address?.company || '')}" autocomplete="organization">
                    </div>
                    <div class="form-group">
                        <input type="text" name="street" placeholder="${accountT('accountStreet', 'Straße und Hausnummer')}" value="${escapeHtml(address?.street || '')}" autocomplete="address-line1" required>
                    </div>
                    <div class="form-group">
                        <input type="text" name="addressExtra" placeholder="${accountT('accountAddressExtraOptional', 'Zusätzliche Adressangaben (optional)')}" value="${escapeHtml(address?.addressExtra || '')}" autocomplete="address-line2">
                    </div>
                    <div class="address-form-grid">
                        <div class="form-group">
                            <input type="text" name="zip" placeholder="${accountT('accountPostalCode', 'Postleitzahl')}" value="${escapeHtml(address?.zip || '')}" autocomplete="postal-code" required>
                        </div>
                        <div class="form-group">
                            <input type="text" name="city" placeholder="${accountT('accountCity', 'Ort')}" value="${escapeHtml(address?.city || '')}" autocomplete="address-level2" required>
                        </div>
                    </div>
                    <label class="address-default-option">
                        <input type="checkbox" name="isDefault" ${address?.isDefault || isFirstAddress ? 'checked' : ''}>
                        <span>${accountT('accountAddressMakeDefault', 'Das ist meine Standardadresse')}</span>
                    </label>
                    <div class="form-actions">
                        ${address ? `<button type="button" onclick="deleteAddress('${addressId}')" class="address-delete-button">${accountT('accountAddressDelete', 'Löschen')}</button>` : ''}
                        <button type="button" onclick="closeAddressForm()" class="address-cancel-button">${accountT('accountAddressCancel', 'Stornieren')}</button>
                        <button type="submit" class="btn-primary" disabled>${accountT('accountSave', 'Speichern')}</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function showAddAddressForm() {
    document.body.insertAdjacentHTML('beforeend', getAddressFormMarkup());
    updateAddressSaveButton(document.querySelector('#address-form-modal form'));
}

function updateAddressSaveButton(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = !form.checkValidity();
}

async function saveAddress(event) {
    event.preventDefault();
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = accountT('accountAddressSaving', 'Speichern…'); }

    const formData = new FormData(event.target);
    const { data: authData } = await supabaseClient.auth.getUser();
    const userId = authData?.user?.id || currentUser?.id;

    if (!userId) {
        showNotification(accountT('accountSessionInvalid', 'Sitzung ungültig. Bitte melde dich erneut an.'), 'error');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }
        return;
    }

    const isFirst = currentUser.addresses.length === 0;
    const isDefault = formData.get('isDefault') === 'on' || isFirst;
    const newAddr = {
        user_id:    userId,
        first_name: formData.get('firstName'),
        last_name:  formData.get('lastName'),
        company:    formData.get('company') || null,
        street:     formData.get('street'),
        address_extra: formData.get('addressExtra') || null,
        zip:        formData.get('zip'),
        city:       formData.get('city'),
        country:    formData.get('country'),
        is_default: isDefault
    };

    let { data, error } = await supabaseClient.from('addresses').insert(newAddr).select().single();

    if (error && error.code === '23503') {
        await upsertProfileForCurrentUser(userId);
        const retry = await supabaseClient.from('addresses').insert(newAddr).select().single();
        data = retry.data;
        error = retry.error;
    }

    if (error) {
        console.error('Address insert failed:', error);
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }
        showNotification(accountT('accountAddressSaveError', 'Adresse konnte nicht gespeichert werden. Bitte versuche es erneut.'), 'error');
        return;
    }

    if (isDefault) {
        const { error: defaultError } = await supabaseClient.from('addresses')
            .update({ is_default: false }).eq('user_id', userId).neq('id', data.id);
        if (defaultError) {
            await supabaseClient.from('addresses').delete().eq('id', data.id);
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }
            showNotification(accountT('accountAddressSaveError', 'Adresse konnte nicht gespeichert werden. Bitte versuche es erneut.'), 'error');
            return;
        }
    }

    if (isDefault) currentUser.addresses.forEach(address => { address.isDefault = false; });
    currentUser.addresses.push({
        id: data.id, firstName: data.first_name, lastName: data.last_name,
        company: data.company, street: data.street, addressExtra: data.address_extra,
        zip: data.zip, city: data.city, country: data.country, phone: data.phone,
        isDefault: data.is_default
    });

    closeAddressForm();
    showAccountDashboard();
    showDashboardSection('profile');
    refreshCartShippingProgress();
    showNotification(accountT('accountAddressAdded', 'Adresse hinzugefügt!'), 'success');
}

async function upsertProfileForCurrentUser(userId) {
    const payload = {
        id: userId,
        first_name: currentUser?.firstName || '',
        last_name: currentUser?.lastName || '',
        newsletter: !!(currentUser?.preferences?.newsletter),
        default_currency: currentUser?.preferences?.defaultCurrency || 'CHF',
        default_size: currentUser?.preferences?.defaultTopSize || currentUser?.preferences?.defaultSize || null
    };

    await supabaseClient.from('profiles').upsert(payload, { onConflict: 'id' });
}

function closeAddressForm() {
    document.getElementById('address-form-modal')?.remove();
}

async function setDefaultAddress(addressId) {
    // Alle auf false, dann die gewählte auf true
    await supabaseClient.from('addresses').update({ is_default: false }).eq('user_id', currentUser.id);
    await supabaseClient.from('addresses').update({ is_default: true  }).eq('id', addressId);

    currentUser.addresses.forEach(a => a.isDefault = (a.id === addressId));
    showAccountDashboard();
    showDashboardSection('profile');
    refreshCartShippingProgress();
    showNotification(accountT('accountAddressDefaultChanged', 'Standardadresse geändert!'), 'success');
}

async function deleteAddress(addressId) {
    if (confirm(accountT('accountAddressDeleteConfirm', 'Möchtest du diese Adresse wirklich löschen?'))) {
        const { error } = await supabaseClient.from('addresses').delete().eq('id', addressId);
        if (error) { showNotification(accountT('accountAddressDeleteError', 'Adresse konnte nicht gelöscht werden.'), 'error'); return; }

        currentUser.addresses = currentUser.addresses.filter(a => a.id !== addressId);
        if (currentUser.addresses.length > 0 && !currentUser.addresses.some(a => a.isDefault)) {
            currentUser.addresses[0].isDefault = true;
            await supabaseClient.from('addresses').update({ is_default: true }).eq('id', currentUser.addresses[0].id);
        }
        showAccountDashboard();
        showDashboardSection('profile');
        refreshCartShippingProgress();
        showNotification(accountT('accountAddressDeleted', 'Adresse gelöscht!'), 'success');
    }
}

function editAddress(addressId) {
    const address = currentUser.addresses.find(a => a.id === addressId);
    if (!address) return;
    document.body.insertAdjacentHTML('beforeend', getAddressFormMarkup(address, addressId));
    updateAddressSaveButton(document.querySelector('#address-form-modal form'));
}

async function updateAddress(event, addressId) {
    event.preventDefault();
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = accountT('accountAddressUpdating', 'Speichern…'); }

    const formData = new FormData(event.target);

    const newData = {
        first_name: formData.get('firstName'),
        last_name: formData.get('lastName'),
        company: formData.get('company') || null,
        street:  formData.get('street'),
        address_extra: formData.get('addressExtra') || null,
        zip:     formData.get('zip'),
        city:    formData.get('city'),
        country: formData.get('country'),
        is_default: formData.get('isDefault') === 'on'
    };

    if (newData.is_default) {
        const { error: defaultError } = await supabaseClient.from('addresses')
            .update({ is_default: false }).eq('user_id', currentUser.id);
        if (defaultError) {
            showNotification(accountT('accountAddressUpdateError', 'Adresse konnte nicht aktualisiert werden.'), 'error');
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }
            return;
        }
    }

    const { error } = await supabaseClient.from('addresses').update(newData).eq('id', addressId);
    if (error) {
        showNotification(accountT('accountAddressUpdateError', 'Adresse konnte nicht aktualisiert werden.'), 'error');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalBtnText; }
        return;
    }

    const idx = currentUser.addresses.findIndex(a => a.id === addressId);
    if (idx !== -1) {
        currentUser.addresses.forEach(address => {
            if (newData.is_default) address.isDefault = false;
        });
        currentUser.addresses[idx] = {
            ...currentUser.addresses[idx], firstName: newData.first_name,
            lastName: newData.last_name, company: newData.company,
            street: newData.street, addressExtra: newData.address_extra,
            zip: newData.zip, city: newData.city, country: newData.country,
            isDefault: newData.is_default
        };
    }

    closeAddressForm();
    showAccountDashboard();
    showDashboardSection('profile');
    refreshCartShippingProgress();
    showNotification(accountT('accountAddressUpdated', 'Adresse aktualisiert!'), 'success');
}

async function deleteAccount() {
    if (confirm(accountT('accountDeleteConfirm', 'Möchtest du dein Konto wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.'))) {
        if (confirm(accountT('accountDeleteConfirmAgain', 'Bist du sicher? Alle deine Daten werden gelöscht.'))) {
            await supabaseClient.from('profiles').delete().eq('id', currentUser.id);
            await supabaseClient.auth.signOut();
            currentUser = null;
            updateAccountUI();
            refreshCartShippingProgress();
            showNotification(accountT('accountDeleted', 'Konto wurde gelöscht.'), 'info');
        }
    }
}

function viewOrderDetails(orderId) {
    const order = currentUser.orderHistory.find(o => o.id === orderId);
    if (!order) return;

    const existing = document.getElementById('order-details-modal');
    if (existing) existing.remove();

    const paymentLabels = { card: accountT('creditCard', 'Kreditkarte'), amex: 'American Express', paypal: 'PayPal' };
    const paymentLabel = paymentLabels[order.paymentMethod] || order.paymentMethod || '—';
    const currency = order.currency || 'CHF';
    const statusLabels = {
        pending: accountT('orderPending', 'Ausstehend'),
        Bearbeitung: accountT('orderProcessing', 'In Bearbeitung'),
        Versendet: accountT('orderShipped', 'Versendet'),
        Geliefert: accountT('orderDelivered', 'Geliefert'),
        Storniert: accountT('orderCancelled', 'Storniert'),
        'Retoure beantragt': accountT('orderReturnRequested', 'Retoure beantragt'),
        Retourniert: accountT('orderReturned', 'Retourniert')
    };
    const statusLabel = statusLabels[order.status] || order.status || '—';
    const dateLocale = { de: 'de-CH', en: 'en-GB', fr: 'fr-CH' }[typeof currentLanguage !== 'undefined' ? currentLanguage : 'de'] || 'de-CH';

    const itemsHtml = (order.items || []).map(item => `
        <div class="order-detail-row">
            <div>
                <strong>${typeof translateProductName === 'function' ? translateProductName(item.name) : item.name}</strong>
                <p>${accountT('accountQuantity', 'Menge')}: ${item.quantity}${item.size ? ` • ${accountT('accountOrderSize', 'Größe')}: ${item.size}` : ''}${item.color ? ` • ${item.color}` : ''}</p>
            </div>
            <strong>${currency} ${(item.price * item.quantity).toFixed(2)}</strong>
        </div>
    `).join('');

    const modal = document.createElement('div');
    modal.className = 'address-form-modal order-details-modal';
    modal.id = 'order-details-modal';
    modal.onclick = (event) => {
        if (event.target === modal) closeOrderDetailsModal();
    };

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div class="order-modal-title">
                    <span class="order-modal-label">${accountT('accountOrderPrefix', 'Bestellung')}</span>
                    <span class="order-modal-id">${order.id}</span>
                </div>
                <button type="button" class="modal-close" onclick="closeOrderDetailsModal()" aria-label="${accountT('accountClose', 'Schließen')}">&times;</button>
            </div>
            <div class="modal-divider"></div>
            <div class="order-detail-meta">
                <p><strong>${accountT('accountStatus', 'Status')}:</strong> ${statusLabel}</p>
                <p><strong>${accountT('accountDate', 'Datum')}:</strong> ${new Date(order.date).toLocaleDateString(dateLocale)}</p>
                <p><strong>${accountT('accountPaymentMethod', 'Zahlungsmethode')}:</strong> ${paymentLabel}</p>
                <p><strong>${accountT('accountCurrency', 'Währung')}:</strong> ${currency}</p>
            </div>
            <div class="order-detail-items">
                ${itemsHtml}
            </div>
            <div class="order-detail-total">
                <span>${accountT('accountTotalLabel', 'Gesamt')}:</span>
                <strong>CHF ${order.total.toFixed(2)}</strong>
            </div>
            <div class="form-actions">
                ${['Versendet', 'Geliefert', 'Retoure beantragt', 'Retourniert'].includes(order.status) ? '' : `<button type="button" class="btn-secondary" onclick="requestReturnFromModal('${order.id}'); closeOrderDetailsModal()">${accountT('accountReturnRequest', 'Retoure beantragen')}</button>`}
                <button type="button" class="btn-primary" onclick="closeOrderDetailsModal()">${accountT('accountClose', 'Schliessen')}</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function closeOrderDetailsModal() {
    document.getElementById('order-details-modal')?.remove();
}

function requestReturnFromModal(orderId) {
    sessionStorage.setItem('nexaraPrefill', `Ich möchte eine Retoure für Bestellung ${orderId} beantragen.`);
    window.location.assign('shop.html?openNexara=1');
}

// ==================== CHECKOUT INTEGRATION ====================

// Modified openCheckout to use user data if logged in
const originalOpenCheckout = window.openCheckout;
window.openCheckout = function() {
    if (currentUser && currentUser.addresses.length > 0) {
        const defaultAddress = currentUser.addresses.find(a => a.isDefault) || currentUser.addresses[0];
        // Pre-fill checkout form with user data
        setTimeout(() => {
            const checkoutForm = document.querySelector('.checkout-form');
            if (checkoutForm) {
                // Use positional selectors (matches DOM order in script.js checkout form)
                // [0]=Vorname [1]=Nachname [2]=Email [3]=Tel [4]=Straße [5]=PLZ [6]=Stadt [7]=Land
                const fields = checkoutForm.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
                if (fields[0]) fields[0].value = defaultAddress?.firstName || currentUser.firstName;
                if (fields[1]) fields[1].value = defaultAddress?.lastName || currentUser.lastName;
                if (fields[2]) fields[2].value = currentUser.email;
                if (defaultAddress) {
                    if (fields[4]) fields[4].value = defaultAddress.street || '';
                    if (fields[5]) fields[5].value = defaultAddress.zip || '';
                    if (fields[6]) fields[6].value = defaultAddress.city || '';
                    if (fields[3] && defaultAddress.phone) fields[3].value = defaultAddress.phone;
                }
            }
        }, 100);
    }
    
    if (originalOpenCheckout) {
        originalOpenCheckout();
    }
};

// ==================== EMAIL NOTIFICATIONS ====================

// Send Order Confirmation Email
async function sendOrderConfirmationEmail(user, order) {
    try {
        await fetch(`${window.__ENV__?.SUPABASE_URL}/functions/v1/send-newsletter-confirmation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'order-confirmation',
                email: user.email,
                firstName: user.firstName,
                orderId: order.id,
                items: order.items,
                total: order.total,
                orderDate: new Date(order.date).toLocaleString('de-DE')
            })
        });
        console.log('✅ Bestellbestätigungs-E-Mail gesendet');
    } catch (err) {
        console.log('⚠️ E-Mail-Versand fehlgeschlagen:', err);
    }
}

// Send Contact Form Email (for existing contact forms)
function sendContactEmail(name, email, message) {
    const formData = new FormData();
    formData.append('_subject', 'Neue Kontaktanfrage - Joumonde');
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    formData.append('Name', name);
    formData.append('E-Mail', email);
    formData.append('Nachricht', message);
    formData.append('Datum', new Date().toLocaleString('de-DE'));
    
    fetch('https://formsubmit.co/info@joumonde.com', {
        method: 'POST',
        body: formData
    }).then(() => {
        console.log('✅ Kontaktformular-E-Mail gesendet');
    }).catch(err => {
        console.log('⚠️ E-Mail-Versand fehlgeschlagen:', err);
    });
}

// ==================== INITIALIZATION ====================

// ==================== SUPABASE SESSION INIT ====================
// Flag to prevent double loginUser() call: getSession() + onAuthStateChange both firing on page load
let _sessionRestored = false;

document.addEventListener('DOMContentLoaded', async function() {
    // Bestehende Session des Browsers wiederherstellen (silent – kein Notification, keine Sprache überschreiben)
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        _sessionRestored = true;
        await loginUser(session.user, false);
        if (document.getElementById('account-page-root')) showAccountDashboard();
    } else {
        updateAccountUI();
        renderAccountSignInPage();
    }

    // Auf Login/Logout reagieren (auch in anderen Tabs)
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
            if (_sessionRestored) {
                // This SIGNED_IN was triggered by the page-load session restore above – skip duplicate
                _sessionRestored = false;
            } else {
                // Fresh passwordless email-code login.
                await loginUser(session.user, true);
            }
            if (!document.getElementById('account-page-root')) {
                window.location.href = 'account.html';
                return;
            }
            showAccountDashboard();
            // Modal schliessen falls offen
            const modal = document.getElementById('account-modal');
            if (modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        } else if (event === 'SIGNED_OUT') {
            _sessionRestored = false;
            currentUser = null;
            updateAccountUI();
            refreshCartShippingProgress();
        }
    });

    if (new URLSearchParams(window.location.search).has('openAccount')) {
        const accountModal = document.getElementById('account-modal');
        if (accountModal) {
            accountModal.classList.add('active');
            document.body.classList.add('modal-open');
        }
    }

    // Wrap submitOrder without changing core checkout behavior.
    // The actual order save/email is handled in script.js + edge function.
    const originalSubmitOrder = window.submitOrder;
    window.submitOrder = async function(event) {
        if (event && typeof event.preventDefault === 'function') {
            event.preventDefault();
        }

        if (typeof originalSubmitOrder === 'function') {
            await originalSubmitOrder(event);
        }

        // Refresh order history after checkout so dashboard shows latest orders.
        if (currentUser && currentUser.id) {
            const { data: ordersRes, error: ordersErr } = await supabaseClient
                .from('orders')
                .select('*, order_items(*)')
                .eq('user_id', currentUser.id)
                .order('created_at', { ascending: false });

            if (!ordersErr && Array.isArray(ordersRes)) {
                currentUser.orderHistory = ordersRes.map(o => ({
                    id: o.id,
                    date: o.created_at,
                    status: o.status,
                    total: parseFloat(o.total || 0),
                    currency: o.currency,
                    paymentMethod: o.payment_method || null,
                    items: (o.order_items || []).map(i => ({
                        name: i.product_name,
                        price: parseFloat(i.unit_price || 0),
                        quantity: i.quantity,
                        size: i.size,
                        color: i.color,
                        articleNumber: i.article_number
                    }))
                }));
            }
        }
    };
});

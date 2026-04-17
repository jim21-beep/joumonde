// ==================== USER ACCOUNT SYSTEM ====================
// Powered by Supabase Auth + Database

// User State
let currentUser = null;

// Expose current user id for other scripts (e.g. checkout/order save flow).
window.getCurrentUserId = function getCurrentUserId() {
    return currentUser && currentUser.id ? currentUser.id : null;
};



// ==================== AUTHENTICATION ====================

// Register New User – Supabase Auth
async function handleRegister(event) {
    event.preventDefault();

    const form = event.target;
    const firstName = (form.elements['firstName'] || form.querySelector('input[name="firstName"]')).value.trim();
    const lastName  = (form.elements['lastName']  || form.querySelector('input[name="lastName"]')).value.trim();
    const email     = (form.elements['email']     || form.querySelector('input[type="email"]')).value.trim().toLowerCase();
    const password  = (form.elements['password']  || form.querySelectorAll('input[type="password"]')[0]).value;
    const passwordConfirm = (form.elements['passwordConfirm'] || form.querySelectorAll('input[type="password"]')[1]).value;
    const newsletter = false;

    if (!firstName || !lastName || !email || !password) {
        showAccountMessage('Bitte füllen Sie alle Pflichtfelder aus.', 'error'); return;
    }
    if (password !== passwordConfirm) {
        showAccountMessage('Passwörter stimmen nicht überein.', 'error'); return;
    }
    if (password.length < 6) {
        showAccountMessage('Passwort muss mindestens 6 Zeichen lang sein.', 'error'); return;
    }

    showAccountMessage('Konto wird erstellt…', 'info');

    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: { data: { firstName, lastName, newsletter } }
    });

    if (error) {
        showAccountMessage(error.message, 'error'); return;
    }

    if (typeof trackSignup === 'function') trackSignup('email');
    sendRegistrationEmail({ firstName, lastName, email, preferences: { newsletter } });
    showAccountMessage('Konto erstellt! Bitte bestätige deine E-Mail-Adresse.', 'success');
    form.reset();
}

// Login – Supabase Auth
async function handleLogin(event) {
    event.preventDefault();

    const form = event.target;
    const email    = form.querySelector('input[type="email"]').value.trim().toLowerCase();
    const password = form.querySelector('input[type="password"]').value;

    showAccountMessage('Anmeldung läuft…', 'info');

    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
        showAccountMessage('E-Mail oder Passwort ist falsch.', 'error'); return;
    }

    if (typeof trackLogin === 'function') trackLogin('email');
    form.reset();
    // onAuthStateChange übernimmt loginUser()
}

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
        preferences: {
            newsletter:      profile.newsletter      || false,
            defaultCurrency: profile.default_currency || 'CHF',
            defaultLanguage: profile.default_language || 'de',
            defaultSize:     profile.default_size     || null
        },
        addresses: addresses.map(a => ({
            id: a.id, street: a.street, zip: a.zip, city: a.city,
            country: a.country, phone: a.phone, isDefault: a.is_default
        })),
        orderHistory: orders.map(o => ({
            id: o.id, date: o.created_at, status: o.status,
            total: parseFloat(o.total || 0), currency: o.currency,
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
    if (isActualLogin) {
        if (currentUser.preferences.defaultCurrency && typeof changeCurrency === 'function')
            changeCurrency(currentUser.preferences.defaultCurrency);
        if (currentUser.preferences.defaultLanguage && typeof changeLanguage === 'function')
            changeLanguage(currentUser.preferences.defaultLanguage);
    }

    updateAccountUI();
    if (isActualLogin) {
        showNotification(`Willkommen zurück, ${currentUser.firstName}!`, 'success');
    }
}

// Logout – Supabase Auth
window.logoutUser = async function logoutUser() {
    await supabaseClient.auth.signOut();
    currentUser = null;
    const modal = document.getElementById('account-modal');
    if (modal) modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    window.location.reload();
}

// Update Account UI
function updateAccountUI() {
    const accountBtn = document.querySelector('.account-btn');
    
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
        accountBtn.setAttribute('title', currentUser.firstName + ' ' + currentUser.lastName);
    } else {
        // User is logged out
        accountBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        `;
        accountBtn.setAttribute('title', 'Anmelden');
    }
}

// Show Account Message
function showAccountMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `account-message ${type}`;
    messageDiv.textContent = message;
    
    const modal = document.querySelector('.account-modal .auth-modal-panel') || document.querySelector('.account-modal .contact-modal-content');
    const existingMessage = modal.querySelector('.account-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    modal.insertBefore(messageDiv, modal.firstChild);
    
    if (type === 'error') {
        setTimeout(() => messageDiv.remove(), 3000);
    }
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
    
    // Check if modal is currently open
    if (modal.classList.contains('active')) {
        // Close modal
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    } else {
        // Open modal
        if (currentUser) {
            // User is logged in - show dashboard
            showAccountDashboard();
        } else {
            // User is not logged in - show login/register
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            switchAccountTab('login'); // Default to login tab
        }
    }
}

// Switch Account Tab
function switchAccountTab(tab) {
    const tabs = document.querySelectorAll('.auth-tab, .account-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const indicator = document.querySelector('.auth-tab-indicator');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        tabs[0].classList.add('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        if (indicator) indicator.classList.remove('slide-right');
    } else {
        tabs[1].classList.add('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        if (indicator) indicator.classList.add('slide-right');
    }
}

// Show Account Dashboard
function showAccountDashboard() {
    const modal = document.getElementById('account-modal');
    // Support both the new auth panel and the legacy contact-modal-content (other pages)
    const modalContent = modal.querySelector('.auth-modal-panel') || modal.querySelector('.contact-modal-content');
    
    modalContent.innerHTML = `
        <button class="contact-close" onclick="toggleAccount()">&times;</button>
        <div class="account-dashboard">
            <div class="dashboard-header">
                <div class="user-avatar-large">${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}</div>
                <h2>${currentUser.firstName} ${currentUser.lastName}</h2>
                <p class="user-email">${currentUser.email}</p>
            </div>
            
            <div class="dashboard-tabs">
                <button class="dashboard-tab active" onclick="showDashboardSection('overview')">Übersicht</button>
                <button class="dashboard-tab" onclick="showDashboardSection('orders')">Bestellungen</button>
                <button class="dashboard-tab" onclick="showDashboardSection('addresses')">Adressen</button>
                <button class="dashboard-tab" onclick="showDashboardSection('preferences')">Einstellungen</button>
            </div>
            
            <div class="dashboard-content">
                <div id="dashboard-overview" class="dashboard-section active">
                    ${getDashboardOverview()}
                </div>
                <div id="dashboard-orders" class="dashboard-section">
                    ${getDashboardOrders()}
                </div>
                <div id="dashboard-addresses" class="dashboard-section">
                    ${getDashboardAddresses()}
                </div>
                <div id="dashboard-preferences" class="dashboard-section">
                    ${getDashboardPreferences()}
                </div>
            </div>
            
            <div class="dashboard-footer">
                <button class="btn-logout" onclick="logoutUser()">Abmelden</button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

// Show Dashboard Section
function showDashboardSection(section) {
    const tabs = document.querySelectorAll('.dashboard-tab');
    const sections = document.querySelectorAll('.dashboard-section');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    sections.forEach(sec => sec.classList.remove('active'));
    
    const tabIndex = ['overview', 'orders', 'addresses', 'preferences'].indexOf(section);
    tabs[tabIndex].classList.add('active');
    document.getElementById(`dashboard-${section}`).classList.add('active');
}

// Dashboard Overview
function getDashboardOverview() {
    const totalOrders = currentUser.orderHistory.length;
    const totalSpent = currentUser.orderHistory.reduce((sum, order) => sum + order.total, 0);
    const wishlistCount = wishlist.length;
    
    return `
        <h3>Willkommen zurück!</h3>
        <div class="overview-stats">
            <div class="stat-card">
                <div class="stat-icon">📦</div>
                <div class="stat-value">${totalOrders}</div>
                <div class="stat-label">Bestellungen</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-value">CHF ${totalSpent.toFixed(2)}</div>
                <div class="stat-label">Gesamt ausgegeben</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">❤️</div>
                <div class="stat-value">${wishlistCount}</div>
                <div class="stat-label">Wunschliste</div>
            </div>
        </div>
        
        <div class="quick-actions">
            <h4>Schnellzugriff</h4>
            <button onclick="showDashboardSection('orders')" class="quick-action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                </svg>
                Bestellungen ansehen
            </button>
            <button onclick="showDashboardSection('addresses')" class="quick-action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Adressen verwalten
            </button>
            <button onclick="toggleWishlist()" class="quick-action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Wunschliste öffnen
            </button>
        </div>
    `;
}

// Dashboard Orders
function getDashboardOrders() {
    if (currentUser.orderHistory.length === 0) {
        return `
            <h3>Bestellungen</h3>
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                </svg>
                <p>Sie haben noch keine Bestellungen.</p>
                <button onclick="toggleAccount(); document.getElementById('old-money').scrollIntoView({behavior: 'smooth'})" class="btn-primary">Jetzt shoppen</button>
            </div>
        `;
    }
    
    const ordersHTML = currentUser.orderHistory.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <strong>Bestellung ${order.id}</strong>
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
                <strong>Gesamt: CHF ${order.total.toFixed(2)}</strong>
                <button class="btn-secondary" onclick="viewOrderDetails('${order.id}')">Details ansehen</button>
            </div>
        </div>
    `).join('');
    
    return `
        <h3>Bestellungen</h3>
        <div class="orders-list">${ordersHTML}</div>
    `;
}

// Dashboard Addresses
function getDashboardAddresses() {
    const addressesHTML = currentUser.addresses.length > 0
        ? currentUser.addresses.map(addr => `
            <div class="address-card ${addr.isDefault ? 'default' : ''}">
                ${addr.isDefault ? '<span class="default-badge">Standard</span>' : ''}
                <div class="address-content">
                    <strong>${addr.name || (currentUser.firstName + ' ' + currentUser.lastName)}</strong>
                    <p>${addr.street}<br>${addr.zip} ${addr.city}<br>${addr.country}</p>
                    ${addr.phone ? `<p>Tel: ${addr.phone}</p>` : ''}
                </div>
                <div class="address-actions">
                    ${!addr.isDefault ? `<button onclick="setDefaultAddress('${addr.id}')">Als Standard</button>` : ''}
                    <button onclick="editAddress('${addr.id}')">Bearbeiten</button>
                    <button onclick="deleteAddress('${addr.id}')" class="btn-delete">Löschen</button>
                </div>
            </div>
        `).join('')
        : '<div class="empty-state"><p>Keine Adressen gespeichert.</p></div>';
    
    return `
        <h3>Adressen</h3>
        <button class="btn-primary" onclick="showAddAddressForm()">+ Neue Adresse hinzufügen</button>
        <div class="addresses-list">${addressesHTML}</div>
    `;
}

// Dashboard Preferences
function getDashboardPreferences() {
    return `
        <h3>Einstellungen</h3>
        <form class="preferences-form" onsubmit="savePreferences(event)">
            <div class="form-group">
                <label>Standardgröße</label>
                <select name="defaultSize">
                    <option value="">Keine</option>
                    <option value="S" ${currentUser.preferences.defaultSize === 'S' ? 'selected' : ''}>S</option>
                    <option value="M" ${currentUser.preferences.defaultSize === 'M' ? 'selected' : ''}>M</option>
                    <option value="L" ${currentUser.preferences.defaultSize === 'L' ? 'selected' : ''}>L</option>
                    <option value="XL" ${currentUser.preferences.defaultSize === 'XL' ? 'selected' : ''}>XL</option>
                    <option value="XXL" ${currentUser.preferences.defaultSize === 'XXL' ? 'selected' : ''}>XXL</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Standardwährung</label>
                <select name="defaultCurrency">
                    <option value="CHF" ${currentUser.preferences.defaultCurrency === 'CHF' ? 'selected' : ''}>CHF</option>
                    <option value="EUR" ${currentUser.preferences.defaultCurrency === 'EUR' ? 'selected' : ''}>EUR</option>
                    <option value="USD" ${currentUser.preferences.defaultCurrency === 'USD' ? 'selected' : ''}>USD</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Standardsprache</label>
                <select name="defaultLanguage">
                    <option value="de" ${currentUser.preferences.defaultLanguage === 'de' ? 'selected' : ''}>Deutsch</option>
                    <option value="en" ${currentUser.preferences.defaultLanguage === 'en' ? 'selected' : ''}>English</option>
                    <option value="fr" ${currentUser.preferences.defaultLanguage === 'fr' ? 'selected' : ''}>Français</option>
                </select>
            </div>
            
            <button type="submit" class="btn-primary">Einstellungen speichern</button>
        </form>
        
        <div class="danger-zone">
            <h4>Gefahrenzone</h4>
            <button class="btn-danger" onclick="deleteAccount()">Konto löschen</button>
        </div>
    `;
}

// Einstellungen in Supabase speichern
async function savePreferences(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const prefs = {
        defaultSize:     formData.get('defaultSize') || null,
        defaultCurrency: formData.get('defaultCurrency'),
        defaultLanguage: formData.get('defaultLanguage')
    };

    const { error } = await supabaseClient.from('profiles').update({
        default_size:     prefs.defaultSize,
        default_currency: prefs.defaultCurrency,
        default_language: prefs.defaultLanguage
    }).eq('id', currentUser.id);

    if (error) {
        showNotification('Fehler beim Speichern der Einstellungen.', 'error'); return;
    }

    currentUser.preferences = { ...currentUser.preferences, ...prefs };
    if (typeof changeCurrency === 'function') changeCurrency(prefs.defaultCurrency);
    if (typeof changeLanguage === 'function') changeLanguage(prefs.defaultLanguage);
    showNotification('Einstellungen gespeichert!', 'success');
}

// Add Address
function showAddAddressForm() {
    const form = `
        <div class="address-form-modal" id="address-form-modal" onclick="if(event.target===this)closeAddressForm()">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Neue Adresse hinzufügen</h3>
                    <button type="button" class="modal-close" onclick="closeAddressForm()" aria-label="Schliessen">&times;</button>
                </div>
                <div class="modal-divider"></div>
                <form onsubmit="saveAddress(event)">
                    <div class="form-group">
                        <label>Straße & Hausnummer <span class="required">*</span></label>
                        <input type="text" name="street" placeholder="z.B. Musterstrasse 12" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>PLZ <span class="required">*</span></label>
                            <input type="text" name="zip" placeholder="8001" required>
                        </div>
                        <div class="form-group">
                            <label>Stadt <span class="required">*</span></label>
                            <input type="text" name="city" placeholder="Zürich" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Land <span class="required">*</span></label>
                        <input type="text" name="country" value="Schweiz" required>
                    </div>
                    <div class="form-group">
                        <label>Telefon <span class="optional">(optional)</span></label>
                        <input type="tel" name="phone" placeholder="+41 79 123 45 67">
                    </div>
                    <div class="form-actions">
                        <button type="button" onclick="closeAddressForm()" class="btn-secondary">Abbrechen</button>
                        <button type="submit" class="btn-primary">Speichern</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', form);
}

async function saveAddress(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const isFirst = currentUser.addresses.length === 0;
    const newAddr = {
        user_id:    currentUser.id,
        street:     formData.get('street'),
        zip:        formData.get('zip'),
        city:       formData.get('city'),
        country:    formData.get('country'),
        phone:      formData.get('phone') || null,
        is_default: isFirst
    };

    const { data, error } = await supabaseClient.from('addresses').insert(newAddr).select().single();

    if (error) {
        showNotification('Adresse konnte nicht gespeichert werden.', 'error'); return;
    }

    currentUser.addresses.push({
        id: data.id, street: data.street, zip: data.zip, city: data.city,
        country: data.country, phone: data.phone, isDefault: data.is_default
    });

    closeAddressForm();
    showAccountDashboard();
    showDashboardSection('addresses');
    showNotification('Adresse hinzugefügt!', 'success');
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
    showDashboardSection('addresses');
    showNotification('Standardadresse geändert!', 'success');
}

async function deleteAddress(addressId) {
    if (confirm('Möchten Sie diese Adresse wirklich löschen?')) {
        const { error } = await supabaseClient.from('addresses').delete().eq('id', addressId);
        if (error) { showNotification('Fehler beim Löschen.', 'error'); return; }

        currentUser.addresses = currentUser.addresses.filter(a => a.id !== addressId);
        if (currentUser.addresses.length > 0 && !currentUser.addresses.some(a => a.isDefault)) {
            currentUser.addresses[0].isDefault = true;
            await supabaseClient.from('addresses').update({ is_default: true }).eq('id', currentUser.addresses[0].id);
        }
        showAccountDashboard();
        showDashboardSection('addresses');
        showNotification('Adresse gelöscht!', 'success');
    }
}

function editAddress(addressId) {
    const address = currentUser.addresses.find(a => a.id === addressId);
    if (!address) return;
    
    const form = `
        <div class="address-form-modal" id="address-form-modal">
            <div class="modal-content">
                <h3>Adresse bearbeiten</h3>
                <form onsubmit="updateAddress(event, '${addressId}')">
                    <div class="form-group">
                        <input type="text" name="street" placeholder="Straße & Hausnummer *" value="${address.street}" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" name="zip" placeholder="PLZ *" value="${address.zip}" required>
                        </div>
                        <div class="form-group">
                            <input type="text" name="city" placeholder="Stadt *" value="${address.city}" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" name="country" placeholder="Land *" value="${address.country}" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Telefon (optional)" value="${address.phone || ''}">
                    </div>
                    <div class="form-actions">
                        <button type="button" onclick="closeAddressForm()" class="btn-secondary">Abbrechen</button>
                        <button type="submit" class="btn-primary">Speichern</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', form);
}

async function updateAddress(event, addressId) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const newData = {
        street:  formData.get('street'),
        zip:     formData.get('zip'),
        city:    formData.get('city'),
        country: formData.get('country'),
        phone:   formData.get('phone') || null
    };

    const { error } = await supabaseClient.from('addresses').update(newData).eq('id', addressId);
    if (error) { showNotification('Fehler beim Aktualisieren.', 'error'); return; }

    const idx = currentUser.addresses.findIndex(a => a.id === addressId);
    if (idx !== -1) currentUser.addresses[idx] = { ...currentUser.addresses[idx], ...newData };

    closeAddressForm();
    showAccountDashboard();
    showDashboardSection('addresses');
    showNotification('Adresse aktualisiert!', 'success');
}

async function deleteAccount() {
    if (confirm('Möchten Sie Ihr Konto wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
        if (confirm('Sind Sie sicher? Alle Ihre Daten werden gelöscht.')) {
            await supabaseClient.from('profiles').delete().eq('id', currentUser.id);
            await supabaseClient.auth.signOut();
            currentUser = null;
            updateAccountUI();
            showNotification('Konto wurde gelöscht.', 'info');
        }
    }
}

function viewOrderDetails(orderId) {
    const order = currentUser.orderHistory.find(o => o.id === orderId);
    if (!order) return;
    
    alert(`Bestellung ${orderId}\n\nStatus: ${order.status}\nDatum: ${new Date(order.date).toLocaleDateString('de-DE')}\n\nArtikel:\n${order.items.map(i => `- ${i.name} × ${i.quantity}: CHF ${(i.price * i.quantity).toFixed(2)}`).join('\n')}\n\nGesamt: CHF ${order.total.toFixed(2)}`);
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
                if (fields[0]) fields[0].value = currentUser.firstName;
                if (fields[1]) fields[1].value = currentUser.lastName;
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

// Send Registration Notification Email
async function sendRegistrationEmail(user) {
    try {
        await fetch('https://sbxffjszderijikxarho.supabase.co/functions/v1/send-newsletter-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'registration',
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                registeredAt: new Date().toLocaleString('de-DE')
            })
        });
        console.log('✅ Registrierungs-E-Mail gesendet');
    } catch (err) {
        console.log('⚠️ E-Mail-Versand fehlgeschlagen:', err);
    }
}

// Send Order Confirmation Email
async function sendOrderConfirmationEmail(user, order) {
    try {
        await fetch('https://sbxffjszderijikxarho.supabase.co/functions/v1/send-newsletter-confirmation', {
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
    } else {
        updateAccountUI();
    }

    // Auf Login/Logout reagieren (auch in anderen Tabs)
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
            if (_sessionRestored) {
                // This SIGNED_IN was triggered by the page-load session restore above – skip duplicate
                _sessionRestored = false;
            } else {
                // Actual fresh login from handleLogin()
                await loginUser(session.user, true);
            }
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
        }
    });

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

// ==================== DEVELOPER TOOLS ====================

// Create test account (call from console: createTestAccount())
window.createTestAccount = function() {
    const testUser = new User(
        'Joumonde',
        'Admin',
        'info@joumonde.com',
        'admin123'
    );
    
    // Add test preferences
    testUser.preferences.newsletter = true;
    testUser.preferences.defaultSize = 'L';
    testUser.preferences.defaultCurrency = 'CHF';
    
    // Add test address
    testUser.addAddress({
        street: 'Bahnhofstrasse 1',
        zip: '8001',
        city: 'Zürich',
        country: 'Schweiz',
        phone: '+41 44 123 45 67'
    });
    
    // Add test order
    testUser.addOrder({
        items: [
            { name: 'Signature Blazer', price: 299.90, quantity: 1 },
            { name: 'Classic Hoodie', price: 89.90, quantity: 2 }
        ],
        total: 479.70,
        shippingAddress: testUser.addresses[0]
    });
    
    // Save user
    allUsers.push(testUser);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    
    console.log('✅ Test-Konto erstellt!');
    console.log('E-Mail: info@joumonde.com');
    console.log('Passwort: admin123');
    console.log('');
    console.log('Du kannst dich jetzt anmelden!');
    
    return testUser;
};

// Quick login (call from console: quickLogin())
window.quickLogin = function() {
    const user = allUsers.find(u => u.email === 'info@joumonde.com');
    if (user) {
        loginUser(Object.assign(new User('', '', '', ''), user));
        console.log('✅ Als info@joumonde.com eingeloggt!');
    } else {
        console.log('❌ Test-Konto existiert nicht. Führe erst createTestAccount() aus.');
    }
};

// View all users (call from console: viewAllUsers())
window.viewAllUsers = function() {
    console.log('Registrierte Benutzer:', allUsers.length);
    allUsers.forEach((u, i) => {
        console.log(`${i + 1}. ${u.firstName} ${u.lastName} (${u.email})`);
    });
    return allUsers;
};

// Reset all accounts (call from console: resetAccounts())
window.resetAccounts = function() {
    if (confirm('Alle Accounts löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
        localStorage.removeItem('allUsers');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberMe');
        allUsers = [];
        currentUser = null;
        updateAccountUI();
        console.log('✅ Alle Accounts wurden gelöscht.');
    }
};

// Show account system status
window.accountStatus = function() {
    console.log('=== ACCOUNT SYSTEM STATUS ===');
    console.log('Registrierte Benutzer:', allUsers.length);
    console.log('Aktueller Benutzer:', currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Nicht angemeldet');
    console.log('Remember Me:', localStorage.getItem('rememberMe') === 'true' ? 'Aktiv' : 'Inaktiv');
    console.log('');
    console.log('Verfügbare Befehle:');
    console.log('- createTestAccount() - Test-Konto erstellen');
    console.log('- quickLogin() - Schnell als Test-User einloggen');
    console.log('- viewAllUsers() - Alle Benutzer anzeigen');
    console.log('- resetAccounts() - Alle Accounts löschen');
    console.log('- accountStatus() - Diesen Status anzeigen');
};

console.log('%c🔐 Account System geladen!', 'color: #4caf50; font-weight: bold; font-size: 14px;');
console.log('%cTipp: Führe accountStatus() aus für verfügbare Befehle', 'color: #666; font-size: 12px;');

// ==================== USER ACCOUNT SYSTEM ====================

// User State
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

// User Class
class User {
    constructor(firstName, lastName, email, password) {
        this.id = Date.now().toString();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = this.hashPassword(password); // Simple hash (in production use proper encryption)
        this.createdAt = new Date().toISOString();
        this.addresses = [];
        this.orderHistory = [];
        this.preferences = {
            newsletter: false,
            defaultSize: null,
            defaultCurrency: 'CHF',
            defaultLanguage: 'de'
        };
        this.wishlist = [];
        this.savedPaymentMethods = [];
    }

    // Simple password hash (NOT secure for production!)
    hashPassword(password) {
        // In production, use bcrypt or similar
        return btoa(password + 'joumonde_salt_2025');
    }

    verifyPassword(password) {
        return this.hashPassword(password) === this.password;
    }

    addAddress(address) {
        address.id = Date.now().toString();
        address.isDefault = this.addresses.length === 0;
        this.addresses.push(address);
        this.saveToStorage();
    }

    updateAddress(addressId, newData) {
        const index = this.addresses.findIndex(a => a.id === addressId);
        if (index !== -1) {
            this.addresses[index] = { ...this.addresses[index], ...newData };
            this.saveToStorage();
        }
    }

    deleteAddress(addressId) {
        this.addresses = this.addresses.filter(a => a.id !== addressId);
        if (this.addresses.length > 0 && !this.addresses.some(a => a.isDefault)) {
            this.addresses[0].isDefault = true;
        }
        this.saveToStorage();
    }

    setDefaultAddress(addressId) {
        this.addresses.forEach(a => a.isDefault = (a.id === addressId));
        this.saveToStorage();
    }

    addOrder(order) {
        order.id = 'JM' + Date.now();
        order.date = new Date().toISOString();
        order.status = 'Bearbeitung';
        this.orderHistory.unshift(order);
        this.saveToStorage();
    }

    updatePreferences(prefs) {
        this.preferences = { ...this.preferences, ...prefs };
        this.saveToStorage();
    }

    saveToStorage() {
        // Update user in allUsers array
        const index = allUsers.findIndex(u => u.id === this.id);
        if (index !== -1) {
            allUsers[index] = this;
        }
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        
        // Update current user
        if (currentUser && currentUser.id === this.id) {
            currentUser = this;
            localStorage.setItem('currentUser', JSON.stringify(this));
        }
    }
}

// ==================== AUTHENTICATION ====================

// Register New User
function handleRegister(event) {
    event.preventDefault();
    
    const form = event.target;
    const firstName = form.querySelector('input[placeholder*="Vorname"]').value.trim();
    const lastName = form.querySelector('input[placeholder*="Nachname"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim().toLowerCase();
    const password = form.querySelectorAll('input[type="password"]')[0].value;
    const passwordConfirm = form.querySelectorAll('input[type="password"]')[1].value;
    const newsletter = form.querySelector('input[type="checkbox"]').checked;

    // Validation
    if (!firstName || !lastName || !email || !password) {
        showAccountMessage('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
        return;
    }

    if (password !== passwordConfirm) {
        showAccountMessage('Passwörter stimmen nicht überein.', 'error');
        return;
    }

    if (password.length < 6) {
        showAccountMessage('Passwort muss mindestens 6 Zeichen lang sein.', 'error');
        return;
    }

    // Check if email already exists
    if (allUsers.some(u => u.email === email)) {
        showAccountMessage('Diese E-Mail ist bereits registriert.', 'error');
        return;
    }

    // Create new user
    const newUser = new User(firstName, lastName, email, password);
    newUser.preferences.newsletter = newsletter;
    
    allUsers.push(newUser);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));

    showAccountMessage('Konto erfolgreich erstellt! Sie werden angemeldet...', 'success');

    // Send registration notification email
    sendRegistrationEmail(newUser);

    // Auto-login
    setTimeout(() => {
        loginUser(newUser);
        form.reset();
    }, 1000);
}

// Login User
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value.trim().toLowerCase();
    const password = form.querySelector('input[type="password"]').value;
    const rememberMe = form.querySelector('input[type="checkbox"]').checked;

    // Find user
    const userIndex = allUsers.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
        showAccountMessage('E-Mail oder Passwort ist falsch.', 'error');
        return;
    }

    // Create User instance from stored data
    const userData = allUsers[userIndex];
    const user = Object.assign(new User('', '', '', ''), userData);

    // Verify password
    if (!user.verifyPassword(password)) {
        showAccountMessage('E-Mail oder Passwort ist falsch.', 'error');
        return;
    }

    showAccountMessage('Erfolgreich angemeldet! Willkommen zurück.', 'success');

    // Login
    setTimeout(() => {
        loginUser(user, rememberMe);
        form.reset();
    }, 800);
}

// Login User Function
function loginUser(user, rememberMe = false) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
    }

    // Apply user preferences
    if (user.preferences.defaultCurrency) {
        changeCurrency(user.preferences.defaultCurrency);
    }
    if (user.preferences.defaultLanguage) {
        changeLanguage(user.preferences.defaultLanguage);
    }

    // Update UI
    updateAccountUI();
    toggleAccount();

    // Show welcome notification
    showNotification(`Willkommen zurück, ${user.firstName}!`, 'success');
}

// Logout User
function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    
    updateAccountUI();
    showNotification('Sie wurden abgemeldet.', 'info');
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
    
    const modal = document.querySelector('.account-modal .contact-modal-content');
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
    } else {
        // Open modal
        if (currentUser) {
            // User is logged in - show dashboard
            showAccountDashboard();
        } else {
            // User is not logged in - show login/register
            modal.classList.add('active');
            switchAccountTab('login'); // Default to login tab
        }
    }
}

// Switch Account Tab
function switchAccountTab(tab) {
    const tabs = document.querySelectorAll('.account-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        tabs[0].classList.add('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        tabs[1].classList.add('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

// Show Account Dashboard
function showAccountDashboard() {
    const modal = document.getElementById('account-modal');
    const modalContent = modal.querySelector('.contact-modal-content');
    
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
            
            <div class="form-group">
                <label style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" name="newsletter" ${currentUser.preferences.newsletter ? 'checked' : ''}>
                    Newsletter abonnieren
                </label>
            </div>
            
            <button type="submit" class="btn-primary">Einstellungen speichern</button>
        </form>
        
        <div class="danger-zone">
            <h4>Gefahrenzone</h4>
            <button class="btn-danger" onclick="deleteAccount()">Konto löschen</button>
        </div>
    `;
}

// Save Preferences
function savePreferences(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const prefs = {
        defaultSize: formData.get('defaultSize') || null,
        defaultCurrency: formData.get('defaultCurrency'),
        defaultLanguage: formData.get('defaultLanguage'),
        newsletter: formData.get('newsletter') === 'on'
    };
    
    const user = Object.assign(new User('', '', '', ''), currentUser);
    user.updatePreferences(prefs);
    currentUser = user;
    
    // Apply changes
    changeCurrency(prefs.defaultCurrency);
    changeLanguage(prefs.defaultLanguage);
    
    showNotification('Einstellungen gespeichert!', 'success');
}

// Add Address
function showAddAddressForm() {
    const form = `
        <div class="address-form-modal" id="address-form-modal">
            <div class="modal-content">
                <h3>Neue Adresse hinzufügen</h3>
                <form onsubmit="saveAddress(event)">
                    <div class="form-group">
                        <input type="text" name="street" placeholder="Straße & Hausnummer *" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" name="zip" placeholder="PLZ *" required>
                        </div>
                        <div class="form-group">
                            <input type="text" name="city" placeholder="Stadt *" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" name="country" placeholder="Land *" value="Schweiz" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Telefon (optional)">
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

function saveAddress(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const address = {
        street: formData.get('street'),
        zip: formData.get('zip'),
        city: formData.get('city'),
        country: formData.get('country'),
        phone: formData.get('phone') || null
    };
    
    const user = Object.assign(new User('', '', '', ''), currentUser);
    user.addAddress(address);
    currentUser = user;
    
    closeAddressForm();
    showAccountDashboard();
    showDashboardSection('addresses');
    showNotification('Adresse hinzugefügt!', 'success');
}

function closeAddressForm() {
    document.getElementById('address-form-modal')?.remove();
}

function setDefaultAddress(addressId) {
    const user = Object.assign(new User('', '', '', ''), currentUser);
    user.setDefaultAddress(addressId);
    currentUser = user;
    showAccountDashboard();
    showDashboardSection('addresses');
    showNotification('Standardadresse geändert!', 'success');
}

function deleteAddress(addressId) {
    if (confirm('Möchten Sie diese Adresse wirklich löschen?')) {
        const user = Object.assign(new User('', '', '', ''), currentUser);
        user.deleteAddress(addressId);
        currentUser = user;
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

function updateAddress(event, addressId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const newData = {
        street: formData.get('street'),
        zip: formData.get('zip'),
        city: formData.get('city'),
        country: formData.get('country'),
        phone: formData.get('phone') || null
    };
    
    const user = Object.assign(new User('', '', '', ''), currentUser);
    user.updateAddress(addressId, newData);
    currentUser = user;
    
    closeAddressForm();
    showAccountDashboard();
    showDashboardSection('addresses');
    showNotification('Adresse aktualisiert!', 'success');
}

function deleteAccount() {
    if (confirm('Möchten Sie Ihr Konto wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
        if (confirm('Sind Sie sicher? Alle Ihre Daten werden gelöscht.')) {
            allUsers = allUsers.filter(u => u.id !== currentUser.id);
            localStorage.setItem('allUsers', JSON.stringify(allUsers));
            logoutUser();
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
                checkoutForm.querySelector('input[placeholder*="Vorname"]').value = currentUser.firstName;
                checkoutForm.querySelector('input[placeholder*="Nachname"]').value = currentUser.lastName;
                checkoutForm.querySelector('input[type="email"]').value = currentUser.email;
                if (defaultAddress) {
                    checkoutForm.querySelector('input[placeholder*="Straße"]').value = defaultAddress.street;
                    checkoutForm.querySelector('input[placeholder*="PLZ"]').value = defaultAddress.zip;
                    checkoutForm.querySelector('input[placeholder*="Stadt"]').value = defaultAddress.city;
                    if (defaultAddress.phone) {
                        checkoutForm.querySelector('input[type="tel"]').value = defaultAddress.phone;
                    }
                }
            }
        }, 100);
    }
    
    if (originalOpenCheckout) {
        originalOpenCheckout();
    }
};

// Modified submitCheckout to save order to user history
const originalSubmitCheckout = window.submitCheckout;
window.submitCheckout = function(event) {
    if (currentUser) {
        const order = {
            items: cart.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            shippingAddress: {} // Would be filled from form
        };
        
        const user = Object.assign(new User('', '', '', ''), currentUser);
        user.addOrder(order);
        currentUser = user;
        
        // Send order confirmation email
        sendOrderConfirmationEmail(currentUser, order);
    }
    
    if (originalSubmitCheckout) {
        originalSubmitCheckout(event);
    }
};

// ==================== EMAIL NOTIFICATIONS ====================

// Send Registration Notification Email
function sendRegistrationEmail(user) {
    // Create form data
    const formData = new FormData();
    formData.append('_subject', 'Neue Registrierung bei Joumonde!');
    formData.append('_template', 'table'); // Uses nice table layout
    formData.append('_captcha', 'false');
    formData.append('Name', `${user.firstName} ${user.lastName}`);
    formData.append('E-Mail', user.email);
    formData.append('Registriert am', new Date().toLocaleString('de-DE'));
    formData.append('Newsletter', user.preferences.newsletter ? 'Ja' : 'Nein');
    
    // Send to FormSubmit
    fetch('https://formsubmit.co/info@joumonde.com', {
        method: 'POST',
        body: formData
    }).then(() => {
        console.log('✅ Registrierungs-E-Mail gesendet an info@joumonde.com');
    }).catch(err => {
        console.log('⚠️ E-Mail-Versand fehlgeschlagen:', err);
    });
}

// Send Order Confirmation Email
function sendOrderConfirmationEmail(user, order) {
    const itemsList = order.items.map(item => 
        `${item.name} × ${item.quantity} = CHF ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const formData = new FormData();
    formData.append('_subject', `Neue Bestellung #${order.id} - Joumonde`);
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    formData.append('Bestell-Nr', order.id);
    formData.append('Kunde', `${user.firstName} ${user.lastName}`);
    formData.append('E-Mail', user.email);
    formData.append('Artikel', itemsList);
    formData.append('Gesamtbetrag', `CHF ${order.total.toFixed(2)}`);
    formData.append('Datum', new Date(order.date).toLocaleString('de-DE'));
    formData.append('Status', order.status);
    
    fetch('https://formsubmit.co/info@joumonde.com', {
        method: 'POST',
        body: formData
    }).then(() => {
        console.log('✅ Bestellbestätigungs-E-Mail gesendet an info@joumonde.com');
    }).catch(err => {
        console.log('⚠️ E-Mail-Versand fehlgeschlagen:', err);
    });
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user should be auto-logged in
    if (currentUser && localStorage.getItem('rememberMe') === 'true') {
        updateAccountUI();
    } else if (currentUser) {
        // Session expired, but keep user data
        updateAccountUI();
    }
});

// Update UI on load
updateAccountUI();

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

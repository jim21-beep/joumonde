// Coming Soon Page JavaScript

function updateCountdown() {
    const launchDate = new Date('2026-03-30T00:00:00').getTime();
    const timer = setInterval(() => {
        const now = Date.now();
        const distance = launchDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById('days').innerText = String(Math.max(days,0)).padStart(2, '0');
        document.getElementById('hours').innerText = String(Math.max(hours,0)).padStart(2, '0');
        document.getElementById('minutes').innerText = String(Math.max(minutes,0)).padStart(2, '0');
        document.getElementById('seconds').innerText = String(Math.max(seconds,0)).padStart(2, '0');
        if (distance < 0) clearInterval(timer);
    }, 1000);
}

function handleNewsletterSignup(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (email && validateEmail(email)) {
        const submitButton = event.target.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Wird gesendet...';
        submitButton.disabled = true;
        
        fetch('http://localhost:4000/api/newsletter/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                source: 'coming-soon-page',
                name: ''
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // Track newsletter signup
                if (typeof trackNewsletterSignup === 'function') {
                    trackNewsletterSignup(email);
                }
                showNotification('Danke für deine Anmeldung! Bitte bestätige deine E-Mail-Adresse.', 'success');
                event.target.reset();
            }
        })
        .catch(() => {
            showNotification('Fehler beim Senden. Bitte versuche es später erneut.', 'error');
        })
        .finally(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    } else {
        showNotification('Bitte gib eine gültige E-Mail-Adresse ein.', 'error');
    }
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type) {
    // Simple notification (can be replaced with better UI)
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#d4af37' : type === 'error' ? '#c0392b' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-size: 0.95rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', updateCountdown);

// Admin Login System
const ADMIN_CODE = 'Joumonde2026'; // Ändere diesen Code nach deinen Wünschen

function openAdminLogin(event) {
    event.preventDefault();
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('adminCode').focus();
    }
}

function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('adminCode').value = '';
        document.getElementById('adminError').style.display = 'none';
    }
}

function checkAdminCode(event) {
    event.preventDefault();
    const inputCode = document.getElementById('adminCode').value;
    const errorMsg = document.getElementById('adminError');
    
    if (inputCode === ADMIN_CODE) {
        // Correct code - save session and redirect
        sessionStorage.setItem('adminAuthenticated', 'true');
        sessionStorage.setItem('adminLoginTime', Date.now());
        window.location.href = 'shop.html';
    } else {
        // Wrong code - show error
        errorMsg.style.display = 'block';
        document.getElementById('adminCode').value = '';
        document.getElementById('adminCode').focus();
        
        // Hide error after 3 seconds
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 3000);
    }
}

// Close modal on outside click
document.addEventListener('click', function(event) {
    const modal = document.getElementById('adminModal');
    if (modal && event.target === modal) {
        closeAdminModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAdminModal();
    }
});

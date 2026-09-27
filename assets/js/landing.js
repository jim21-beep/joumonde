// Joumonde Landing Page — interactions (cursor glow, scroll reveal, Nexara demo, newsletter, admin login)

// ===== Cursor glow (desktop pointer devices only) =====
(function initCursorGlow() {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;
    window.addEventListener('mousemove', (e) => {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        glow.classList.add('active');
    }, { passive: true });
})();

// ===== Scroll reveal =====
(function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
        targets.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const isNexara = entry.target.id === 'nexara-section';

            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (isNexara) {
                    playNexaraDemo();
                } else {
                    observer.unobserve(entry.target);
                }
            } else if (isNexara) {
                // Leaving the viewport resets the demo so it replays fresh on the next scroll-in.
                resetNexaraDemo();
            }
        });
    }, { threshold: 0.2 });

    targets.forEach(el => observer.observe(el));
})();

// ===== Nexara chat demo (cosmetic, no backend call) =====
let nexaraDemoTimers = [];

function resetNexaraDemo() {
    nexaraDemoTimers.forEach(clearTimeout);
    nexaraDemoTimers = [];
    const body = document.getElementById('nexara-demo-body');
    if (body) body.innerHTML = '';
}

function playNexaraDemo() {
    resetNexaraDemo();

    const body = document.getElementById('nexara-demo-body');
    if (!body) return;

    const steps = [
        { delay: 300, type: 'user', text: 'Welche Grösse passt zu mir?' },
        { delay: 900, type: 'typing' },
        { delay: 1600, type: 'bot', text: 'Sag mir einfach deine Masse – ich finde in Sekunden die perfekte Passform. 👌' },
        { delay: 1000, type: 'user', text: 'Wann kommt meine Bestellung an?' },
        { delay: 900, type: 'typing' },
        { delay: 1600, type: 'bot', text: 'Ich behalte deinen Versand jederzeit für dich im Blick – frag mich einfach danach.' }
    ];

    let elapsed = 0;
    let typingEl = null;

    steps.forEach(step => {
        elapsed += step.delay;
        const timerId = setTimeout(() => {
            if (step.type === 'typing') {
                typingEl = document.createElement('div');
                typingEl.className = 'nexara-typing';
                typingEl.innerHTML = '<span></span><span></span><span></span>';
                body.appendChild(typingEl);
            } else {
                if (typingEl) { typingEl.remove(); typingEl = null; }
                const msg = document.createElement('div');
                msg.className = `nexara-msg ${step.type}`;
                msg.textContent = step.text;
                body.appendChild(msg);
            }
        }, elapsed);
        nexaraDemoTimers.push(timerId);
    });
}

// ===== Newsletter signup =====
async function handleNewsletterSignup(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value.trim().toLowerCase();

    if (!email || !validateEmail(email)) {
        showNotification('Bitte gib eine gültige E-Mail-Adresse ein.', 'error');
        return;
    }

    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Wird gesendet...';
    submitButton.disabled = true;

    try {
        const response = await fetch(
            `${window.__ENV__?.SUPABASE_URL}/functions/v1/send-newsletter-confirmation`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'newsletter', email, source: 'coming-soon-page' })
            }
        );

        let data = null;
        try {
            data = await response.json();
        } catch (_jsonErr) {
            data = null;
        }

        if (!response.ok) {
            const errorMessage = data && data.error
                ? data.error
                : 'Fehler beim Senden. Bitte versuche es spaeter erneut.';
            showNotification(errorMessage, 'error');
            return;
        }

        if (data && data.alreadySubscribed) {
            showNotification('Diese E-Mail ist bereits angemeldet.', 'info');
        } else {
            if (typeof trackNewsletterSignup === 'function') trackNewsletterSignup(email);
            showNotification('Danke für deine Anmeldung! Du erhältst gleich eine Bestätigungsmail.', 'success');
            event.target.reset();
        }
    } catch (err) {
        console.error('Newsletter-Fehler:', err);
        showNotification('Fehler beim Senden. Bitte versuche es später erneut.', 'error');
    } finally {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'status');
    notification.setAttribute('aria-live', 'polite');
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

// ===== Admin login =====
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
        sessionStorage.setItem('adminAuthenticated', 'true');
        sessionStorage.setItem('adminLoginTime', Date.now());
        window.location.href = 'shop.html';
    } else {
        errorMsg.style.display = 'block';
        document.getElementById('adminCode').value = '';
        document.getElementById('adminCode').focus();
        setTimeout(() => { errorMsg.style.display = 'none'; }, 3000);
    }
}

document.addEventListener('click', function(event) {
    const modal = document.getElementById('adminModal');
    if (modal && event.target === modal) closeAdminModal();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeAdminModal();
});

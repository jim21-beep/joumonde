(function renderSiteFooter() {
    const placeholder = document.querySelector('[data-site-footer]');
    if (!placeholder) return;

    const isHomePage = (
        window.location.pathname === '/'
        || window.location.pathname.endsWith('/index.html')
        || (window.location.pathname.endsWith('/shop.html') && !document.body.dataset.shopCollection)
    );
    const includeNewsletter = isHomePage && !document.querySelector('#newsletter');
    const newsletterMarkup = includeNewsletter ? `
        <section class="site-footer-newsletter" aria-labelledby="site-footer-newsletter-title">
            <p class="site-footer-eyebrow" id="site-footer-newsletter-title">JETZT ANMELDEN UND KEINE NEWS VERPASSEN</p>
            <p>Sei der Erste, der von neuen Produkten und exklusiven Angeboten erfährt.</p>
            <form class="site-footer-newsletter-form" onsubmit="handleNewsletterSignup(event)">
                <input type="email" name="email" placeholder="E-Mail" aria-label="E-Mail" required>
                <button type="submit" aria-label="Zum Newsletter anmelden">&rsaquo;</button>
            </form>
            <p class="site-footer-legal-note">Mit deiner Anmeldung stimmst du den <a href="agb.html">AGB</a> und der <a href="cookie-policy.html">Datenschutzerklärung</a> zu.</p>
        </section>
    ` : '';

    placeholder.outerHTML = `
        <footer class="site-footer">
            <div class="site-footer-inner">
                <div class="site-footer-top${includeNewsletter ? '' : ' site-footer-top-no-newsletter'}">
                    <a class="site-footer-brand" href="shop.html">Joumonde</a>
                    ${newsletterMarkup}
                </div>
                <div class="site-footer-links">
                    <section>
                        <h2>Kontakt</h2>
                        <a href="mailto:info@joumonde.com">info@joumonde.com</a>
                    </section>
                    <section>
                        <h2>Shop</h2>
                        <a href="shop.html?collection=old-money">Old Money</a>
                        <a href="shop.html?collection=casual">Casual</a>
                    </section>
                    <section>
                        <h2>Kundenservice</h2>
                        <a href="versand.html">Versand &amp; Retouren</a>
                        <a href="faq.html">FAQ</a>
                        <a href="about.html">Über Joumonde</a>
                    </section>
                    <section>
                        <h2>Rechtliches</h2>
                        <a href="impressum.html">Impressum</a>
                        <a href="agb.html">AGB</a>
                        <a href="cookie-policy.html">Datenschutzerklärung</a>
                    </section>
                </div>
                <div class="site-footer-bottom">
                    &copy; 2026 Joumonde. Alle Rechte vorbehalten.
                    ${isHomePage ? '<a class="site-footer-admin" href="#" onclick="openAdminLogin(event)">Admin</a>' : ''}
                </div>
            </div>
        </footer>
    `;
})();

(function () {
    const client = window.supabaseClient;
    const ORDER_STATUSES = ['Bearbeitung', 'Versendet', 'Geliefert', 'Storniert'];
    const PAYMENT_LABELS = { pending: 'Offen', paid: 'Bezahlt', failed: 'Fehlgeschlagen', refunded: 'Rückerstattet' };
    const PAYMENT_METHODS = { card: 'Kreditkarte', amex: 'American Express', paypal: 'PayPal' };
    const $ = id => document.getElementById(id);
    let orders = [];

    function setMessage(el, text, type) {
        el.textContent = text || '';
        el.className = 'admin-message' + (type ? ' ' + type : '');
    }

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function badge(value, label) {
        const node = el('span', 'badge', label || value || '-');
        if (value) node.classList.add(String(value).replace(/[^\w-]/g, ''));
        return node;
    }

    const money = (value, currency) => `${currency || 'CHF'} ${Number(value || 0).toFixed(2)}`;
    const formatDate = value => value ? new Date(value).toLocaleString('de-CH', { dateStyle: 'short', timeStyle: 'short' }) : '-';

    async function callAdmin(body) {
        const { data, error } = await client.functions.invoke('admin-orders', { body });
        if (error) {
            const status = error.context?.status;
            throw new Error(status === 403 ? 'forbidden' : 'request_failed');
        }
        return data;
    }

    function showLogin(message) {
        $('admin-login').hidden = false;
        $('admin-app').hidden = true;
        $('admin-actions').hidden = true;
        $('admin-email-form').hidden = false;
        $('admin-code-form').hidden = true;
        setMessage($('admin-login-message'), message, message ? 'error' : '');
    }

    async function loadOrders() {
        setMessage($('admin-message'), 'Lade Bestellungen …');
        try {
            const data = await callAdmin({ action: 'list' });
            orders = data.orders || [];
            $('admin-login').hidden = true;
            $('admin-app').hidden = false;
            $('admin-actions').hidden = false;
            setMessage($('admin-message'), '');
            render();
        } catch (error) {
            if (error.message === 'forbidden') {
                await client.auth.signOut();
                showLogin('Dieses Konto hat keinen Admin-Zugriff.');
            } else {
                setMessage($('admin-message'), 'Bestellungen konnten nicht geladen werden.', 'error');
            }
        }
    }

    function filteredOrders() {
        const query = $('admin-search').value.trim().toLowerCase();
        const status = $('admin-filter-status').value;
        const payment = $('admin-filter-payment').value;
        return orders.filter(order => {
            if (status && order.status !== status) return false;
            if (payment && order.payment_status !== payment) return false;
            if (!query) return true;
            const haystack = [
                order.id, order.customer_name, order.customer_email,
                ...(order.items || []).map(item => item.product_name)
            ].join(' ').toLowerCase();
            return haystack.includes(query);
        });
    }

    function render() {
        const stats = $('admin-stats');
        stats.replaceChildren();
        const open = orders.filter(order => order.status === 'Bearbeitung').length;
        const revenue = orders
            .filter(order => order.payment_status === 'paid')
            .reduce((sum, order) => sum + Number(order.total || 0), 0);
        [
            [orders.length, 'Bestellungen gesamt'],
            [open, 'In Bearbeitung'],
            [money(revenue), 'Umsatz (bezahlt)']
        ].forEach(([value, label]) => {
            const box = el('div', 'admin-stat');
            box.append(el('strong', '', String(value)), el('span', '', label));
            stats.append(box);
        });

        const body = $('admin-orders');
        body.replaceChildren();
        const rows = filteredOrders();
        if (!rows.length) {
            const row = el('tr');
            const cell = el('td', '', 'Keine Bestellungen gefunden.');
            cell.colSpan = 6;
            row.append(cell);
            body.append(row);
            return;
        }
        rows.forEach(order => {
            const row = el('tr');
            row.tabIndex = 0;
            const customer = order.customer_name || order.customer_email || 'Gast';
            const cells = [
                el('td', '', formatDate(order.created_at)),
                el('td', '', order.id),
                el('td', '', customer),
                el('td', '', money(order.total, order.currency))
            ];
            const paymentCell = el('td');
            paymentCell.append(badge(order.payment_status, PAYMENT_LABELS[order.payment_status]));
            const statusCell = el('td');
            statusCell.append(badge(order.status));
            row.append(...cells, paymentCell, statusCell);
            const open = () => openOrder(order.id);
            row.addEventListener('click', open);
            row.addEventListener('keydown', event => { if (event.key === 'Enter') open(); });
            body.append(row);
        });
    }

    function section(title, ...children) {
        const wrap = el('div', 'admin-section');
        wrap.append(el('h3', '', title), ...children);
        return wrap;
    }

    function openOrder(orderId) {
        const order = orders.find(entry => entry.id === orderId);
        if (!order) return;
        $('admin-modal-title').textContent = `Bestellung ${order.id}`;
        const body = $('admin-modal-body');
        body.replaceChildren();

        const address = order.shipping_address || {};
        const addressLines = [
            [address.firstName, address.lastName].filter(Boolean).join(' '),
            address.street,
            [address.zip, address.city].filter(Boolean).join(' '),
            address.country,
            address.phone
        ].filter(Boolean);
        const customerBlock = [
            el('p', '', order.customer_name || 'Gast'),
            el('p', '', order.customer_email || 'Keine E-Mail hinterlegt')
        ];
        if (order.customer_email) {
            const mail = el('a', '', 'E-Mail schreiben');
            mail.href = `mailto:${encodeURIComponent(order.customer_email)}`;
            const p = el('p');
            p.append(mail);
            customerBlock.push(p);
        }
        body.append(section('Kunde', ...customerBlock));
        body.append(section('Lieferadresse', ...(addressLines.length
            ? addressLines.map(line => el('p', '', line))
            : [el('p', '', 'Für diese Bestellung ist keine Adresse gespeichert.')])));

        const table = el('table', 'admin-items');
        const tbody = el('tbody');
        (order.items || []).forEach(item => {
            const row = el('tr');
            const details = [item.size, item.color].filter(Boolean).join(', ');
            row.append(
                el('td', '', `${item.quantity}x ${item.product_name}${details ? ' (' + details + ')' : ''}`),
                el('td', '', money(Number(item.unit_price || 0) * Number(item.quantity || 1), order.currency))
            );
            tbody.append(row);
        });
        const totalRow = el('tr');
        const totalLabel = el('td', '', 'Total');
        totalLabel.style.fontWeight = '700';
        const totalValue = el('td', '', money(order.total, order.currency));
        totalValue.style.fontWeight = '700';
        totalRow.append(totalLabel, totalValue);
        tbody.append(totalRow);
        table.append(tbody);
        body.append(section('Artikel', table));

        body.append(section('Zahlung',
            el('p', '', `Methode: ${PAYMENT_METHODS[order.payment_method] || 'Nicht angegeben'}`),
            el('p', '', `Bestellt am: ${formatDate(order.created_at)}`)));

        const statusSelect = el('select');
        ORDER_STATUSES.forEach(value => {
            const option = el('option', '', value);
            option.value = value;
            statusSelect.append(option);
        });
        if (!ORDER_STATUSES.includes(order.status)) {
            const option = el('option', '', order.status || '-');
            option.value = order.status || '';
            statusSelect.prepend(option);
        }
        statusSelect.value = order.status || '';

        const paymentSelect = el('select');
        Object.entries(PAYMENT_LABELS).forEach(([value, label]) => {
            const option = el('option', '', label);
            option.value = value;
            paymentSelect.append(option);
        });
        paymentSelect.value = order.payment_status;

        const note = el('textarea');
        note.rows = 3;
        note.maxLength = 2000;
        note.value = order.admin_note || '';
        note.placeholder = 'Interne Notiz (z. B. Trackingnummer)';

        const statusLabel = el('label', '', 'Bestellstatus');
        const paymentLabel = el('label', '', 'Zahlungsstatus');
        const row = el('div', 'admin-form-row');
        const left = el('div');
        left.append(statusLabel, statusSelect);
        const right = el('div');
        right.append(paymentLabel, paymentSelect);
        row.append(left, right);

        const save = el('button', '', 'Speichern');
        save.type = 'button';
        save.style.marginTop = '12px';
        const message = el('p', 'admin-message');
        save.addEventListener('click', async () => {
            save.disabled = true;
            setMessage(message, 'Speichere …');
            try {
                await callAdmin({
                    action: 'update',
                    orderId: order.id,
                    status: statusSelect.value,
                    paymentStatus: paymentSelect.value,
                    adminNote: note.value
                });
                Object.assign(order, {
                    status: statusSelect.value,
                    payment_status: paymentSelect.value,
                    admin_note: note.value
                });
                setMessage(message, 'Gespeichert.', 'success');
                render();
            } catch (error) {
                setMessage(message, 'Speichern fehlgeschlagen.', 'error');
            } finally {
                save.disabled = false;
            }
        });

        const noteLabel = el('label', '', 'Interne Notiz');
        body.append(section('Bearbeiten', row, noteLabel, note, save, message));
        $('admin-modal').hidden = false;
    }

    async function init() {
        if (!client?.auth) {
            showLogin('Verbindung zu Supabase nicht verfügbar.');
            return;
        }

        $('admin-email-form').addEventListener('submit', async event => {
            event.preventDefault();
            const email = $('admin-email').value.trim().toLowerCase();
            setMessage($('admin-login-message'), 'Code wird gesendet …');
            try {
                const { data, error } = await client.functions.invoke('email-login-code', { body: { action: 'send', email } });
                if (error || !data?.sent) throw new Error('send_failed');
                $('admin-email-form').hidden = true;
                $('admin-code-form').hidden = false;
                $('admin-code').focus();
                setMessage($('admin-login-message'), 'Wir haben dir einen Code gesendet.', 'success');
            } catch (error) {
                setMessage($('admin-login-message'), 'Der Code konnte nicht gesendet werden.', 'error');
            }
        });

        $('admin-code-form').addEventListener('submit', async event => {
            event.preventDefault();
            const email = $('admin-email').value.trim().toLowerCase();
            const code = $('admin-code').value.trim();
            setMessage($('admin-login-message'), 'Code wird geprüft …');
            try {
                const { data, error } = await client.functions.invoke('email-login-code', { body: { action: 'verify', email, code } });
                if (error || !data?.tokenHash) throw new Error('invalid_code');
                const { error: otpError } = await client.auth.verifyOtp({ token_hash: data.tokenHash, type: 'email' });
                if (otpError) throw new Error('invalid_code');
                $('admin-code').value = '';
                await loadOrders();
            } catch (error) {
                setMessage($('admin-login-message'), 'Der Code ist ungültig oder abgelaufen.', 'error');
            }
        });

        $('admin-refresh').addEventListener('click', loadOrders);
        $('admin-logout').addEventListener('click', async () => {
            await client.auth.signOut();
            orders = [];
            showLogin('');
        });
        ['admin-search', 'admin-filter-status', 'admin-filter-payment'].forEach(id => {
            $(id).addEventListener('input', render);
        });
        $('admin-modal-close').addEventListener('click', () => { $('admin-modal').hidden = true; });
        $('admin-modal').addEventListener('click', event => {
            if (event.target === $('admin-modal')) $('admin-modal').hidden = true;
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') $('admin-modal').hidden = true;
        });

        const { data: { session } } = await client.auth.getSession();
        if (session) await loadOrders();
        else showLogin('');
    }

    init();
})();

function toggleStroyMenu() {
    var m = document.getElementById('stroy-menu');
    if (m) m.classList.toggle('open');
}

function formatByPhone(input) {
    var digits = input.value.replace(/\D/g, '');
    if (digits.indexOf('80') === 0 && digits.length <= 11) {
        digits = '375' + digits.slice(2);
    }
    if (digits.indexOf('375') === 0 && digits.length <= 12) {
        var res = '+375';
        if (digits.length > 3) res += ' (' + digits.slice(3, 5);
        if (digits.length >= 5) res += ') ';
        if (digits.length > 5) res += digits.slice(5, 8);
        if (digits.length > 8) res += '-' + digits.slice(8, 10);
        if (digits.length > 10) res += '-' + digits.slice(10, 12);
        input.value = res;
    }
}

function filterProjects(type, btn) {
    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    document.querySelectorAll('.project-card').forEach(function(card) {
        var cat = card.getAttribute('data-type');
        card.style.display = (type === 'all' || cat === type) ? 'flex' : 'none';
    });
}

function calcHousePrice() {
    var areaEl = document.getElementById('house-area');
    var techEl = document.getElementById('house-tech');
    var packEl = document.getElementById('house-pack');
    if (!areaEl || !techEl || !packEl) return;

    var area = parseInt(areaEl.value, 10);
    var rate = parseInt(techEl.value, 10);
    var mult = parseFloat(packEl.value);
    document.getElementById('house-area-val').textContent = area + ' м²';

    var total = Math.round((area * rate * mult) / 100) * 100;
    document.getElementById('house-total-byn').textContent = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' BYN';
}

function submitStroyForm(e, msgId, label) {
    e.preventDefault();
    var box = document.getElementById(msgId);
    if (!box) return;
    box.textContent = '✓ Заявка («' + label + '») принята! На реальном сайте смета и контакт сразу приходят в Telegram.';
    box.style.display = 'block';
}

calcHousePrice();

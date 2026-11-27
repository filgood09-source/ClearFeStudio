var WORKER_URL = 'https://clearfe-' + 'leads.filgood09.workers.dev';
var themes = {
    dark: { bg: '#0f172a', cardBg: '#1e293b', color: '#f8fafc', btnBg: '#3b82f6', btnColor: '#ffffff' },
    light: { bg: '#f8fafc', cardBg: '#e2e8f0', color: '#0f172a', btnBg: '#0f172a', btnColor: '#ffffff' },
    brand: { bg: '#1e1b4b', cardBg: '#312e81', color: '#ffffff', btnBg: '#10b981', btnColor: '#064e3b' }
};
var toastTimer = null;
var isGenerating = false;

function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function translitToDomain(str) {
    var map = {
        'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y',
        'к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f',
        'х':'h','ц':'ts','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'
    };
    var res = str.toLowerCase().split('').map(function(ch) {
        if (map[ch] !== undefined) return map[ch];
        if (/[a-z0-9]/.test(ch)) return ch;
        return '-';
    }).join('').replace(/-+/g, '-').replace(/^-|-$/g, '');
    return 'https://' + (res || 'vash-biznes') + '.by';
}

function capitalizeFirst(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function showStatus(text, type) {
    var pill = document.getElementById('ai-status-pill');
    if (!pill) return;
    pill.className = 'ai-status-pill' + (type ? ' ' + type : '');
    pill.textContent = text;
    pill.style.display = 'inline-block';
}

function updateLiveHeader() {
    var brandInput = document.getElementById('custom-brand');
    if (!brandInput) return;
    var rawBrand = brandInput.value.trim();
    var rawPhone = document.getElementById('custom-phone').value.trim();
    if (rawBrand) {
        brandInput.classList.remove('input-error');
        try { sessionStorage.setItem('clearfe_niche', rawBrand); } catch (e) {}
    }

    var brand = rawBrand ? capitalizeFirst(rawBrand) : 'Ваш Бизнес';
    document.getElementById('mockup-url').textContent = translitToDomain(brand);
    document.getElementById('demo-logo').textContent = brand;
    document.getElementById('demo-phone').textContent = rawPhone || 'Минск • +375 (29) 000-00-00';

    var targetHref = rawBrand ? ('index.html?niche=' + encodeURIComponent(brand) + '#quiz') : 'index.html#quiz';
    var orderBtn = document.getElementById('order-similar-btn');
    var topOrderBtn = document.getElementById('order-proto-top-btn');
    if (orderBtn) orderBtn.href = targetHref;
    if (topOrderBtn) topOrderBtn.href = targetHref;
}

function applyDesignToDOM(d, brand, phone) {
    var body = document.getElementById('mockup-body');
    var visualCard = document.getElementById('site-visual-card');
    var cta1 = document.getElementById('mockup-cta');
    var cta2 = document.getElementById('mockup-cta-2');

    document.getElementById('site-emoji').textContent = d.emoji || '⚡';
    document.getElementById('mockup-tag').textContent = d.tag || ('Работаем по Минску и РБ • ' + phone);
    document.getElementById('mockup-title').textContent = d.title || (brand + ' — точный расчёт за 15 минут');
    document.getElementById('mockup-desc').textContent = d.desc || '';
    cta1.textContent = d.cta || 'Оставить заявку';
    cta2.textContent = d.cta || 'Отправить';

    if (d.menu && d.menu.length) {
        var navHtml = '';
        d.menu.forEach(function(item) {
            navHtml += '<span>' + escapeHtml(item) + '</span>';
        });
        document.getElementById('site-nav-links').innerHTML = navHtml;
    }

    if (d.cardTitle) document.getElementById('site-card-title').textContent = d.cardTitle;
    if (d.stat1) document.getElementById('site-stat1').textContent = '✓ ' + d.stat1;
    if (d.stat2) document.getElementById('site-stat2').textContent = '✓ ' + d.stat2;
    if (d.formTitle) document.getElementById('demo-form-title').textContent = d.formTitle;

    if (d.bg) body.style.background = d.bg;
    if (d.cardBg) visualCard.style.background = d.cardBg;
    if (d.color) body.style.color = d.color;
    if (d.btnBg) {
        cta1.style.background = d.btnBg;
        cta2.style.background = d.btnBg;
    }
    if (d.btnColor) {
        cta1.style.color = d.btnColor;
        cta2.style.color = d.btnColor;
    }

    if (d.services && d.services.length) {
        var srvHtml = '';
        d.services.forEach(function(s) {
            srvHtml += '<div class="demo-srv-card" style="background:' + escapeHtml(d.cardBg || 'rgba(128,128,128,0.12)') + '">' +
                       '<div class="demo-srv-name">' + escapeHtml(s.name) + '</div>' +
                       '<div style="font-size:0.8rem;opacity:0.78;margin-bottom:6px;">' + escapeHtml(s.desc || '') + '</div>' +
                       '<div class="demo-srv-price">' + escapeHtml(s.price) + '</div></div>';
        });
        document.getElementById('demo-services').innerHTML = srvHtml;
    }

    if (d.steps && d.steps.length) {
        var stepHtml = '';
        d.steps.forEach(function(st, idx) {
            stepHtml += '<div class="site-step-item"><strong>Шаг ' + (idx + 1) + '</strong><br><span style="opacity:0.85;">' + escapeHtml(st) + '</span></div>';
        });
        document.getElementById('site-steps').innerHTML = stepHtml;
    }
}

function generateWithAI() {
    if (isGenerating) return;

    var brandInput = document.getElementById('custom-brand');
    var rawBrand = brandInput.value.trim();
    var rawPhone = document.getElementById('custom-phone').value.trim();

    if (rawBrand.length < 2) {
        brandInput.classList.add('input-error');
        brandInput.focus();
        showStatus('⚠️ Впишите вашу нишу (например: Ремонт квартир или Фотограф)', 'is-warn');
        return;
    }

    isGenerating = true;
    var brand = capitalizeFirst(rawBrand);
    var phone = rawPhone || 'Минск • +375 (29) 000-00-00';
    updateLiveHeader();

    var aiBtn = document.getElementById('ai-gen-btn');
    aiBtn.disabled = true;
    aiBtn.textContent = '✨ ИИ собирает сайт...';
    showStatus('⏳ Нейросеть подбирает структуру, оффер и цены в BYN...', 'is-loading');

    fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate', niche: brand, city: phone })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
        if (!data.ok || !data.design) throw new Error('AI error');
        document.querySelectorAll('.color-dot').forEach(function(dot) { dot.classList.remove('active'); });
        applyDesignToDOM(data.design, brand, phone);
        showStatus('✨ Уникальный прототип для «' + brand + '» готов');
    })
    .catch(function() {
        applyDesignToDOM({
            emoji: '✨',
            menu: ['Услуги и цены', 'Примеры работ', 'Отзывы', 'Контакты'],
            tag: 'Работаем по Минску и РБ • ' + phone,
            title: brand + ' — точный расчёт за 15 минут и гарантия по договору',
            desc: 'Оставьте заявку за 15 секунд — подберём решение, зафиксируем смету в BYN и приступим без задержек.',
            cta: 'Рассчитать стоимость',
            cardTitle: 'Факты в цифрах',
            stat1: 'Более 350 выполненных заказов',
            stat2: 'Фиксированная цена в договоре',
            formTitle: 'Получите расчёт стоимости за 10 минут',
            bg: '#0f172a',
            cardBg: '#1e293b',
            color: '#f8fafc',
            btnBg: '#3b82f6',
            btnColor: '#ffffff',
            services: [
                { name: 'Первичная консультация', desc: 'Разбор задачи и подбор решения', price: '0 BYN' },
                { name: 'Базовый пакет услуг', desc: 'Оптимально для быстрого старта', price: 'от 95 BYN' },
                { name: 'Расширенный формат', desc: 'Максимум результата и бонус', price: 'от 210 BYN' }
            ],
            steps: ['Оставляете заявку на сайте за 15 секунд', 'Согласуем смету и удобное время', 'Получаете гарантированный результат']
        }, brand, phone);
        showStatus('✨ Базовый прототип для «' + brand + '» собран');
    })
    .finally(function() {
        isGenerating = false;
        aiBtn.disabled = false;
        aiBtn.textContent = '✨ Сгенерировать сайт с ИИ';
    });
}

function runExample(brand, phone) {
    document.getElementById('custom-brand').value = brand;
    document.getElementById('custom-phone').value = phone;
    generateWithAI();
}

function setTheme(key, dot) {
    document.querySelectorAll('.color-dot').forEach(function(d) { d.classList.remove('active'); });
    if (dot) dot.classList.add('active');

    var t = themes[key];
    document.getElementById('mockup-body').style.background = t.bg;
    document.getElementById('mockup-body').style.color = t.color;
    document.getElementById('site-visual-card').style.background = t.cardBg;
    document.querySelectorAll('.demo-srv-card').forEach(function(card) {
        card.style.background = t.cardBg;
    });
    document.getElementById('mockup-cta').style.background = t.btnBg;
    document.getElementById('mockup-cta').style.color = t.btnColor;
    document.getElementById('mockup-cta-2').style.background = t.btnBg;
    document.getElementById('mockup-cta-2').style.color = t.btnColor;
}

function setDevice(type) {
    var win = document.getElementById('mockup-window');
    document.getElementById('btn-desk').classList.toggle('active', type === 'desk');
    document.getElementById('btn-mob').classList.toggle('active', type === 'mobile');
    win.classList.toggle('mobile-mode', type === 'mobile');
}

function triggerDemoAction(e) {
    if (e) e.preventDefault();
    var toast = document.getElementById('demo-toast');
    var brandName = document.getElementById('demo-logo').textContent;

toast.textContent = '✓ Тестовая заявка с сайта «' + brandName + '» отправлена! На реальном сайте она сразу приходит вам в Telegram.';
toast.style.display = 'block';
if (toastTimer) clearTimeout(toastTimer);
toastTimer = setTimeout(function() {
toast.style.display = 'none';
}, 3500);
}
(function initShowroomOnLoad() {
var params = new URLSearchParams(window.location.search);
var nicheParam = params.get('niche');
if (!nicheParam) {
try { nicheParam = sessionStorage.getItem('clearfe_niche') || ''; } catch (e) {}
}
if (nicheParam) {
var input = document.getElementById('custom-brand');
if (input) {
input.value = nicheParam;
updateLiveHeader();
generateWithAI();
}
}
})();
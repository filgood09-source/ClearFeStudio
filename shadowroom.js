var niches = {
    auto: {
        url: 'https://demo-auto.by',
        logo: 'AutoPro Минск',
        phone: '+375 (29) 555-12-34',
        tag: 'Ремонт и диагностика',
        title: 'Честный автосервис с гарантией на работы 1 год',
        desc: 'Бесплатная компьютерная диагностика при первом обращении. Расчет стоимости ремонта за 15 минут.',
        cta: 'Записаться на диагностику',
        services: [
            { name: 'Замена масла и фильтров', price: 'от 45 BYN' },
            { name: 'Диагностика подвески', price: '30 BYN' },
            { name: 'Компьютерная диагностика', price: 'Бесплатно' }
        ],
        stats: '<div><strong>Было:</strong> 2 заявки в неделю из соцсетей</div><div><strong>Стало:</strong> 18 заявок в неделю с сайта (конверсия 6.4%)</div>'
    },
    coffee: {
        url: 'https://demo-coffee.by',
        logo: 'Roast & Bake',
        phone: 'Минск, пр. Независимости',
        tag: 'Кофейня и пекарня',
        title: 'Свежая обжарка и ремесленная выпечка каждое утро',
        desc: 'Закажите любимый кофе и круассаны заранее к вашему приходу без очереди.',
        cta: 'Открыть меню и заказать',
        services: [
            { name: 'Капучино 300 мл', price: '6.50 BYN' },
            { name: 'Миндальный круассан', price: '7.00 BYN' },
            { name: 'Комбо: кофе + сэндвич', price: '12.90 BYN' }
        ],
        stats: '<div><strong>Было:</strong> Очереди в утренние часы</div><div><strong>Стало:</strong> +35% предзаказов через мобильное веб-приложение</div>'
    },
    school: {
        url: 'https://demo-school.by',
        logo: 'DesignStart',
        phone: 'Старт потока: 1 числа',
        tag: 'Онлайн-образование',
        title: 'Освойте новую профессию с нуля за 2 месяца',
        desc: 'Практические задания, проверка кураторов и помощь с первым портфолио.',
        cta: 'Записаться на пробный урок',
        services: [
            { name: 'Тариф «Базовый»', price: '490 BYN' },
            { name: 'Тариф «С куратором»', price: '790 BYN' },
            { name: 'Пробное занятие', price: '0 BYN' }
        ],
        stats: '<div><strong>Было:</strong> Сбор заявок через длинную Google-форму</div><div><strong>Стало:</strong> Рост конверсии в регистрацию в 2.3 раза</div>'
    },
    beauty: {
        url: 'https://demo-beauty.by',
        logo: 'Lumina Studio',
        phone: 'Онлайн-запись 24/7',
        tag: 'Бьюти-пространство',
        title: 'Идеальный маникюр и уход за волосами в центре Минска',
        desc: 'Стерильные инструменты, топовые мастера и скидка 15% на первое посещение при записи с сайта.',
        cta: 'Выбрать мастера и время',
        services: [
            { name: 'Маникюр с покрытием', price: '65 BYN' },
            { name: 'Сложное окрашивание', price: 'от 180 BYN' },
            { name: 'Оформление бровей', price: '40 BYN' }
        ],
        stats: '<div><strong>Было:</strong> Долгая переписка в Direct</div><div><strong>Стало:</strong> 80% клиентов записываются сами через сайт</div>'
    }
};
var themes = {
    dark: { bg: '#1e293b', color: '#f8fafc', btnBg: '#3b82f6', btnColor: '#ffffff' },
    light: { bg: '#f8fafc', color: '#0f172a', btnBg: '#0f172a', btnColor: '#ffffff' },
    brand: { bg: '#312e81', color: '#ffffff', btnBg: '#10b981', btnColor: '#0f172a' }
};
var currentNiche = 'auto';
function renderServices(list) {
    var html = '';
    list.forEach(function(s) {
        html += '<div class="demo-srv-card"><div class="demo-srv-name">' + s.name + '</div><div class="demo-srv-price">' + s.price + '</div></div>';
    });
    document.getElementById('demo-services').innerHTML = html;
}
function setNiche(key, btn) {
    currentNiche = key;
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var d = niches[key];
    document.getElementById('mockup-url').textContent = d.url;
    document.getElementById('demo-logo').textContent = d.logo;
    document.getElementById('demo-phone').textContent = d.phone;
    document.getElementById('mockup-tag').textContent = d.tag;
    document.getElementById('mockup-title').textContent = d.title;
    document.getElementById('mockup-desc').textContent = d.desc;
    document.getElementById('mockup-cta').textContent = d.cta;
    document.getElementById('mockup-stats').innerHTML = d.stats;
    renderServices(d.services);
    setMode('after');
}
function setTheme(key, dot) {
    document.querySelectorAll('.color-dot').forEach(function(d) { d.classList.remove('active'); });
    dot.classList.add('active');
    var t = themes[key];
    document.getElementById('mockup-body').style.background = t.bg;
    document.getElementById('mockup-body').style.color = t.color;
    document.getElementById('mockup-cta').style.background = t.btnBg;
    document.getElementById('mockup-cta').style.color = t.btnColor;
}
function setDevice(type) {
    var win = document.getElementById('mockup-window');
    document.getElementById('btn-desk').classList.toggle('active', type === 'desktop');
    document.getElementById('btn-mob').classList.toggle('active', type === 'mobile');
    win.classList.toggle('mobile-mode', type === 'mobile');
}
function setMode(mode) {
    var body = document.getElementById('mockup-body');
    document.getElementById('btn-after').classList.toggle('active', mode === 'after');
    document.getElementById('btn-before').classList.toggle('active', mode === 'before');
    body.classList.toggle('old-style', mode === 'before');
    var d = niches[currentNiche];
    document.getElementById('mockup-title').textContent = mode === 'before' ? 'Добро пожаловать на наш сайт. Оказываем услуги.' : d.title;
    document.getElementById('mockup-desc').textContent = mode === 'before' ? 'Звоните по телефону в рабочее время с 9 до 18. Прайс-лист уточняйте у менеджера.' : d.desc;
}
function triggerDemoAction() {
    var toast = document.getElementById('demo-toast');
    toast.style.display = 'block';
    setTimeout(function() { toast.style.display = 'none'; }, 3000);
}
setTheme('dark', document.querySelector('.color-dot'));
renderServices(niches.auto.services);

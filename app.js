var niches = {
    auto: { url: 'https://auto-pro-service.by', tag: 'Ремонт и диагностика', title: 'Честный автосервис с гарантией на работы 1 год', desc: 'Бесплатная компьютерная диагностика при первом обращении. Расчет стоимости ремонта за 15 минут.', cta: 'Записаться на диагностику', stats: '<div><strong>Было:</strong> 2 заявки в неделю из соцсетей</div><div><strong>Стало:</strong> 18 заявок в неделю с сайта (конверсия 6.4%)</div>' },
    coffee: { url: 'https://roast-coffee-bar.by', tag: 'Кофейня и пекарня', title: 'Свежая обжарка и ремесленная выпечка каждое утро', desc: 'Закажите любимый кофе и круассаны заранее к вашему приходу без очереди.', cta: 'Открыть меню и заказать', stats: '<div><strong>Было:</strong> Очереди в утренние часы</div><div><strong>Стало:</strong> +35% предзаказов через мобильное веб-приложение</div>' },
    school: { url: 'https://design-start-academy.by', tag: 'Онлайн-образование', title: 'Освойте новую профессию с нуля за 2 месяца', desc: 'Практические задания, проверка кураторов и помощь с первым портфолио.', cta: 'Записаться на бесплатный урок', stats: '<div><strong>Было:</strong> Сбор заявок через длинную Google-форму</div><div><strong>Стало:</strong> Рост конверсии в регистрацию в 2.3 раза</div>' }
};
var themes = {
    dark: { bg: '#1e293b', color: '#f8fafc', btnBg: '#3b82f6', btnColor: '#ffffff' },
    light: { bg: '#f8fafc', color: '#0f172a', btnBg: '#0f172a', btnColor: '#ffffff' },
    brand: { bg: '#312e81', color: '#ffffff', btnBg: '#10b981', btnColor: '#0f172a' }
};
function setNiche(key, btn) {
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var d = niches[key];
    document.getElementById('mockup-url').textContent = d.url;
    document.getElementById('mockup-tag').textContent = d.tag;
    document.getElementById('mockup-title').textContent = d.title;
    document.getElementById('mockup-desc').textContent = d.desc;
    document.getElementById('mockup-cta').textContent = d.cta;
    document.getElementById('mockup-stats').innerHTML = d.stats;
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
setTheme('dark', document.querySelector('.color-dot'));

var quizSteps = [
    { question: "1. Какая главная цель вашего сайта?", key: "goal", options: [{ title: "Получать заявки на услуги", sub: "Клиенты оставляют контакты", price: 0 }, { title: "Продавать товары онлайн", sub: "Каталог с корзиной", price: 300 }, { title: "Имидж и презентация", sub: "Рассказать о компании", price: 100 }] },
    { question: "2. Какой формат сайта вам ближе?", key: "format", options: [{ title: "Лендинг (одностраничник)", sub: "Быстрый запуск под рекламу", price: 350 }, { title: "Многостраничный сайт", sub: "Отдельные разделы услуг", price: 650 }, { title: "Интернет-магазин / Mini App", sub: "Сложная логика", price: 950 }] },
    { question: "3. Что уже готово для старта?", key: "assets", options: [{ title: "Есть только идея", sub: "Нужна помощь с текстами", price: 150 }, { title: "Есть тексты и фото", sub: "Осталось упаковать в дизайн", price: 50 }, { title: "Нужен редизайн", sub: "Обновить старый сайт", price: 100 }] },
    { question: "4. Какие функции добавить?", key: "features", options: [{ title: "Базовый набор", sub: "Формы заявок в Telegram", price: 0 }, { title: "Квиз или калькулятор", sub: "Расчет цены для клиента", price: 150 }, { title: "Онлайн-оплата и CRM", sub: "Прием платежей", price: 250 }] },
    { question: "5. Какие сроки запуска комфортны?", key: "deadline", options: [{ title: "Срочно (до 7 дней)", sub: "Приоритетная разработка", price: 150 }, { title: "Стандартно (2–3 недели)", sub: "Спокойная проработка", price: 0 }, { title: "Не спешим (от 1 месяца)", sub: "Максимум деталей", price: 0 }] }
];
var currentStep = 0;
var answers = {};
function renderStep() {
    var step = quizSteps[currentStep];
    document.getElementById('question-title').textContent = step.question;
    document.getElementById('progress-fill').style.width = Math.round(((currentStep + 1) / quizSteps.length) * 100) + '%';
    var grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    step.options.forEach(function(opt, i) {
        var card = document.createElement('div');
        card.className = 'option-card' + (answers[step.key] && answers[step.key].index === i ? ' selected' : '');
        card.innerHTML = '<div class="option-title">' + opt.title + '</div><div class="option-sub">' + opt.sub + '</div>';
        card.onclick = function() { answers[step.key] = { index: i, title: opt.title, price: opt.price }; renderStep(); };
        grid.appendChild(card);
    });
    document.getElementById('prev-btn').style.visibility = currentStep === 0 ? 'hidden' : 'visible';
    document.getElementById('next-btn').textContent = currentStep === quizSteps.length - 1 ? 'Показать расчет' : 'Далее';
}
function nextStep() {
    if (!answers[quizSteps[currentStep].key]) { alert('Выберите один из вариантов.'); return; }
    if (currentStep < quizSteps.length - 1) { currentStep++; renderStep(); } else { showResult(); }
}
function prevStep() { if (currentStep > 0) { currentStep--; renderStep(); } }
function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    var total = 0;
    Object.keys(answers).forEach(function(k) { total += answers[k].price; });
    document.getElementById('result-summary').innerHTML =
        '<div class="result-row"><span>Цель:</span><strong>' + answers.goal.title + '</strong></div>' +
        '<div class="result-row"><span>Формат:</span><strong>' + answers.format.title + '</strong></div>' +
        '<div class="result-row"><span>Материалы:</span><strong>' + answers.assets.title + '</strong></div>' +
        '<div class="result-row"><span>Функции:</span><strong>' + answers.features.title + '</strong></div>' +
        '<div class="result-row"><span>Сроки:</span><strong>' + answers.deadline.title + '</strong></div>';
    document.getElementById('final-price').textContent = 'от ' + total + ' BYN';
}
function restartQuiz() {
    currentStep = 0; answers = {};
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    renderStep();
}
function sendToTelegram(e) {
    e.preventDefault();
    var total = 0;
    Object.keys(answers).forEach(function(k) { total += answers[k].price; });
    var note = document.getElementById('client-contact').value.trim();
    var text = 'Заявка с сайта DevStudio:\n' +
        '• Цель: ' + answers.goal.title + '\n' +
        '• Формат: ' + answers.format.title + '\n' +
        '• Материалы: ' + answers.assets.title + '\n' +
        '• Функции: ' + answers.features.title + '\n' +
        '• Сроки: ' + answers.deadline.title + '\n' +
        '• Бюджет: от ' + total + ' BYN' + (note ? '\n• Комментарий: ' + note : '');
    var url = 'tg://resolve?domain=travellereagle&text=' + encodeURIComponent(text);
    window.open(url, '_blank');
    var msg = document.getElementById('success-msg');
    msg.style.display = 'block';
    msg.innerHTML = '✅ ТЗ сформировано! Если Telegram не открылся сам, <a href="' + url + '" style="text-decoration: underline;">нажмите сюда</a>.';
}
renderStep();

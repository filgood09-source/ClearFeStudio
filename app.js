function toggleMenu() {
    document.getElementById('nav-links').classList.toggle('open');
}
function closeMenu() {
    document.getElementById('nav-links').classList.remove('open');
}

var quizSteps = [
    { question: "1. Какая главная цель вашего сайта?", key: "goal", options: [{ title: "Получать заявки на услуги", sub: "Клиенты оставляют контакты", price: 0 }, { title: "Продавать товары онлайн", sub: "Каталог с корзиной", price: 0 }, { title: "Имидж и презентация", sub: "Рассказать о компании", price: 0 }] },
    { question: "2. Какой формат сайта вам ближе?", key: "format", options: [{ title: "Лендинг (одностраничник)", sub: "Быстрый запуск под рекламу", price: 450 }, { title: "Многостраничный сайт", sub: "Отдельные разделы услуг", price: 800 }, { title: "Интернет-магазин / Mini App", sub: "Сложная логика и каталог", price: 1150 }] },
    { question: "3. Что уже готово для старта?", key: "assets", options: [{ title: "Есть только идея", sub: "Нужна помощь со структурой", price: 150 }, { title: "Есть тексты и фото", sub: "Осталось упаковать в дизайн", price: 50 }, { title: "Нужен редизайн", sub: "Обновить старый сайт", price: 120 }] },
    { question: "4. Какие функции добавить?", key: "features", options: [{ title: "Базовый набор", sub: "Формы заявок в Telegram", price: 0 }, { title: "Квиз или калькулятор", sub: "Расчет цены для клиента", price: 180 }, { title: "Онлайн-оплата и CRM", sub: "Прием платежей и интеграции", price: 300 }] },
    { question: "5. Какие сроки запуска комфортны?", key: "deadline", options: [{ title: "Срочно (до 7 дней)", sub: "Приоритетная разработка", price: 200 }, { title: "Стандартно (2–3 недели)", sub: "Спокойная проработка", price: 0 }, { title: "Не спешим (от 1 месяца)", sub: "Максимум деталей", price: 0 }] }
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
        card.onclick = function() {
            answers[step.key] = { index: i, title: opt.title, price: opt.price };
            renderStep();
        };
        grid.appendChild(card);
    });
    document.getElementById('prev-btn').style.visibility = currentStep === 0 ? 'hidden' : 'visible';
    document.getElementById('next-btn').textContent = currentStep === quizSteps.length - 1 ? 'Показать расчет' : 'Далее';
}

function nextStep() {
    if (!answers[quizSteps[currentStep].key]) {
        alert('Выберите один из вариантов.');
        return;
    }
    if (currentStep < quizSteps.length - 1) {
        currentStep++;
        renderStep();
    } else {
        showResult();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
}

function getTotalSum() {
    var total = 0;
    Object.keys(answers).forEach(function(k) {
        total += answers[k].price;
    });
    document.querySelectorAll('.addon-item input:checked').forEach(function(cb) {
        total += parseInt(cb.value, 10);
    });
    return total;
}

function recalcTotal() {
    document.getElementById('final-price').textContent = 'от ' + getTotalSum() + ' BYN';
}

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('result-summary').innerHTML =
        '<div class="result-row"><span>Цель:</span><strong>' + answers.goal.title + '</strong></div>' +
        '<div class="result-row"><span>Формат:</span><strong>' + answers.format.title + '</strong></div>' +
        '<div class="result-row"><span>Материалы:</span><strong>' + answers.assets.title + '</strong></div>' +
        '<div class="result-row"><span>Функции:</span><strong>' + answers.features.title + '</strong></div>' +
        '<div class="result-row"><span>Сроки:</span><strong>' + answers.deadline.title + '</strong></div>';
    recalcTotal();
}

function restartQuiz() {
    currentStep = 0;
    answers = {};
    document.querySelectorAll('.addon-item input').forEach(function(cb) {
        cb.checked = false;
    });
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('success-msg').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    renderStep();
}

function buildTZText() {
    var total = getTotalSum();
    var note = document.getElementById('client-contact').value.trim();
    var addons = [];
    document.querySelectorAll('.addon-item input:checked').forEach(function(cb) {
        addons.push(cb.getAttribute('data-name'));
    });
    var lines = [
        'Заявка с сайта ClearFeStudio:',
        '- Цель: ' + answers.goal.title,
        '- Формат: ' + answers.format.title,
        '- Материалы: ' + answers.assets.title,
        '- Функции: ' + answers.features.title,
        '- Сроки: ' + answers.deadline.title
    ];
    if (addons.length) {
        lines.push('- Доп. опции: ' + addons.join(', '));
    }
    lines.push('- Бюджет: от ' + total + ' BYN');
    if (note) {
        lines.push('- Комментарий: ' + note);
    }
    return lines.join('\n');
}

function copyTZ() {
    navigator.clipboard.writeText(buildTZText()).then(function() {
        var btn = document.getElementById('copy-btn');
        btn.textContent = 'Скопировано';
        setTimeout(function() {
            btn.textContent = 'Скопировать ТЗ';
        }, 2000);
    });
}

function sendToTelegram(e) {
    e.preventDefault();
    var url = 'tg://resolve?domain=clearfe_leads_bot&text=' + encodeURIComponent(buildTZText());
    window.open(url, '_blank');
    var msg = document.getElementById('success-msg');
    msg.style.display = 'block';
    msg.innerHTML = 'ТЗ сформировано! Если Telegram не открылся сам, <a href="' + url + '" style="text-decoration: underline;">нажмите сюда</a>.';
}

renderStep();

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
});

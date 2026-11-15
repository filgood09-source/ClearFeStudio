const niches = {
    auto: {
        url: 'https://auto-pro-service.by',
        tag: 'Ремонт и диагностика',
        title: 'Честный автосервис с гарантией на работы 1 год',
        desc: 'Бесплатная компьютерная диагностика при первом обращении. Расчет стоимости ремонта за 15 минут.',
        cta: 'Записаться на диагностику',
        stats: '<div><strong>Было:</strong> 2 заявки в неделю из соцсетей</div><div><strong>Стало:</strong> 18 заявок в неделю с сайта (конверсия 6.4%)</div>'
    },
    coffee: {
        url: 'https://roast-coffee-bar.by',
        tag: 'Кофейня и пекарня',
        title: 'Свежая обжарка и ремесленная выпечка каждое утро',
        desc: 'Закажите любимый кофе и круассаны заранее к вашему приходу без очереди.',
        cta: 'Открыть меню и заказать',
        stats: '<div><strong>Было:</strong> Очереди в утренние часы</div><div><strong>Стало:</strong> +35% предзаказов через мобильное веб-приложение</div>'
    },
    school: {
        url: 'https://design-start-academy.by',
        tag: 'Онлайн-образование',
        title: 'Освойте новую профессию с нуля за 2 месяца',
        desc: 'Практические задания, проверка кураторов и помощь с первым портфолио.',
        cta: 'Записаться на бесплатный урок',
        stats: '<div><strong>Было:</strong> Сбор заявок через длинную Google-форму</div><div><strong>Стало:</strong> Рост конверсии в регистрацию в 2.3 раза</div>'
    }
};

const themes = {
    dark: { bg: '#1e293b', color: '#f8fafc', btnBg: '#3b82f6', btnColor: '#ffffff' },
    light: { bg: '#f8fafc', color: '#0f172a', btnBg: '#0f172a', btnColor: '#ffffff' },
    brand: { bg: '#312e81', color: '#ffffff', btnBg: '#10b981', btnColor: '#0f172a' }
};

function setNiche(key, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const data = niches[key];
    document.getElementById('mockup-url').textContent = data.url;
    document.getElementById('mockup-tag').textContent = data.tag;
    document.getElementById('mockup-title').textContent = data.title;
    document.getElementById('mockup-desc').textContent = data.desc;
    document.getElementById('mockup-cta').textContent = data.cta;
    document.getElementById('mockup-stats').innerHTML = data.stats;
}

function setTheme(key, dot) {
    document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    const t = themes[key];
    const body = document.getElementById('mockup-body');
    const cta = document.getElementById('mockup-cta');
    body.style.background = t.bg;
    body.style.color = t.color;
    cta.style.background = t.btnBg;
    cta.style.color = t.btnColor;
}

setTheme('dark', document.querySelector('.color-dot'));

const quizSteps = [
    {
        question: "1. Какая главная цель вашего сайта?",
        key: "goal",
        options: [
            { title: "Получать заявки на услуги", sub: "Клиенты оставляют контакты или звонят", price: 0 },
            { title: "Продавать товары онлайн", sub: "Каталог с корзиной и заказами", price: 300 },
            { title: "Имидж и презентация", sub: "Рассказать о компании и кейсах", price: 100 }
        ]
    },
    {
        question: "2. Какой формат сайта вам ближе?",
        key: "format",
        options: [
            { title: "Лендинг (одностраничник)", sub: "Быстрый запуск под рекламу или услугу", price: 350 },
            { title: "Многостраничный сайт", sub: "Отдельные разделы под каждую услугу", price: 650 },
            { title: "Интернет-магазин / Веб-приложение", sub: "Сложная логика и фильтрация", price: 950 }
        ]
    },
    {
        question: "3. Что уже готово для старта?",
        key: "assets",
        options: [
            { title: "Есть только идея", sub: "Нужна помощь со структурой и текстами", price: 150 },
            { title: "Есть тексты и фото", sub: "Осталось упаковать в красивый дизайн", price: 50 },
            { title: "Нужен редизайн старого сайта", sub: "Обновить внешний вид и скорость", price: 100 }
        ]
    },
    {
        question: "4. Какие функции добавить?",
        key: "features",
        options: [
            { title: "Базовый набор", sub: "Формы заявок и отправка в мессенджер", price: 0 },
            { title: "Квиз или калькулятор", sub: "Интерактивный расчет цены для клиента", price: 150 },
            { title: "Онлайн-оплата и интеграции", sub: "Прием платежей или связь с CRM", price: 250 }
        ]
    },
    {
        question: "5. Какие сроки запуска комфортны?",
        key: "deadline",
        options: [
            { title: "Срочно (до 7 дней)", sub: "Приоритетная разработка", price: 150, time: "5–7 дней" },
            { title: "Стандартно (2–3 недели)", sub: "Спокойная проработка деталей", price: 0, time: "14–20 дней" },
            { title: "Не спешим (от 1 месяца)", sub: "Максимум внимания к контенту", price: 0, time: "от 25 дней" }
        ]
    }
];

let currentStep = 0;
let answers = {};

function renderStep() {
    const step = quizSteps[currentStep];
    document.getElementById('question-title').textContent = step.question;
    document.getElementById('step-text').textContent = `Шаг ${currentStep + 1} из ${quizSteps.length}`;
    const percent = Math.round(((currentStep + 1) / quizSteps.length) * 100);
    document.getElementById('step-percent').textContent = `${percent}%`;
    document.getElementById('progress-fill').style.width = `${percent}%`;

    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';

    step.options.forEach((opt, index) => {
        const card = document.createElement('div');
        card.className = 'option-card';
        if (answers[step.key] && answers[step.key].index === index) {
            card.classList.add('selected');
        }
        card.innerHTML = `<div class="option-title">${opt.title}</div><div class="option-sub">${opt.sub}</div>`;
        card.onclick = () => selectOption(step.key, index, opt);
        grid.appendChild(card);
    });

    document.getElementById('prev-btn').style.visibility = currentStep === 0 ? 'hidden' : 'visible';
    document.getElementById('next-btn').textContent = currentStep === quizSteps.length - 1 ? 'Показать расчет' : 'Далее';
}

function selectOption(key, index, opt) {
    answers[key] = { index, ...opt };
    renderStep();
}

function nextStep() {
    const step = quizSteps[currentStep];
    if (!answers[step.key]) {
        alert('Пожалуйста, выберите один из вариантов.');
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

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';

    let totalPrice = 0;
    Object.values(answers).forEach(item => totalPrice += item.price);

    document.getElementById('result-summary').innerHTML = `
        <div class="result-row"><span>Цель:</span><strong>${answers.goal.title}</strong></div>
        <div class="result-row"><span>Формат:</span><strong>${answers.format.title}</strong></div>
        <div class="result-row"><span>Материалы:</span><strong>${answers.assets.title}</strong></div>
        <div class="result-row"><span>Функционал:</span><strong>${answers.features.title}</strong></div>
        <div class="result-row"><span>Сроки:</span><strong>${answers.deadline.title}</strong></div>
    `;
    document.getElementById('final-price').textContent = `от ${totalPrice} BYN`;
    document.getElementById('final-time').textContent = answers.deadline.time;

    document.getElementById('google-tz-input').value =
        `Цель: ${answers.goal.title} | ` +
        `Формат: ${answers.format.title} | ` +
        `Материалы: ${answers.assets.title} | ` +
        `Функции: ${answers.features.title} | ` +
        `Сроки: ${answers.deadline.title} (${answers.deadline.time}) | ` +
        `Бюджет: от ${totalPrice} BYN`;
}

function restartQuiz() {
    currentStep = 0;
    answers = {};
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('success-msg').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    renderStep();
}

function handleFormSuccess() {
    const contact = document.getElementById('client-contact').value;
    const msgBox = document.getElementById('success-msg');
    setTimeout(() => {
        msgBox.style.display = 'block';
        msgBox.innerHTML = `✅ Заявка успешно отправлена! Я свяжусь с вами по контакту <strong>${contact}</strong> в ближайшее время.`;
        document.getElementById('client-contact').value = '';
    }, 500);
}

renderStep();

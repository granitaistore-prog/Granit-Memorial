import { TELEGRAM_CONFIG, SITE_CONFIG } from './config.js';

// 🗿 База даних товарів (редагуйте тут)
const products = [
    {
        id: 1,
        name: "Класичний Граніт",
        price: 12500,
        image: "https://via.placeholder.com/400x300/2d3748/ffffff?text=Granite+Classic",
        description: "Чорний граніт, поліровка, золоте напилення. Розмір: 100×50×10 см."
    },
    {
        id: 2,
        name: "Модерн Абстракт",
        price: 18200,
        image: "https://via.placeholder.com/400x300/4a5568/ffffff?text=Modern+Abstract",
        description: "Сучасний дизайн, складна форма, габро-діабаз. Розмір: 120×60×12 см."
    },
    {
        id: 3,
        name: "Мармуровий Хрест",
        price: 9800,
        image: "https://via.placeholder.com/400x300/718096/ffffff?text=Marble+Cross",
        description: "Білий мармур, художнє різьблення, елегантний дизайн."
    },
    {
        id: 4,
        name: "Сімейний Меморіал",
        price: 35000,
        image: "https://via.placeholder.com/400x300/2d3748/ffffff?text=Family+Memorial",
        description: "Комплексне рішення на 2-3 особи, бронзові елементи, гранітна кришка."
    }
];

// 🎨 Рендер каталогу
function renderCatalog() {
    const grid = document.getElementById('catalog-grid');
    const select = document.getElementById('monument-type');
    
    // Додаємо опцію за замовчуванням
    const defaultOption = document.createElement('option');
    defaultOption.value = "consultation";
    defaultOption.textContent = "💬 Потрібна консультація";
    select.appendChild(defaultOption);

    products.forEach(product => {
        // Додаємо в select
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = `${product.name} — ${formatPrice(product.price)}`;
        select.appendChild(option);

        // Створюємо картку товару
        const card = document.createElement('div');
        card.className = "monument-card bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full";
        card.innerHTML = `
            <div class="h-56 overflow-hidden bg-gray-100 relative group">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition duration-500 group-hover:scale-105" onerror="this.parentElement.classList.add('placeholder-img')">
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <h3 class="text-lg font-bold text-gray-900 mb-2">${product.name}</h3>
                <p class="text-gray-500 text-sm mb-4 flex-grow">${product.description}</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-lg font-bold gold-accent">${formatPrice(product.price)}</span>
                    <button onclick="selectProduct('${product.name}')" class="text-sm font-semibold text-gray-600 hover:text-black underline">Замовити →</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 💰 Форматування ціни
function formatPrice(price) {
    return new Intl.NumberFormat('uk-UA').format(price) + ` ${SITE_CONFIG.CURRENCY}`;
}

// 🎯 Вибір товару та скрол до форми
window.selectProduct = function(name) {
    document.getElementById('monument-type').value = name;
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
};

// 📱 Мобільне меню
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// 📤 Обробка форми + Telegram
document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = document.getElementById('submitBtn');
    const spinner = document.getElementById('loadingSpinner');
    const status = document.getElementById('formStatus');
    
    // UI: завантаження
    btn.disabled = true;
    spinner.classList.remove('hidden');
    status.classList.add('hidden');

    const data = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        type: document.getElementById('monument-type').value,
        message: document.getElementById('message').value.trim() || "—"
    };

    // Формуємо повідомлення для Telegram
    const text = `
📢 *НОВА ЗАЯВКА З САЙТУ*
━━━━━━━━━━━━━━━━━━
👤 *Клієнт:* ${data.name}
📞 *Телефон:* ${data.phone}
🗿 *Товар:* ${data.type}
📝 *Коментар:* ${data.message}
🕐 *Час:* ${new Date().toLocaleString('uk-UA')}
    `.trim();

    // ⚠️ Перевірка налаштувань
    if (TELEGRAM_CONFIG.BOT_TOKEN === "YOUR_BOT_TOKEN_HERE") {
        showStatus("⚠️ Налаштуйте TELEGRAM_CONFIG у файлі config.js", "text-yellow-600", status);
        resetForm(btn, spinner);
        return;
    }

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CONFIG.CHAT_ID,
                    text: text,
                    parse_mode: 'Markdown'
                })
            }
        );

        const result = await response.json();
        
        if (result.ok) {
            showStatus("✅ Заявка успішно відправлена! Ми зв'яжемося з вами.", "text-green-600", status);
            e.target.reset();
        } else {
            throw new Error(result.description);
        }
    } catch (error) {
        console.error('Telegram error:', error);
        showStatus("❌ Помилка відправки. Зателефонуйте нам: " + SITE_CONFIG.PHONE, "text-red-600", status);
    } finally {
        resetForm(btn, spinner);
    }
});

function resetForm(btn, spinner) {
    btn.disabled = false;
    spinner.classList.add('hidden');
}

function showStatus(msg, colorClass, element) {
    element.textContent = msg;
    element.className = `mt-4 text-center text-sm font-bold ${colorClass} block`;
    setTimeout(() => element.classList.add('hidden'), 6000);
}

// 🚀 Ініціалізація
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
});

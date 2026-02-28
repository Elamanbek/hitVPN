import { Language } from '../types';

export const translations = {
  en: {
    // Sidebar
    dashboard: "Dashboard",
    servers: "Servers",
    admin: "Admin",
    users: "User Management",
    analytics: "Analytics",
    arch_docs: "Architecture Docs",
    install_app: "Install App",
    support: "AI Support",
    settings: "Settings",
    sign_out: "Sign Out",
    
    // Dashboard
    welcome: "Welcome back",
    secure_connection: "Your connection is encrypted and secure.",
    connect_now: "Connect Now",
    protection_active: "Protection Active",
    low_latency: "Low Latency",
    subscription_plan: "Subscription Plan",
    premium_year: "Premium - 1 Year",
    expires: "Expires",
    extend_subscription: "Extend Subscription",
    balance: "Balance",
    top_up: "Top Up",
    insufficient_funds: "Insufficient funds",
    pay_with_balance: "Pay with Balance",
    confirm_payment: "Confirm Payment",
    confirm_text: "Deduct 299 ₽ from your balance to extend subscription?",
    ios_app: "iOS App",
    android_app: "Android App",
    add_home: "Add to Home Screen",
    get_google: "Get it on Google Play",
    install_profile: "Install Profile",
    download_apk: "Download APK",
    total_download: "Total Download",
    total_upload: "Total Upload",
    days_active: "Days Active",
    data_usage_7d: "Data Usage (Last 7 Days)",
    
    // Servers
    available_nodes: "Available Nodes",
    showing_servers: "Showing optimized servers",
    load: "Load",
    get_config: "Get Configuration",
    maintenance: "Maintenance",
    
    // Config Modal
    online_ready: "Online & Ready to Connect",
    scan_qr: "Scan with",
    mobile_tip: "Tip: On mobile? Copy the config below or download the file.",
    copy_config: "Copy Configuration",
    copied: "Copied to Clipboard",
    download_file: "Download File",
    
    // Payment
    payment_title: "Top Up Balance",
    payment_desc: "Add funds to your wallet to pay for subscriptions.",
    method_card: "Bank Card",
    method_sbp: "SBP (Faster Payments)",
    card_number: "Card Number",
    expiry: "MM/YY",
    cvc: "CVC",
    pay_button: "Top Up",
    sbp_instruction: "Scan the QR code with your banking app (Sberbank, Tinkoff, VTB, etc.)",
    sbp_button: "Open Banking App",
    processing: "Processing...",
    success_title: "Top Up Successful!",
    success_desc: "Funds have been added to your balance.",
    close: "Close",

    // Install Guide
    install_guide_title: "Install HitVPN",
    install_step_1: "1. Install the Dashboard",
    install_step_2: "2. Install VPN Client",
    install_ios_instr: "Tap the Share button in Safari, then select 'Add to Home Screen'.",
    install_android_instr: "Tap the menu (three dots) in Chrome, then select 'Install App' or 'Add to Home Screen'.",
    install_client_desc: "This dashboard generates secure keys. To connect, you need the WireGuard client.",
    download_wireguard: "Download WireGuard",
    
    // Admin
    admin_overview: "Overview",
    total_revenue: "Total Revenue",
    active_users: "Active Users",
    server_health: "Server Health",
    recent_activity: "Recent Activity",
    revenue_chart: "Revenue (Last 6 Months)"
  },
  ru: {
    // Sidebar
    dashboard: "Главная",
    servers: "Серверы",
    admin: "Админка",
    users: "Управление",
    analytics: "Аналитика",
    arch_docs: "Архитектура",
    install_app: "Установить",
    support: "Поддержка AI",
    settings: "Настройки",
    sign_out: "Выйти",
    
    // Dashboard
    welcome: "С возвращением",
    secure_connection: "Ваше соединение зашифровано и безопасно.",
    connect_now: "Подключиться",
    protection_active: "Защита активна",
    low_latency: "Низкий пинг",
    subscription_plan: "Тарифный план",
    premium_year: "Премиум - 1 Год",
    expires: "Истекает",
    extend_subscription: "Продлить подписку",
    balance: "Баланс",
    top_up: "Пополнить",
    insufficient_funds: "Недостаточно средств",
    pay_with_balance: "Оплатить с баланса",
    confirm_payment: "Подтверждение",
    confirm_text: "Списать 299 ₽ с баланса за продление подписки?",
    ios_app: "Приложение iOS",
    android_app: "Приложение Android",
    add_home: "Добавить на экран",
    get_google: "Скачать в Google Play",
    install_profile: "Установить профиль",
    download_apk: "Скачать APK",
    total_download: "Скачано",
    total_upload: "Загружено",
    days_active: "Дней в сети",
    data_usage_7d: "Трафик (7 дней)",
    
    // Servers
    available_nodes: "Доступные узлы",
    showing_servers: "Отображаются лучшие серверы",
    load: "Загрузка",
    get_config: "Получить конфиг",
    maintenance: "Обслуживание",
    
    // Config Modal
    online_ready: "Онлайн и готов к работе",
    scan_qr: "Сканируйте через",
    mobile_tip: "Совет: На телефоне? Скопируйте конфиг ниже или скачайте файл.",
    copy_config: "Копировать конфиг",
    copied: "Скопировано",
    download_file: "Скачать файл",

    // Payment
    payment_title: "Пополнение баланса",
    payment_desc: "Пополните кошелек для оплаты подписки.",
    method_card: "Банковская карта",
    method_sbp: "СБП (Система Быстрых Платежей)",
    card_number: "Номер карты",
    expiry: "ММ/ГГ",
    cvc: "CVC",
    pay_button: "Пополнить",
    sbp_instruction: "Сканируйте QR-код в приложении банка (Сбербанк, Тинькофф, ВТБ и др.)",
    sbp_button: "Открыть приложение банка",
    processing: "Обработка...",
    success_title: "Пополнение успешно!",
    success_desc: "Средства зачислены на ваш баланс.",
    close: "Закрыть",

    // Install Guide
    install_guide_title: "Установка HitVPN",
    install_step_1: "1. Установите Дашборд",
    install_step_2: "2. Установите VPN Клиент",
    install_ios_instr: "Нажмите кнопку 'Поделиться' в Safari, затем 'На экран «Домой»'.",
    install_android_instr: "Нажмите меню (три точки) в Chrome, затем 'Установить приложение' или 'Добавить на гл. экран'.",
    install_client_desc: "Этот дашборд создает ключи. Для подключения нужен клиент WireGuard.",
    download_wireguard: "Скачать WireGuard",

    // Admin
    admin_overview: "Обзор",
    total_revenue: "Общая выручка",
    active_users: "Активные пользователи",
    server_health: "Здоровье серверов",
    recent_activity: "Недавняя активность",
    revenue_chart: "Выручка (6 месяцев)"
  }
};

export const getTranslation = (lang: Language, key: keyof typeof translations['en']) => {
  return translations[lang][key] || translations['en'][key];
};
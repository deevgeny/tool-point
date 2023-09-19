export const TITLE = {
  '/': 'Главная',
  '/account': 'Мой аккаунт',
  '/account/user': 'Мой аккаунт - личные данные',
  '/clients': 'Клиенты',
  '/products': 'Продукты',
  '/stock': 'Склад',
  '/stats': 'Статистика',
  '/tools': 'Инструменты',
}

export function get_page_title(pathname) {
  return TITLE[pathname] || '';
}

export const TITLE = {
  '/': 'Главная',
  '/account': 'Мой аккаунт',
  '/account/user': 'Мой аккаунт - личные данные'
}

export function get_page_title(pathname) {
  return TITLE[pathname] || '';
}

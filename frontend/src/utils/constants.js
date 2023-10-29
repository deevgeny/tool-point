// Width of responsive sidebar
export const drawerWidth = 240;

// API fields translation
export const apiFields = {
  first_name: 'Имя',
  middle_name: 'Отчество',
  last_name: 'Фамилия',
  email: 'Адрес электронной почты',
  phone: 'Номер телефона',
  photo: 'Фото',
  password: 'Пароль',
  new_password: 'Новый пароль',
  re_password: 'Повторить новый пароль'
};

// Error status
export const errorStatusMessage = {
  400: 'Некорректный запрос',
  401: 'Требуется аутентификация',
  403: 'Запрещено',
  404: 'Не найден',
  408: 'Тайм-аут запроса',
  429: 'Слишком много запросов',
  500: 'Внутренняя ошибка сервера',
  501: 'Не реализовано',
  502: 'Плохой шлюз',
  503: 'Служба недоступна',
  504: 'Тайм-аут шлюза',
  'NetworkError when attempting to fetch resource.': 'Сетевая ошибка при попытке извлечения ресурса'
};

// Tool cards data
export const toolCards = [
  {
    id: 1,
    name: 'Анализ первого уровня',
    description: 'При возникновении массовых дефектов и проблем с качеством на линии клиента.',
    link: '/tools/first-level-analysis'
  },
  {
    id: 2,
    name: 'Еженедельный отчет PT-ED',
    description: 'Заполняется на еженедельной основе для линий предварительной подготовки и нанесения катафорезного грунта.',
    link: '#'
  },
  {
    id: 3,
    name: 'Ежемесячный отчет ED',
    description: 'Заполняется на ежемесячной основе для линий нанесения катафорезного грунта.',
    link: '#'
  },
  {
    id: 4,
    name: 'Расчет бизнес кейса',
    description: 'Предварительный расчет и оценка новых бизнес кейсов.',
    link: '#'
  },
  {
    id: 5,
    name: 'APQP',
    description: 'Разработка новых продуктов.',
    link: '#'
  },
  {
    id: 6,
    name: 'Карта процесса',
    description: 'Заполняется для каждой линии клиента и поддерживается в актуальном состоянии.',
    link: '#'
  },
  {
    id: 7,
    name: 'Инструмент',
    description: 'Описание инструмента',
    link: '#'
  },
  {
    id: 8,
    name: 'Инструмент',
    description: 'Описание инструмента',
    link: '#'
  }
]
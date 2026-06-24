export default {
  translation: {
    appName: 'Hexlet Chat',

    common: {
      loading: 'Загрузка...',
      submit: 'Отправить',
      cancel: 'Отменить',
      close: 'Закрыть',
    },

    auth: {
      login: 'Войти',
      logout: 'Выйти',
      signup: 'Регистрация',

      username: 'Ваш ник',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',

      noAccount: 'Нет аккаунта?',
      hasAccount: 'Уже есть аккаунт?',

      authFailed: 'Неверные имя пользователя или пароль',
      userExists: 'Такой пользователь уже существует',
    },

    channels: {
      title: 'Каналы',
      add: 'Добавить канал',
      remove: 'Удалить',
      rename: 'Переименовать',
      manage: 'Управление каналом',
    },

    messages: {
      send: 'Отправить',
      placeholder: 'Введите сообщение...',
      count: 'сообщений',
    },

    modals: {
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      removeChannel: 'Удалить канал',
      confirmDelete: 'Уверены?',
    },

    validation: {
      required: 'Обязательное поле',
      usernameLength: 'От 3 до 20 символов',
      passwordLength: 'Не менее 6 символов',
      passwordsMustMatch: 'Пароли должны совпадать',
      uniqueChannel: 'Должно быть уникальным',
    },
  },
};

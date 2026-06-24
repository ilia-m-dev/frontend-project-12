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
      usernameSignup: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',

      noAccount: 'Нет аккаунта?',
      hasAccount: 'Уже есть аккаунт?',

      authFailed: 'Неверные имя пользователя или пароль',
      userExists: 'Такой пользователь уже существует',
      signupSubmit: 'Зарегистрироваться',
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
      newMessage: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
      loading: 'Загрузка...',
      count_one: '{{count}} сообщение',
      count_few: '{{count}} сообщения',
      count_many: '{{count}} сообщений',
      count_other: '{{count}} сообщений',
    },

    modals: {
      addChannel: {
        title: 'Добавить канал',
        cancel: 'Отменить',
        submit: 'Отправить',
      },
      renameChannel: {
        title: 'Переименовать канал',
        cancel: 'Отменить',
        submit: 'Отправить',
      },
      removeChannel: {
        title: 'Удалить канал',
        body: 'Уверены?',
        cancel: 'Отменить',
        submit: 'Удалить',
      },
    },

    validation: {
      required: 'Обязательное поле',
      nameLength: 'От 3 до 20 символов',
      passwordLength: 'Не менее 6 символов',
      passwordsMustMatch: 'Пароли должны совпадать',
      uniqueChannel: 'Должно быть уникальным',
    },

    toasts: {
      channelCreated: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удален',
    },

    errors: {
      loadingData: 'Ошибка загрузки данных',
      network: 'Ошибка соединения',
    },

    notFound: {
      title: 'Страница не найдена.',
      link: 'На главную',
    },
  },
};

import * as yup from 'yup';

const createSignupSchema = (t) => yup.object({
  username: yup
    .string()
    .trim()
    .required(t('validation.required'))
    .min(3, t('validation.nameLength'))
    .max(20, t('validation.nameLength')),

  password: yup
    .string()
    .required(t('validation.required'))
    .min(6, t('validation.passwordLength')),

  confirmPassword: yup
    .string()
    .required(t('validation.required'))
    .oneOf(
      [yup.ref('password')],
      t('validation.passwordsMustMatch'),
    ),
});

export default createSignupSchema;
import * as yup from 'yup';

const createChannelSchema = (t, channelNames) => yup.object({
  name: yup
    .string()
    .trim()
    .required(t('validation.required'))
    .min(3, t('validation.nameLength'))
    .max(20, t('validation.nameLength'))
    .notOneOf(channelNames, t('validation.uniqueChannel')),
});

export default createChannelSchema;
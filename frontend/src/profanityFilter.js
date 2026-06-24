import leoProfanity from 'leo-profanity';

leoProfanity.clearList();
leoProfanity.add([
  ...leoProfanity.getDictionary('en'),
  ...leoProfanity.getDictionary('ru'),
]);

const cleanProfanity = (text) => leoProfanity.clean(text);

export default cleanProfanity;

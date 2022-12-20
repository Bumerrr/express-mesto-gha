function validateUrl(url) {
  const test = /^https?:\/\/(www\.)?[a-zA-Z\d]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/g;
  if (test.test(url)) {
    return url;
  }
  throw new Error('Невалидная ссылка');
}

module.exports = { validateUrl };

function titleConversion(title) {
  let specialChars = /[^a-zA-Z0-9 :]/g //non alphanumeric
  let whiteSpace = /\s+/g //for white space
  let urlTitle = title;
  urlTitle = urlTitle.replace(specialChars, '');
  urlTitle = urlTitle.replace(whiteSpace, '_');
  return urlTitle;
}

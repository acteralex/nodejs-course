const template = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encrypt(txt, shift) {
  return txt.slice(-shift, txt.length).concat(txt.slice(0, -shift));
}

function map(text, dictionary) {
  let newText = '';
  for (let i = 0; i < text.length; i++) {
    if (dictionary[text[i]]) {
      newText += dictionary[text[i]];
    } else {
      newText += text[i];
    }
  }
  return newText;
}

function createDictionary(encodedTemplate, isDirect) {
  const dictionary = {};
  let mapToDictionaryFn;
  if (isDirect) {
    mapToDictionaryFn = i => {
      dictionary[template[i]] = encodedTemplate[i];
      dictionary[template[i].toLowerCase()] = encodedTemplate[i].toLowerCase();
    };
  } else {
    mapToDictionaryFn = i => {
      dictionary[encodedTemplate[i]] = template[i];
      dictionary[encodedTemplate[i].toLowerCase()] = template[i].toLowerCase();
    };
  }

  for (let i = 0; i < template.length; i++) {
    mapToDictionaryFn(i);
  }
  return dictionary;
}

function getEncodeFn(shift) {
  const encodedTemplate = encrypt(template, shift);
  const dictionary = createDictionary(encodedTemplate, true);
  return text => map(text, dictionary);
}

function getDecodeFn(shift) {
  const encodedTemplate = encrypt(template, shift);
  const dictionary = createDictionary(encodedTemplate, false);
  return text => map(text, dictionary);
}

module.exports.CaesarCipher = {
  getEncodeFn,
  getDecodeFn
};

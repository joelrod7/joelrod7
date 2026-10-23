function decipher(ciphertext, needle) {
  const shiftChar = (char, shift) => {
    const code = char.charCodeAt(0);

    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
    }

    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
    }

    return char;
  };

  const decrypt = (text, shift) =>
    text
      .split('')
      .map((char) => shiftChar(char, shift))
      .join('');

  const containsWord = (text, word) => {
    const tokens = text.split(/\s+/);

    return tokens.some((token) => {
      const cleaned = token.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');
      return cleaned === word;
    });
  };

  for (let shift = 0; shift < 26; shift++) {
    const plaintext = decrypt(ciphertext, shift);

    if (containsWord(plaintext, needle)) {
      return plaintext;
    }
  }

  return 'Invalid';
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let ciphertext = '';
let knownWord = '';

rl.question('', (ciphertextInput) => {
  ciphertext = ciphertextInput;

  rl.question('', (knownWordInput) => {
    knownWord = knownWordInput;

    const plaintext = decipher(ciphertext, knownWord);
    console.log(plaintext);

    rl.close();
  });
});

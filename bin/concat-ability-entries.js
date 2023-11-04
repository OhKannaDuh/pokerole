const fs = require('fs');
const https = require('https');

const directory = __dirname + '/../Pokerole-Data/Version20/Abilities/';

let output = {};

fs.readdirSync(directory).forEach((file) => {
  const path = directory + file;
  const data = require(path);
  if (data.Number === 0) {
    return;
  }

  output[data.Name] = data;
});

fs.writeFile(__dirname + '/../src/data/abilities.json', JSON.stringify(output, null, 4), 'utf8', (err) => {
  if (err) {
    console.error(err);
  }
});

const fs = require('fs');

const directory = __dirname + '/../Pokerole-Data/Version20/Pokedex/';

let output = [];
let entries = {};

fs.readdirSync(directory).forEach((file) => {
  const path = directory + file;
  const data = require(path);
  if (data.Number === 0) {
    return;
  }

  output.push(data);
});

output.sort((a, b) => {
  const aId = parseInt(a.DexID);
  const bId = parseInt(b.DexID);

  if (aId < bId) {
    return -1;
  }

  if (aId > bId) {
    return 1;
  }

  if (a.DexID.includes('A')) {
    return 1;
  }

  if (b.DexID.includes('A')) {
    return -1;
  }

  if (a.DexID.includes('G')) {
    return 1;
  }

  if (b.DexID.includes('G')) {
    return -1;
  }

  if (a.DexID.includes('M1') || b.DexID.includes('M1')) {
    if (a.DexID.includes('M2')) {
      return 1;
    }

    if (b.DexID.includes('M2')) {
      return -1;
    }
  }

  if (a.DexID.includes('M1')) {
    return 1;
  }

  if (b.DexID.includes('M1')) {
    return -1;
  }

  if (a.DexID.includes('M2')) {
    return 1;
  }

  if (b.DexID.includes('M2')) {
    return -1;
  }

  return 0;
});

fs.writeFile(__dirname + '/../src/data/pokedex.json', JSON.stringify(output, null, 4), 'utf8', (err) => {
  if (err) {
    console.error(err);
  }
});

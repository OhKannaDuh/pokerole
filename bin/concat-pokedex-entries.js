const fs = require('fs');
const https = require('https');

const directory = __dirname + '/../Pokerole-Data/Version20/Pokedex/';

let output = {};

let base = 'https://raw.githubusercontent.com/Willowlark/Pokerole-Data/master/images/HomeSprites/';

fs.readdirSync(directory).forEach((file) => {
  const path = directory + file;
  const data = require(path);
  if (data.Number === 0) {
    return;
  }

  output[data.Number] = data;

  const save = 'src/assets/images/' + data.Image;
  let uri = base + data.Imnage;

  let stream = fs.createWriteStream(save);

  https
    .get(uri, (response) => {
      response.pipe(stream);

      stream.on('finish', () => {
        stream.close();
        console.log(`Image downloaded as ${save}`);
      });
    })
    .on('error', (err) => {
      fs.unlink(save);
      console.error(`Error downloading image: ${err.message}`);
    });
});

fs.writeFile(__dirname + '/../src/data/pokedex.json', JSON.stringify(output, null, 4), 'utf8', (err) => {
  if (err) {
    console.error(err);
  }
});

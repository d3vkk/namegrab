const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://namegrab.netlify.app/name');
  next();
});

app.get('/', (req, res) => {
  res.redirect('https://namegrab.netlify.app');
})

app.get('/name', (req, res) => {
  fetch("https://www.thisworddoesnotexist.com/", {
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US;q=1.0,en;q=0.7",
        "cache-control": "max-age=0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrerPolicy: "no-referrer-when-downgrade",
      body: null,
      method: "GET",
      mode: "cors",
    })
    .then((data) => data.text())
    .then((data) => {
      let name = data.match(/<div id="definition-word".*?>(.*?)<\/div>/)[1];
      let syllables = data.match(
        /<div id="definition-syllables".*?>(.*?)<\/div>/gs
      )[0];
      console.log(name, syllables);
      res.json(JSON.stringify({
        name: name,
        syllables: syllables
      }));
    })
    .catch((err) => {
      console.log(err);
    });
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on 127.0.0.1:${port}`));

import cors from 'cors';
import request from 'request'
import fetch from "node-fetch";
import express from 'express';
var app     = express()
import shortid from 'shortid';
import { characters } from "./topics/characters.js";
import { creatures } from "./topics/creatures.js"
import { science } from './topics/science.js';
fetch(request, {mode: 'cors'});

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.static("build"))

app.locals.title = 'Debatable Backend';

app.locals.topics = [
  ...characters,
  ...creatures,
  ...science,
  {
    name: "Ghostbusters",
    image: "",
    tags: ["movie"]
  },
  {
    name: "The Simpsons",
    image: "",
    tags: ["tv"]
  },
  {
    name: "Earthquakes",
    image: "",
    tags: ["disaster"]
  },
  {
    name: "Genghis Khan",
    image: "",
    tags: ["historical"]
  },
  {
    name: "Kanye West",
    image: "",
    tags: ["celebrity"]
  },
  {
    name: "Donald Trump",
    image: "",
    tags: ["politics"]
  }
]

app.get('/', (request, response) => {
  response.send('Oh hey Debatable');
});

app.get('/api/v1/topics', (request, response) => {
  const topics = app.locals.topics;
    if(!topics) {
      return response.sendStatus(404)
    }

  response.json({ topics });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
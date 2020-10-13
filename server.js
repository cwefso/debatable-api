import cors from 'cors';
import request from 'request'
import fetch from "node-fetch";
import express from 'express';
var app     = express()
import shuffle from 'shuffle-array';
import { characters } from "./topics/characters.js";
import { creatures } from "./topics/creatures.js"
import { science } from './topics/science.js';
import { movies } from './topics/movies.js';
import { tv } from './topics/tv.js';
import { historical } from './topics/historical.js';
import { disaster } from './topics/disaster.js';
import { celebrity } from './topics/celebrity.js';
import { politics } from './topics/politics.js';
import { places } from './topics/places.js';

fetch(request, {mode: 'cors'});

app.set('port', process.env.PORT || 8000);
app.use(cors());
app.use(express.static("build"))

app.locals.title = 'Debatable Backend';

app.locals.topics = [
  characters[0],
  creatures[0],
  science[0],
  movies[0],
  tv[0],
  historical[0],
  disaster[0],
  celebrity[0],
  politics[0],
  places[0]
]

app.get('/', (request, response) => {
  response.send('Oh hey Debatable');
});

app.get('/api/v1/all-topics', (request, response) => {
  const topics = app.locals.topics

    if(!topics) {
      return response.sendStatus(404)
    }

  response.json({ topics });
});

app.get('/api/v1/topics', (request, response) => {
  const topic1 = shuffle.pick(app.locals.topics);
  const topic2 = shuffle.pick(app.locals.topics.filter(topic => topic1.name !== topic.name));

  const topics = [
    topic1,
    topic2
  ]

    if(!topics) {
      return response.sendStatus(404)
    }

  response.json({ topics });
});

app.get('/api/v1/topic', (request, response) => {
  const topic1 = shuffle.pick(app.locals.topics);
  app.locals.topics = app.locals.topics.filter(topic => topic1.name !== topic.name);

  const topic = topic1

    if(!topic) {
      return response.sendStatus(404)
    }

  response.json({ topic });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
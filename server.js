import cors from "cors";
import request from "request";
import fetch from "node-fetch";
import express from "express";
var app = express();
import shuffle from "shuffle-array";
import { characters } from "./topics/characters.js";
import { creatures } from "./topics/creatures.js";
import { science } from "./topics/science.js";
import { movies } from "./topics/movies.js";
import { tv } from "./topics/tv.js";
import { historical } from "./topics/historical.js";
import { disaster } from "./topics/disaster.js";
import { celebrity } from "./topics/celebrity.js";
import { politics } from "./topics/politics.js";
import { places } from "./topics/places.js";

fetch(request, { mode: "cors" });

app.use(express.json());
app.set("port", process.env.PORT || 8000);
app.use(cors());

app.use(express.static("build"));

app.locals.title = "Debatable Backend";

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
	places[0],
];

app.locals.players = [];

app.locals.lobby = [];

app.get("/", (request, response) => {
	response.send("Debatable Backend");
});

app.get("/api/v1/all-topics", (request, response) => {
	const topics = app.locals.topics;
	if (!topics) {
		return response.sendStatus(404);
	}
	response.json({ topics });
});

app.get("/api/v1/topic", (request, response) => {
	const topic1 = shuffle.pick(app.locals.topics);
	// app.locals.topics = app.locals.topics.filter(
	// 	(topic) => topic1.name !== topic.name
	// );

	if (app.locals.players.length === 2) {
		app.locals.players.shift();
	}

	app.locals.players.push(topic1);

	const topic = topic1;

	if (!topic) {
		return response.sendStatus(404);
	}

	response.json({ topic });
});

app.get("/api/v1/players", (request, response) => {
	const players = app.locals.players;

	if (!players) {
		return response.sendStatus(404);
	}

	response.json({ players });
});

// app.delete("/api/v1/favorites/:contentId", (request, response) => {
// 	const { contentId } = request.params;
// 	const parsedId = parseInt(contentId);
// 	const match = app.locals.favorites.find(
// 		(painting) => parseInt(painting.contentId) === parsedId
// 	);

// 	if (!match) {
// 		return response
// 			.status(404)
// 			.json({ error: `No painting found with an id of ${contentId}.` });
// 	}

// 	const updatedPaintings = app.locals.favorites.filter(
// 		(painting) => parseInt(painting.contentId) !== parsedId
// 	);

// 	app.locals.favorites = updatedPaintings;

// 	return response.status(202).json(app.locals.favorites);
// });

app.get("/api/v1/lobby", (request, response) => {
	const lobby = app.locals.lobby;

	if (!lobby) {
		return response.sendStatus(404);
	}

	response.json({ lobby });
});

app.post('/api/v1/lobby', (request, response) => {
  const user = request.body;
	const { name, id } = user;
	const lobby = app.locals.lobby;

	let otherPlayers = lobby.filter(player => player.id !== id)
	app.locals.lobby = otherPlayers

  app.locals.lobby.push({ name, id });
  response.status(201).json(app.locals.lobby);
});

app.listen(app.get("port"), () => {
	console.log(
		`${app.locals.title} is running on http://localhost:${app.get("port")}.`
	);
});

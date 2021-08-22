require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(express.static("build")); // serves up static routes from /build
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("body", (req) => {
  if (req.method === "POST") {
    return ` ${JSON.stringify(req.body)}`;
  } else {
    return "";
  }
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const generateId = () => {
  const maxId =
    phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/", (req, res) => {
  console.log("testing");
  res.send("<h1>Phonebook</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => res.json(person));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((person) => {
      res.status(204).end();
    })
    .catch(next);
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "content missing" });
  }

  const person = new Person(req.body);

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => res.json(savedAndFormattedPerson))
    .catch(next);
});

app.get("/info", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      const len = persons.length;
      const date = new Date();
      res.send(`Phonebook has info for ${len} people<br>${date}`);
    })
    .catch(next);
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  // adds validation to update queries and sets the `this` w/ context based on query
  // new - returns the updated user w/ the updated values
  const opts = { new: true, runValidators: true, context: "query" };
  Person.findByIdAndUpdate(req.params.id, body, opts)
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch(next);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error("message:", error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    // handles all validation errors (eg. missing required fields)
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001; // allows heroku to set the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
// app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build")); //

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
  res.send("<h1>Phonebook</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

app.get("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const person = phonebook.find((contact) => contact.id === id);
  if (person) {
    res.json(person);
  } else {
    return res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filteredPersons = phonebook.filter((contact) => contact.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  if (
    phonebook.find(
      (person) => person.name.toLowerCase() === body.name.toLowerCase()
    )
  ) {
    return res.status(422).json({
      error: "name must be unique",
    });
  }
  const person = {
    id: generateId(),
    date: new Date(),
    name: body.name,
    number: body.number,
  };

  phonebook = phonebook.concat(person);

  res.json(person);
});

app.get("/info", (req, res) => {
  const len = phonebook.length;
  var date = new Date();
  res.send(`Phonebook has info for ${len} people<br>${date}`);
});

const PORT = process.env.PORT || 3001; // allows heroku to set the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import React, { useEffect, useState } from "react";
import personService from "./services/persons";

const Filter = ({ handleSearch }) => {
  return (
    <>
      filter shown with <input type='search' onChange={handleSearch} />
    </>
  );
};

const PersonForm = ({
  handleSubmit,
  newName,
  handleNameChange,
  newPhone,
  handlePhoneChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>add a new</h2>
      <div>
        name:{" "}
        <input
          type='text'
          name='name'
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        phone:{" "}
        <input
          type='tel'
          name='number'
          value={newPhone}
          onChange={handlePhoneChange}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

const Persons = ({ filter, persons, filterPerson, handleDelete }) => {
  const renderPerson = (person) => (
    <>
      <p key={person.name + person.id}>
        {person.name} {person.number}
      </p>
      <span>
        <button onClick={() => handleDelete(person.id)}>Delete</button>
      </span>
    </>
  );
  const filteredPersons = [...persons?.filter(filterPerson)].map(renderPerson);
  return filteredPersons?.length
    ? filteredPersons
    : filter
    ? "No Results"
    : "Loading...";
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handleSearch = (e) => setFilter(e?.target?.value.toLowerCase());

  const checkPerson = (person) => person?.name?.toLowerCase().includes(filter);

  useEffect(() => {
    personService.getAll().then((response) => {
      console.log("promise fulfilled", response);
      setPersons(response);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist();

    const exists = persons?.find(
      (person) => person?.name?.toLowerCase() === newName?.toLowerCase()
    );

    const inputs = [...e?.target?.querySelectorAll("input")].reduce(
      (obj, item) => ({ ...obj, [item?.name]: item?.value.trim() }), // trim whitespace
      {}
    );

    if (exists) {
      if (
        window.confirm(
          `${exists?.name} already exists, would you like to update the phone number?`
        )
      ) {
        personService.update(exists?.id, inputs).then((response) => {
          const newPersons = persons.filter(
            (person) => person?.id !== exists?.id
          );
          setPersons([...newPersons, response]);
        });
      }
    }

    personService
      .create(inputs)
      .then((response) => setPersons((prevState) => [...prevState, response]));

    setNewName("");
    setNewPhone("");
  };

  const handleDelete = (id) => {
    const personToRemove = persons.find((p) => p?.id === id);
    if (
      window.confirm(`Are you sure you want to delete ${personToRemove.name}?`)
    ) {
      personService
        .remove(id)
        .then((response) =>
          setPersons(persons.filter((person) => person?.id !== id))
        );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterPerson={checkPerson}
        handleDelete={handleDelete}
        filter={filter}
      />
    </div>
  );
};

export default App;

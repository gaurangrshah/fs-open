import React, { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

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
          const newPersons = persons.map((person) => {
            if (person?.id === exists?.id) {
              person = response;
            }
            return person;
          });
          setPersons(newPersons);
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

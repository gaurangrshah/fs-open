import React, { useEffect, useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handleSearch = (e) => setFilter(e?.target?.value.toLowerCase());

  const checkPerson = (person) => person?.name?.toLowerCase().includes(filter);

  function displayNotification(message) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response);
        displayNotification(`success: all persons have been loaded`);
      })
      .catch((error) => {
        displayNotification(
          `error: persons could not be loaded ${error && JSON.stringify(error)}`
        );
      });
  }, []);

  useEffect(() => {
    displayNotification(`success: testing`);
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
        personService
          .update(exists?.id, inputs)
          .then((response) => {
            const newPersons = persons.filter((person) => {
              return person?.id !== exists?.id;
            });
            setPersons([...newPersons, response]);
            displayNotification(`success: updated record for ${exists.name}`);
          })
          .catch((error) => {
            console.error(error);
            displayNotification(
              `error: person ${exists.name} could not be updated ${
                error && JSON.stringify(error)
              }`
            );
          });
      }
      return;
    }

    personService
      .create(inputs)
      .then((response) => {
        setPersons(persons.concat(response));
        displayNotification(`success: ${response.name} created`);
      })
      .catch((error) => {
        displayNotification(
          `error: person ${inputs.name} could not be created ${
            error && JSON.stringify(error)
          }`
        );
      });

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
        .then((response) => {
          setPersons(persons.filter((person) => person?.id !== id));
          displayNotification(`success: person with id: ${id} deleted`);
        })
        .catch((error) => {
          displayNotification(
            `error: person ${personToRemove.name} could not be deleted ${
              error && JSON.stringify(error)
            }`
          );
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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

import React, { useEffect, useState } from 'react'
import axios from "axios"

const Filter = ({ handleSearch }) => {

  return (
    <>
      filter shown with <input type="search" onChange={handleSearch} />
    </>
  )
}

const PersonForm = ({ handleSubmit, newName, handleNameChange, newPhone, handlePhoneChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>add a new</h2>
      <div>
        name: <input type="text" name="name" value={newName} onChange={handleNameChange} />
      </div>
      <div>
        phone: <input type="tel" name="number" value={newPhone} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filterPerson }) => {
  const renderPerson = (person) => <p key={person.name}>{person.name} {person.number}</p>
  const filteredPersons = [...persons?.filter(filterPerson)].map(renderPerson)
  return filteredPersons?.length ? filteredPersons : "Loading..."
}


const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [query, setQuery] = useState('')


  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handleSearch = (e) => setQuery(e?.target?.value.toLowerCase())

  const checkPerson = (person) => person?.name?.toLowerCase().includes(query)

  useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled', response)
      setPersons(response.data)
    })
}, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist();


    const exists = persons?.find(person => person?.name?.toLowerCase() === newName?.toLowerCase());

    if (exists) {
      return alert(`The entry ${newName} already exists in the phonebook.`);
    }

    const inputs = [...e?.target?.querySelectorAll('input')].reduce(
      (obj, item) => ({ ...obj, [item?.name]: item?.value.trim() }), // trim whitespace
      {}
    )

    setPersons(prevState => [...prevState, inputs]);
    setNewName('');
    setNewPhone('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />
      <PersonForm handleSubmit={handleSubmit} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterPerson={checkPerson}/>
    </div>
  )
}

export default App

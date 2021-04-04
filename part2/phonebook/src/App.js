import React, { useEffect, useState } from 'react'


const Filter = ({ filterPersons }) => {
  return (
    <>
      filter shown with <input type="search" onChange={filterPersons} />
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

const Persons = ({ persons, filteredPersons }) => {
  return filteredPersons?.length && filteredPersons?.map(person => <p key={person.name}>{person.name} {person.number}</p>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    if(JSON.stringify(persons) === JSON.stringify(filterPersons)) return
    setFilteredPersons(persons)
  }, [persons])

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist();


    const exists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    if (exists) {
      return alert(`The entry ${newName} already exists in the phonebook.`);
    }
    const inputs = [...e.target.querySelectorAll('input')].reduce(
      (obj, item) => ({ ...obj, [item.name]: item.value.trim() }), // trim whitespace
      {}
    )

    setPersons(prevState => [...prevState, inputs]);
    setNewName('');
    setNewPhone('');
  };

  const filterPersons = (e) => {
    e.preventDefault()
    e.persist()
    const filtered = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()))
    return setFilteredPersons(filtered)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPersons={filterPersons} />
      <PersonForm handleSubmit={handleSubmit} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
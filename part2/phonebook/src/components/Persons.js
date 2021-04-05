import Person from "./Person";

const Persons = ({ filter, persons, filterPerson, handleDelete }) => {
  const filteredPersons = [...persons?.filter(filterPerson)].map((person) => (
    <Person key={person?.id} person={person} handleDelete={handleDelete} />
  ));
  return filteredPersons?.length
    ? filteredPersons
    : filter
    ? "No Results"
    : "Loading...";
};

export default Persons;

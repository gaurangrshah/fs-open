const Person = ({ person, handleDelete }) => {
  return (
    <>
      <p key={person.name + person.id}>
        {person.name} {person.number}
      </p>
      <span>
        <button onClick={() => handleDelete(person.id)}>Delete</button>
      </span>
    </>
  );
};

export default Person;

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
          required
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;

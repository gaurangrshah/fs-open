const types = {
  error: {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  },
  success: {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  },
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const status = message.includes("error") ? "error" : "success";
  console.log(message);
  return (
    <div className='error' style={types[status]}>
      {message}
    </div>
  );
};

export default Notification;

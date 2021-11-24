import { useRef } from "react";

const QueueForm = ({ onSubmit }) => {
  const usernameInput = useRef();

  function onFormSubmitted(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    onSubmit(data.get("username"));
    usernameInput.current.value = "";
  }

  return (
    <form onSubmit={onFormSubmitted}>
      <label htmlFor="username">Ton nom</label>
      <input
        ref={(element) => (usernameInput.current = element)}
        id="username"
        name="username"
      />
      <button type="submit">OK</button>
    </form>
  );
};

export default QueueForm;

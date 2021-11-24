import { useRef } from "react";

const QueueForm = ({ className, onSubmit }) => {
  const usernameInput = useRef();

  function onFormSubmitted(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    onSubmit(data.get("username"));
    usernameInput.current.value = "";
  }

  return (
    <form className={className} onSubmit={onFormSubmitted}>
      <label className="sr-only" htmlFor="username">Ton nom</label>

      <input
        className="p-4 w-full sm:w-auto text-2xl rounded-full text-gray-600 bg-white bg-opacity-40"
        placeholder="Saisie ton nom"
        ref={(element) => (usernameInput.current = element)}
        id="username"
        name="username"
      />

      <button className="mt-4 ml-0 sm:mt-0 block w-full sm:w-auto sm:inline sm:ml-4 p-4 bg-white text-red-400 rounded-full hover:bg-red-300 hover:text-white transition duration-300 ease-out transform hover:scale-110" type="submit">OK</button>
    </form>
  );
};

export default QueueForm;

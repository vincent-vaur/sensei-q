import { useRef } from "react";

const QueueForm = ({ className = "", onSubmit }) => {
  const usernameInput = useRef();

  function onFormSubmitted(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    onSubmit(data.get("username"));
    usernameInput.current.value = "";
  }

  return (
    <form onSubmit={onFormSubmitted} className={className}>
      <label className="sr-only" htmlFor="username">
        Ton nom
      </label>

      <input
        className="p-4 w-full sm:w-auto text-2xl rounded-full text-gray-600 bg-white bg-opacity-40"
        placeholder="Saisie ton nom"
        ref={(element) => (usernameInput.current = element)}
        placeholder="Nom + Entré pour valider"
        id="username"
        name="username"
      />

      <button className="btn mt-8 w-full sm:hidden" type="submit">
        Réserver
      </button>
    </form>
  );
};

export default QueueForm;

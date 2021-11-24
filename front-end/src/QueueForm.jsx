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

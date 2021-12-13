import { useEffect, useState, useRef } from "react";
import axios from "axios";

import QueueForm from "./components/QueueForm";

import "./App.css";

// On dit à Axios d'envoyer les cookies pour
// toutes les requêtes que l'on fera
axios.defaults.withCredentials = true;

function App() {
  const [queue, setQueue] = useState([]);
  const [user, setUser] = useState();
  const emailField = useRef();

  async function login() {
    const email = emailField.current.value;

    try {
      setUser(
        (
          await axios.post("http://localhost:3001/users/login", {
            email,
          })
        ).data
      );
    } catch (e) {
      setUser();
    }
  }

  async function logout() {
    await axios("http://localhost:3001/users/logout");
  }

  async function fetchQueue() {
    try {
      setQueue((await axios("http://localhost:3001/queue")).data);
    } catch (e) {
      if (e.response.status === 401) {
        setUser();
      }
    }
  }

  async function addToQueue(name) {
    try {
      await axios.post("http://localhost:3001/queue", { name });
      fetchQueue();
    } catch (e) {
      console.log(e);
      alert("Une erreur s'est produite");
    }
  }

  async function removeFromQueue(id) {
    try {
      await axios.delete(`http://localhost:3001/queue/${id}`);
      fetchQueue();
    } catch (e) {
      console.log(e);
      alert("Une erreur s'est produite");
    }
  }

  useEffect(() => {
    fetchQueue();

    const timeout = setInterval(() => fetchQueue(), 5000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  return (
    <div className="p-6 container mx-auto max-w-4xl text-center">
      <h1>Sensei Q</h1>

      {user ? (
        <>
          <h2>Salut {user.username} !</h2>
          <button onClick={logout}>LOGOUT</button>

          <QueueForm className="my-16" onSubmit={addToQueue} />

          <div className="flex flex-col items-center">
            {queue.map((q) => (
              <a
                href="#"
                key={q.id}
                className="p-8 my-4 w-1/2 rounded-full w-full bg-secondary bg-opacity-20 hover:bg-opacity-40 text-2xl md:text-4xl font-bold uppercase transition duration-300 ease-out hover:scale-110 cursor:pointer"
                onClick={() => removeFromQueue(q.id)}
              >
                {q.name}
              </a>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-8">Vous n'êtes pas connecté :(</h2>

          <input type="email" ref={(el) => (emailField.current = el)} />

          <button onClick={login}>LOGIN</button>
        </>
      )}
    </div>
  );
}

export default App;

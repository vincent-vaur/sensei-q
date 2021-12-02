import { useEffect, useState } from "react";
import axios from "axios";

import QueueForm from "./QueueForm";

import "./App.css";

function App() {
  const [queue, setQueue] = useState([]);

  async function fetchQueue() {
    setQueue((await axios("http://localhost:3001/queue")).data);
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

    const interval = setInterval(fetchQueue, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="p-6 container mx-auto max-w-4xl text-center">
      <h1>Sensei Q</h1>

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
    </div>
  );
}

export default App;

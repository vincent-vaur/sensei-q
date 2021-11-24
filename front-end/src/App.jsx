import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";

import { addToQueue } from "./Api";

import QueueForm from "./QueueForm";
import "./App.css";

function App() {
  const [queue, setQueue] = useState([]);

  const queueMutation = useMutation((name) => addToQueue(name));

  async function fetchQueue() {
    const res = await fetch("http://localhost:3001/queue");
    setQueue(await res.json());
  }

  async function removeFromQueue(id) {
    try {
      await fetch(`http://localhost:3001/queue/${id}`, { method: "delete" });
      fetchQueue();
    } catch (e) {
      console.log(e);
      alert("Une erreur s'est produite");
    }
  }

  useEffect(() => {
    fetchQueue();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchQueue, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="p-6 container mx-auto max-w-4xl text-center">
      <h1>Sensei Q</h1>

      <QueueForm className="my-16" onSubmit={queueMutation.mutate} />

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

import { useState, useEffect } from "react";

import QueueForm from "./QueueForm";
import "./App.css";

function App() {
  const [queue, setQueue] = useState([]);

  async function fetchQueue() {
    const res = await fetch("http://localhost:3001/queue");
    setQueue(await res.json());
  }

  async function addToQueue(name) {
    try {
      await fetch("http://localhost:3001/queue", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      fetchQueue();
    } catch (e) {
      console.log(e);
      alert("Une erreur s'est produite");
    }
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
    const interval = setInterval(fetchQueue, 5000)

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className="container mx-auto">
      <h1>Sensei Q</h1>

      <QueueForm onSubmit={addToQueue} />

      {queue.map((q) => (
        <div key={q.id}>
          <span>
            {q.id} : {q.name}
          </span>

          <button
            title={`Supprimer ${q.name}`}
            onClick={() => removeFromQueue(q.id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;

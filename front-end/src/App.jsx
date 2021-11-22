import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [queue, setQueue] = useState([]);

  async function fetchQueue() {
    const res = await fetch("http://localhost:3001/queue");
    setQueue(await res.json());
  }

  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <div className="App">
      <h1>Sensei Q</h1>

      {queue.map((q) => (
        <p key={q.id}>
          {q.id} : {q.name}
        </p>
      ))}
    </div>
  );
}

export default App;

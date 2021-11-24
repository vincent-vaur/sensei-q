import { useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

import QueueForm from "./QueueForm";
import "./App.css";

function App() {
  const { isLoading, data, refetch } = useQuery(
    "queue",
    async () => (await axios("http://localhost:3001/queue")).data
  );

  const addToQueue = useMutation(async (name) => {
    await axios.post("http://localhost:3001/queue", { name });
    await refetch();
  });

  const removeFromQueue = useMutation(async (id) => {
    await axios.delete(`http://localhost:3001/queue/${id}`);
    await refetch();
  });

  useEffect(() => {
    const interval = setInterval(refetch, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-red-400 via-red-400 to-red-300 text-white min-h-screen text-center">
      <div className="container p-4 max-w-2xl mx-auto">
        <h1 className="text-6xl">Sensei Q</h1>

        <QueueForm className="my-12" onSubmit={(name) => addToQueue.mutate(name)} />

        {isLoading ? (
          <p>Chargement en cours ...</p>
        ) : (
          data.map((q) => (
            <div
              className="my-4 flex items-center bg-white bg-opacity-30 rounded-full"
              key={q.id}
            >
              <span className="py-4 text-2xl sm:text-3xl uppercase font-bold flex-grow">
                {q.name}
              </span>

              <button
                className="ml-4 bg-white text-red-400 w-20 h-20 rounded-full hover:bg-red-300 hover:text-white transition duration-300 ease-out transform hover:scale-110"
                title={`Supprimer ${q.name}`}
                onClick={() => removeFromQueue.mutate(q.id)}
              >
                x
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

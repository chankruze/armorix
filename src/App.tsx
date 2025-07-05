import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

const App = () => {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  const greet = async () => {
    if (name.trim()) {
      // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
      setGreetMsg(await invoke("greet", { name }));
    } else {
      setGreetMsg("");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center space-y-3 bg-red-300 p-4 h-screen">
      <input
        type="text"
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Enter a name..."
      />
      <button className="p-3 bg-green-600 text-white" onClick={greet}>
        Test Button
      </button>
      <p>{greetMsg}</p>
    </main>
  );
};

export default App;

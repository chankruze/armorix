import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/core";
import ConnectionMode from "./ConnectionMode";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [isConnectionModeModalOpen, setIsConnectionModeModalOpen] =
    useState(false);
  const [progress, setProgress] = useState(0);

  const openConnectionModeModal = () => setIsConnectionModeModalOpen(true);

  useEffect(() => {
    invoke<string | null>("get_db_mode").then((mode) => {
      console.log("get_db_mode response:", mode);

      if (mode) {
        simulateLoading();
      } else {
        openConnectionModeModal();
      }
    });

    const _listener = listen<string>("db_mode_set_success", (event) => {
      console.log("DB mode set successfully:", event.payload);
      simulateLoading();
    });

    return () => {
      _listener.then((f) => f());
    };
  }, []);

  const simulateLoading = () => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 10) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        navigate("/dashboard");
      }
      setProgress(current);
    }, 350);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-green-400 relative overflow-hidden px-4">
      <div className="absolute w-64 h-64 rounded-full border-4 border-green-400 animate-ping opacity-30"></div>
      <div className="absolute w-48 h-48 rounded-full border-2 border-green-400 animate-ping opacity-50"></div>
      <h1 className="mt-8 text-3xl font-bold tracking-widest uppercase animate-pulse">
        Initializing System
      </h1>
      <p className="mt-2 text-green-500 text-sm tracking-wider">
        Loading inventory... {progress}%
      </p>
      <div className="w-full max-w-md mt-4 bg-green-800 rounded-full h-3 overflow-hidden">
        <div
          className="bg-green-400 h-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <ConnectionMode
        open={isConnectionModeModalOpen}
        onOpenChange={setIsConnectionModeModalOpen}
      />
    </div>
  );
}

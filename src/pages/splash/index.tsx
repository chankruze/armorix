import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/core";
import ConnectionMode from "./ConnectionMode";
import BlockedProgressIndicator from "./BlockedProgressIndicator";
import routes from "@/routes";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [isConnectionModeModalOpen, setIsConnectionModeModalOpen] =
    useState(false);
  const [progress, setProgress] = useState(0);

  const openConnectionModeModal = () => setIsConnectionModeModalOpen(true);

  useEffect(() => {
    let loadingIntervalId: NodeJS.Timeout;

    invoke<string | null>("get_db_mode").then((mode) => {
      console.log("get_db_mode response:", mode);

      if (mode) {
        loadingIntervalId = simulateLoading();
      } else {
        openConnectionModeModal();
      }
    });

    const _listener = listen<string>("db_mode_set_success", (event) => {
      console.log("DB mode set successfully:", event.payload);
      loadingIntervalId = simulateLoading();
    });

    return () => {
      _listener.then((f) => f());
      clearInterval(loadingIntervalId);
    };
  }, []);

  const simulateLoading = () => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 10) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setProgress(current);
    }, 250);

    return interval;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-green-400 relative overflow-hidden px-4">
      <div className="absolute w-64 h-64 rounded-full border-4 border-green-400 animate-ping opacity-30"></div>
      <div className="absolute w-48 h-48 rounded-full border-2 border-green-400 animate-ping opacity-50"></div>
      <h1 className="mt-8 text-3xl font-bold tracking-widest uppercase animate-pulse">
        Initializing System
      </h1>
      <div className="absolute bottom-0 right-0 p-[5vw]">
        <BlockedProgressIndicator
          progress={progress}
          onComplete={() => navigate(routes.admin.dashboard)}
        />
      </div>
      <ConnectionMode
        open={isConnectionModeModalOpen}
        onOpenChange={setIsConnectionModeModalOpen}
      />
    </div>
  );
}

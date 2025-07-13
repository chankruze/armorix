import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import bgImage from "@/assets/camouflage.webp";

interface ErrorPageProps {
  homeUrl?: string;
  status?: number;
}

const statusMessages: Record<number, string> = {
  403: "Access Denied: Unauthorized territory.",
  404: "Target not found: The page you’re looking for doesn’t exist.",
  500: "System malfunction: Something went wrong on our end.",
};

const ErrorPage: React.FC<ErrorPageProps> = ({
  homeUrl = "/",
  status = 404,
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(homeUrl);
  };

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center bg-black"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.95,
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative z-10 max-w-md text-stone-300">
        <h1
          className="text-8xl font-extrabold glitch animate-flicker"
          data-text={status}
        >
          {status}
        </h1>
        <p className="mt-4 text-lg font-mono tracking-wide text-stone-400">
          {statusMessages[status] || "Mission failed. Something went wrong."}
        </p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button variant="secondary" onClick={handleGoHome}>
            Return to HQ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  homeUrl: string;
  status?: number;
}

const statusMessages: Record<number, string> = {
  403: "Forbidden: You don’t have permission to access this page.",
  404: "Page not found: The page you’re looking for doesn’t exist.",
  500: "Server error: Something went wrong on our end.",
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 text-center">
      <h1 className="text-6xl font-bold text-gray-800">{status}</h1>
      <p className="mt-4 text-lg text-gray-600">
        {statusMessages[status] || "Something went wrong."}
      </p>
      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button onClick={handleGoHome}>Back to Home</Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reload Page
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;

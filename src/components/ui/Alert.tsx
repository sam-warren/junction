import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface AlertProps {
  message: string;
  type: "success" | "error";
  onDismiss: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onDismiss }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setShow(true);
    });

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onDismiss, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed left-0 right-0 top-20 z-50 px-4 lg:top-24">
      <div className="mx-auto max-w-xl">
        <div
          className={`transform rounded-lg shadow-lg transition-all duration-300 ease-out ${show ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"} ${
            type === "success"
              ? "bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            {type === "success" ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" />
            ) : (
              <XCircle className="h-5 w-5 flex-shrink-0 text-red-500 dark:text-red-400" />
            )}
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;

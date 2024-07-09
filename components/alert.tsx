import { useState } from "react";

type AlertType = "info" | "danger" | "success" | "warning";

interface AlertProps {
  type: AlertType;
}

const alertClasses: Record<AlertType, string> = {
  info: "bg-blue-50 text-blue-800 dark:bg-gray-800 dark:text-blue-400",
  danger: "bg-red-50 text-red-800 dark:bg-gray-800 dark:text-red-400",
  success: "bg-green-50 text-green-800 dark:bg-gray-800 dark:text-green-400",
  warning: "bg-yellow-50 text-yellow-800 dark:bg-gray-800 dark:text-yellow-300",
};

export default function Alert({
  type,
  boldText,
  normalText,
}: {
  type: AlertType;
  boldText: string;
  normalText: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div
      className={`p-4 mb-4 text-sm rounded-lg flex items-center ${alertClasses[type]}`}
      role="alert"
    >
      <div>
        <span className="font-medium">{boldText}</span>
        <span className="ml-2">{normalText}</span>
      </div>

      <button
        type="button"
        className="flex-shrink-0 ml-auto inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={handleClose}
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Fermer</span>
      </button>
    </div>
  );
}

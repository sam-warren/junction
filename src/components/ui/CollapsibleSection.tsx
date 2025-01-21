import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultExpanded = false,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`w-full ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative flex w-full items-center rounded-lg bg-transparent py-2 text-left"
      >
        <ChevronRight
          className={`absolute left-0 h-6 w-6 transform text-gray-900 transition-transform duration-200 ease-in-out dark:text-white ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
        <h2 className="pl-9 text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </button>
      <div
        className={`w-full transform overflow-hidden transition-all duration-200 ease-in-out ${
          isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-full pt-4">{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleSection;

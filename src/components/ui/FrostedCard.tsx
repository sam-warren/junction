import { ReactNode, HTMLAttributes } from "react";

interface FrostedCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const FrostedCard: React.FC<FrostedCardProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white/20 p-6 backdrop-blur-[5px] dark:border-gray-800 dark:bg-gray-900/20 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default FrostedCard;

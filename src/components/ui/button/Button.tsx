import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md" | "ex" | "sv" | "bk"; // Button size
  variant?:
    | "primary"
    | "outline"
    | "outline_success"
    | "outline_warning"
    | "outline_danger"
    | "success"
    | "warning" // Button variant
    | "danger" // Button variant
    | "back";
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
  loading?: boolean; // Nuevo prop
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  loading = false, // Nuevo prop
}) => {
  // Size Classes
  const sizeClasses = {
    sv: "px-6 py-3.5 text-sm",
    ex: "px-6 py-3 text-sm",
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
    bk: "p-2 text-sm"
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
    outline_success:
      "bg-white text-green-700 ring-1 ring-inset ring-green-300 hover:bg-green-50 dark:bg-green-800 dark:text-green-400 dark:ring-green-700 dark:hover:bg-white/[0.03] dark:hover:text-green-300",
    outline_warning:
      "bg-white text-yellow-700 ring-1 ring-inset ring-yellow-300 hover:bg-yellow-50 dark:bg-yellow-800 dark:text-yellow-400 dark:ring-yellow-700 dark:hover:bg-white/[0.03] dark:hover:text-yellow-300",
    outline_danger:
      "bg-white text-red-700 ring-1 ring-inset ring-red-300 hover:bg-red-50 dark:bg-red-800 dark:text-red-400 dark:ring-red-700 dark:hover:bg-white/[0.03] dark:hover:text-red-300",

    success:
      "bg-green-500 text-white shadow-theme-xs hover:bg-green-600 disabled:bg-green-300",
    warning:
      "bg-yellow-500 text-white shadow-theme-xs hover:bg-yellow-600 disabled:bg-yellow-300",
    danger:
      "bg-red-500 text-white shadow-theme-xs hover:bg-red-600 disabled:bg-red-300",
    back:
      "bg-white text-gray-500 hover:shadow-theme-xs hover:bg-gray-100 disabled:bg-gray-200",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled || loading ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {/* {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>} */}
      {loading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin delay-75 h-5 w-5 mr-1 text-white"
            width="32px"
            height="32px"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 12.5C4.5 16.9183 8.08172 20.5 12.5 20.5C16.9183 20.5 20.5 16.9183 20.5 12.5C20.5 8.08172 16.9183 4.5 12.5 4.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <span className="flex gap-1">
            Cargando
            <span className="animate-pulse delay-75">.</span>
            <span className="animate-pulse delay-75">.</span>
            <span className="animate-pulse delay-75">.</span>
          </span>
        </span>
      ) : (
        <>
          {startIcon && <span className="flex items-center">{startIcon}</span>}
          {children}
          {endIcon && <span className="flex items-center">{endIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;

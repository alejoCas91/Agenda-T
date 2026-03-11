export default function Button({ children, onClick, variant = "primary" }) {
  const styles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

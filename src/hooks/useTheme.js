import useRole from "./useRole";

export default function useTheme() {
  const { role } = useRole();

  if (role === "client") {
    return {
      bg: "bg-red-50",
      sidebar: "bg-agenda-medium",
      accent: "text-agenda-medium",
    };
  }

  if (role === "boss") {
    return {
      bg: "bg-red-100",
      sidebar: "bg-agenda-dark",
      accent: "text-agenda-gold",
    };
  }

  if (role === "admin") {
    return {
      bg: "bg-red-200",
      sidebar: "bg-black",
      accent: "text-agenda-gold",
    };
  }

  return {
    bg: "bg-gray-100",
    sidebar: "bg-black",
    accent: "text-white",
  };
}

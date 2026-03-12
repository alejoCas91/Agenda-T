import AppRouter from "./app/router";
import { Toaster } from "sileo";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AppRouter />
    </>
  );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "@/components/Chat";
import Protected from "@/components/Protected";
import Login from "@/components/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Protected />}>
          <Route path="*" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

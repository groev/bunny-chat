import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Start from "./Start";
import SingleChat from "./SingleChat";

export default function Chat() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Start />} />
        <Route path=":id" element={<SingleChat />} />
      </Route>
    </Routes>
  );
}

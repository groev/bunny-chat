import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "@/util/auth";
import { Loader } from "@mantine/core";

export default function Protected() {
  const { data, isPending } = useSession();
  if (isPending) return <Loader />;
  if (!data) return <Navigate to="/login" />;
  return <Outlet />;
}

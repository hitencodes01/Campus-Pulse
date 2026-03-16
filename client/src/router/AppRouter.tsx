import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RoleProtectedRoute from "../components/RoleProtectedRoute";
import ProtectedLayout from "../layout/ProtectedLayout";
import Events from "../pages/Events";
import Fests from "../pages/Fests";
import Clubs from "../pages/Clubs";
import Admin from "../pages/admin/Admin";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/events", element: <Events /> },
      { path: "/fests", element: <Fests /> },
      { path: "/clubs", element: <Clubs /> },
    ],
  },
  {
    element: (
      <RoleProtectedRoute>
        <ProtectedLayout />
      </RoleProtectedRoute>
    ),
    children: [{ path: "/student-dashboard" },{path : "/admin" , element : <Admin/>}],
  },
]);

export default router;

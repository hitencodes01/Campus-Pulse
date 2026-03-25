import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Events from "../pages/Events";
import Fests from "../pages/Fests";
import Clubs from "../pages/Clubs";
import Admin from "../pages/admin/Admin";
import FestDetails from "../pages/FestDetails";
import Student from "../pages/student/Student";
import ClubHead from "../pages/clubhead/ClubHead";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentLayout from "../layout/StudentLayout";
import ClubHeadLayout from "../layout/ClubHeadLayout";
import AdminLayout from "../layout/AdminLayout";
import Unauthorize from "../pages/Unauthorize";
import Profile from "../pages/student/Profile";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/unauthorize", element: <Unauthorize /> },
      { path: "/events", element: <Events /> },
      { path: "/fests", element: <Fests /> },
      { path: "/clubs", element: <Clubs /> },
      { path: "/fests/:id", element: <FestDetails /> },
    ],
  },
  {
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <StudentLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/student", element: <Student /> },
      { path: "/student/profile", element: <Profile /> },
    ],
  },
  {
    element: (
      <ProtectedRoute allowedRoles={["clubhead"]}>
        <ClubHeadLayout />
      </ProtectedRoute>
    ),
    children: [{ path: "/clubhead", element: <ClubHead /> }],
  },
  {
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [{ path: "/admin", element: <Admin /> }],
  },
]);

export default router;

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import FeedPage from "../pages/FeedPage";
import FriendPage from "../pages/FriendPage";
import ProfilePage from "../pages/ProfilePage";

function Router() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/profile/:userId", element: <FriendPage /> },
    { path: "/feed", element: <FeedPage /> },
    { path: "*", element: <Navigate to="/" /> },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;

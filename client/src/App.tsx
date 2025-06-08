// App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserFiles from "./pages/UserFiles";
import UserFolders from "./pages/UserFolders";
import FolderContents from "./pages/FolderContents";
import DriveSyncSettings from "./components/Drive/DriveSyncSettings";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: '/files',
        element: (
          <ProtectedRoute>
            <UserFiles />
          </ProtectedRoute>
        )
      },
      {
        path: '/folders',
        element: (
          <ProtectedRoute>
            <UserFolders />
          </ProtectedRoute>
        )
      },
      {
        path: '/folders/:folderId',
        element: (
          <ProtectedRoute>
            <FolderContents />
          </ProtectedRoute>
        )
      },
      {
        path: '/settings/drive',
        element: (
          <ProtectedRoute>
            <DriveSyncSettings />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Error404Page from "./pages/Error404Page";
import AddService from "./pages/AddService";

const userRole = "Admin";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    element: (
      <ProtectedRoute
        element={Dashboard}
        allowedRoles={["Admin"]}
        userRole={userRole}
      />
    ),
  },

  // {
  //   path: "/service",
  //   name: "My Service",
  //   element: (
  //     <ProtectedRoute
  //       element={AddService}
  //       allowedRoles={["Admin"]}
  //       userRole={userRole}
  //     />
  //   ),
  // },

  {
    path: "/service/add",
    name: "Add Service",
    element: (
      <ProtectedRoute
        element={AddService}
        allowedRoles={["Admin"]}
        userRole={userRole}
      />
    ),
  },

  {
    path: "*",
    name: "Error 404",
    element: <Error404Page />,
  },
];

export default routes;

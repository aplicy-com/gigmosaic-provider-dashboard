import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Error404Page from "./pages/Error404Page";
import AllOffers from "./pages/offer/AllOffers";
import AddService from "./pages/service/AddService";
import AllService from "./pages/service/AllService";
import EditService from "./pages/service/EditService";

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
    path: "/service/all",
    name: "All Service",
    element: (
      <ProtectedRoute
        element={AllService}
        allowedRoles={["Admin"]}
        userRole={userRole}
      />
    ),
  },

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
    path: "/service/edit/:id",
    name: "Update Service",
    element: (
      <ProtectedRoute
        element={EditService}
        allowedRoles={["Admin"]}
        userRole={userRole}
      />
    ),
  },

  {
    path: "/offers/all",
    name: "All Offers",
    element: (
      <ProtectedRoute
        element={AllOffers}
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

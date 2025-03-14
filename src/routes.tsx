import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Error404Page from "./pages/Error404Page";
import AddService from "./pages/service/AddService";
import AllService from "./pages/service/AllService";
import EditService from "./pages/service/EditService";
import AllStaff from "./pages/staff/AllStaff";
import EditStaffModal from "./pages/staff/EditStaffModal";

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

  {
    path: "/service/all-service",
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
    path: "/service/add-service",
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
    path: "/staff/all-staff",
    name: "All Staff",
    element: (
      <ProtectedRoute
        element={AllStaff}
        allowedRoles={["Admin"]}
        userRole={userRole}
      />
    ),
  },

  // {
  //   path: "/edit-staff/:id",
  //   name: "Edit Staff",
  //   element: (
  //     <ProtectedRoute
  //       element={EditStaffModal} // <-- Add your component here
  //       allowedRoles={["Admin"]}
  //       userRole={userRole}
  //     />
  //   ),
  // },

  {
    path: "/service/edit-service/:id",
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
    path: "/offer/all-offer",
    name: "Offers",
    element: (
      <ProtectedRoute
        element={EditService}
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

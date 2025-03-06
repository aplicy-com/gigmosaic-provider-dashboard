import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes.tsx";

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
            <div className="w-10 h-10 animate-spin rounded-full border-4 border-t-primary"></div>
            <p className="mt-3 text-gray-600 text-sm font-medium">Loading...</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            {routes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

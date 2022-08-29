import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

const UserLogin = React.lazy(() =>
  import("./pages/UserAuthentication/UserLogin")
);
const Home = React.lazy(() => import("./pages/UserAuthentication/Home"));

function App() {
  return (
    <React.Fragment>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/*" element={<p>No page found</p>} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
}

export default App;

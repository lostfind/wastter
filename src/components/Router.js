import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
import EmailVerify from "routes/EmailVerify";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            {userObj.emailVerified ? (
              <Route exact path="/" element={<Home userObj={userObj} />} />
            ) : (
              <Route exact path="/" element={<EmailVerify />} />
            )}
            <Route
              exact
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;

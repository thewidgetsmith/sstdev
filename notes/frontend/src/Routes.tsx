import React from "react";
import { Route, Routes } from "react-router-dom";

import AnonGuard from "./components/AnonGuard";
import AuthGuard from "./components/AuthGuard";

import Home from "./containers/Home";
import Login from "./containers/Login";
import NewNote from "./containers/NewNote";
import NoteSelect from "./containers/NoteSelect";
import NotFound from "./containers/NotFound";
import Settings from "./containers/Settings";
import Signup from "./containers/Signup";

export default function Links() {
  return (
    <Routes>
      <Route
        path="/notes/new"
        element={
          <AuthGuard>
            <NewNote />
          </AuthGuard>
        }
      />
      <Route
        path="/notes/:id"
        element={
          <AuthGuard>
            <NoteSelect />
          </AuthGuard>
        }
      />
      <Route
        path="/settings"
        element={
          <AuthGuard>
            <Settings />
          </AuthGuard>
        }
      />
      <Route
        path="/signup"
        element={
          <AnonGuard>
            <Signup />
          </AnonGuard>
        }
      />
      <Route
        path="/login"
        element={
          <AnonGuard>
            <Login />
          </AnonGuard>
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}

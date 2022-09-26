import React, { cloneElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

function querystring(name: string, url = window.location.href) {
  const parsedName = name.replace(/[[]]/g, "\\$&");
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, "i");
  const results = regex.exec(url);

  if (!results || !results[2]) {
    return false;
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function AnonGuard(props: any) {
  const redirect = querystring("redirect");
  const { isAuthenticated } = useAppContext();
  const { children } = props;

  if (isAuthenticated) {
    return <Navigate to={redirect || "/"} />;
  }

  return cloneElement(children, props);
}

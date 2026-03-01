import React, { useEffect } from "react";

function RefreshHandler({ setIsAuthenticated }) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(Boolean(token));
  }, [setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
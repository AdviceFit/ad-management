import React from "react";
import Router from "./router/Router";
import AppSnackbarProvider from "./components/AppSnackbarProvider";

function App() {
  return (
    <>
      <AppSnackbarProvider>
        <Router />
      </AppSnackbarProvider>
    </>
  );
}

export default App;

import React from "react";
import { SnackbarProvider, closeSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const SnackbarAction = ({ snackbarId }) => (
  <IconButton
    size="small"
    aria-label="close"
    color="inherit"
    onClick={() => closeSnackbar(snackbarId)}
  >
    <CloseIcon fontSize="small" />
  </IconButton>
);

// AppSnackbarProvider Component
const AppSnackbarProvider = ({ children }) => {
  // Custom action to render close button in each snackbar
  const renderSnackbarAction = (key) => <SnackbarAction snackbarId={key} />;

  return (
    <SnackbarProvider
      maxSnack={3} // Max number of snackbars displayed at a time
      autoHideDuration={3000} // Auto-hide after 3 seconds
      preventDuplicate // Prevent duplicate messages from stacking
      action={(key) => renderSnackbarAction(key)}
    >
      {children}
    </SnackbarProvider>
  );
};

export default AppSnackbarProvider;

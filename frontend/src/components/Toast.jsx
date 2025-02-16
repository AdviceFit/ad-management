import { enqueueSnackbar } from "notistack";

const Toast = ({ message, variant, position, autoHideDuration }) => {
  enqueueSnackbar(message, {
    variant: variant || "default",
    autoHideDuration: autoHideDuration || 3000,
    anchorOrigin: position || { vertical: "bottom", horizontal: "right" }, // Dynamic positioning
  });
};

export default Toast;

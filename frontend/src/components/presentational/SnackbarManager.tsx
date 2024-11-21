import { useDispatch, useSelector } from "react-redux";
import { selectSnackbarState } from "../../redux/selectors/snackbarSelectors";
import { closeSnackbar } from "../../redux/slices/snackbarSlice";
import { BaseSnackbar } from "./BaseSnackbar";

export const SnackbarManager = () => {
  const dispatch = useDispatch();
  const snackbarState = useSelector(selectSnackbarState);

  return (
    <BaseSnackbar
      open={snackbarState.open}
      message={snackbarState.message}
      alertType={snackbarState.alertType}
      onClose={() => dispatch(closeSnackbar())}
      autHideDuration={5000}
    />
  );
};

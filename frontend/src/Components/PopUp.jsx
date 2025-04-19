import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  useTheme,
  Slide,
  Divider,
  Avatar,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { hidePopup } from "../Redux/popupSlice";
import { styled } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    minWidth: "450px",
    maxWidth: "600px",
    borderRadius: "16px",
    boxShadow: theme.shadows[10],
    overflow: "hidden",
    backgroundImage: "none",
    backgroundColor: theme.palette.background.paper,
  },
}));

const DialogHeader = styled(Box)(({ theme, headerColor }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  background: headerColor || theme.palette.primary.main,
  color: theme.palette.getContrastText(
    headerColor || theme.palette.primary.main
  ),
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  "& .MuiDialogContentText-root": {
    color: theme.palette.text.primary,
    fontSize: "0.9375rem",
    lineHeight: 1.6,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: theme.spacing(1, 2),
  textTransform: "none",
  fontWeight: 500,
  letterSpacing: "0.025em",
  minWidth: "100px",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-1px)",
  },
}));

const Popup = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {
    isOpen,
    title,
    message,
    buttons,
    icon,
    headerColor,
    loading,
    disableBackdropClick,
  } = useSelector((state) => state.popup);

  const handleClose = () => {
    if (!disableBackdropClick) {
      dispatch(hidePopup());
    }
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEscapeKeyDown={disableBackdropClick}
    >
      <DialogHeader headerColor={headerColor}>
        {icon && (
          <Avatar
            sx={{
              mr: 2,
              bgcolor: "transparent",
              color: "inherit",
              width: 40,
              height: 40,
            }}
          >
            {icon}
          </Avatar>
        )}
        <Typography
          variant="h6"
          sx={{
            flex: 1,
            fontWeight: 600,
            color: "inherit",
          }}
        >
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: "inherit",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogHeader>

      <ContentBox>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </ContentBox>

      <Divider sx={{ my: 0 }} />

      <DialogActions
        sx={{
          padding: theme.spacing(2),
          justifyContent: buttons?.length > 1 ? "space-between" : "flex-end",
          gap: 1,
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ mx: 2 }} />
        ) : buttons?.length > 0 ? (
          buttons.map((button, index) => (
            <ActionButton
              key={index}
              variant={button.variant || "contained"}
              onClick={() => {
                if (button.onClick) button.onClick();
                if (!button.keepOpen) handleClose();
              }}
              color={button.color || "primary"}
              disabled={button.disabled}
              startIcon={button.icon}
              sx={{
                ...(button.sx || {}),
                ...(button.color === "error" && {
                  "&:hover": {
                    backgroundColor: theme.palette.error.dark,
                  },
                }),
              }}
            >
              {button.text}
            </ActionButton>
          ))
        ) : (
          <ActionButton
            onClick={handleClose}
            color="primary"
            variant="contained"
          >
            OK
          </ActionButton>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

export default Popup;

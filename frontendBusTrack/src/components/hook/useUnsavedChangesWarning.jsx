import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useUnsavedChangesWarning = (isFormDirty) => {
  const navigate = useNavigate();
  //setOpen is human made nofitication for button exit
  const [open, setOpen] = useState(false);
  const [nextPath, setNextPath] = useState(null);

  //window exit and system notification
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  //user handling navigation
  const handleNavigation = (path) => {
    if (isFormDirty) {
      setOpen(true);
      setNextPath(path);
    } else {
      navigate(path);
    }
  };

  return { open, setOpen, nextPath, handleNavigation };
};

export default useUnsavedChangesWarning;

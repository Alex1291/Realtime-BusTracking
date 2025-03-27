import { createContext, useState } from "react";

export const FormDirtyContext = createContext(false);

export const FormDirtyProvider = ({ children }) => {
  const [isFormDirty, setIsFormDirty] = useState(false);

  return (
    <FormDirtyContext.Provider value={{ isFormDirty, setIsFormDirty }}>
      {children}
    </FormDirtyContext.Provider>
  );
};

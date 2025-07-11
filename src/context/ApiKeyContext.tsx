import React, { createContext, ReactNode } from "react";

type ApiKeyContextType = {
  apiKey: string;
};

const ApiKeyContext = createContext<ApiKeyContextType>({
  apiKey: " 60QTFQS-DPE44Y8-G003KC5-W1E0QJ1", //   60QTFQS-DPE44Y8-G003KC5-W1E0QJ1 --   7PXP2XM-HE44Z9R-PWZJV8Y-PMM3F8J --  H1S6GE5-9VT4ANT-Q5YV6SD-BYK4YF1  -- 6Y8320X-FW64YXM-HSAAXXE-9WY3VMK
});

interface ApiKeyProviderProps {
  children: ReactNode;
}

const ApiKeyProvider: React.FC<ApiKeyProviderProps> = ({ children }) => {
  const apiKey = " 60QTFQS-DPE44Y8-G003KC5-W1E0QJ1";

  return (
    <ApiKeyContext.Provider value={{ apiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export { ApiKeyProvider, ApiKeyContext };

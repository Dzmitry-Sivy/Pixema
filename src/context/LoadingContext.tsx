import React, { useState, createContext, ReactNode } from "react";
interface ILoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface LoadingProviderProps {
  children: ReactNode;
}
const LoadingContext = createContext<ILoadingContextType>({
  loading: false,
  setLoading: () => {},
});



const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };

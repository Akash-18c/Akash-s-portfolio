import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import IntroAnimation from "../components/IntroAnimation";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);

  const value: LoadingType = {
    isLoading,
    setIsLoading,
    setLoading: () => {},
  };

  const handleFinish = () => {
    // trigger page animations then unmount intro
    import("../components/utils/initialFX").then((module) => {
      module.initialFX();
      setIsLoading(false);
    });
  };

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <IntroAnimation onFinish={handleFinish} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

"use client";

import React, { createContext, useContext, ReactNode, useState, useCallback } from "react";

interface BackgroundContextType {
  isDisabled: boolean;
  disable: () => void;
  enable: () => void;
}

export const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
);

export function BackgroundProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [isDisabled, setIsDisabled] = useState(false);

  const disable = useCallback(() => {
    setIsDisabled(true);
  }, []);

  const enable = useCallback(() => {
    setIsDisabled(false);
  }, []);

  const value: BackgroundContextType = { isDisabled, disable, enable };

  return React.createElement(
    BackgroundContext.Provider,
    { value },
    children
  );
}

export function useBackgroundEffect(): BackgroundContextType {
  const context = useContext(BackgroundContext);

  if (!context) {
    console.warn(
      "useBackgroundEffect must be used within BackgroundProvider"
    );
    return {
      isDisabled: false,
      disable: () => {},
      enable: () => {},
    };
  }

  return context;
}

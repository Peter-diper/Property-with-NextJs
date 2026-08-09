"use client";

import { GlobalProvider } from "@/context/GlobalContext";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }) => {
  return (
    <GlobalProvider>
      <SessionProvider>{children}</SessionProvider>
    </GlobalProvider>
  );
};

export default Providers;

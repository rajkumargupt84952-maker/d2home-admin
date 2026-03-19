import { useState } from "react";

export function useLoader() {
  const [loader, setLoader] = useState(false);
  return {
    loader,
    setLoader,
  };
}

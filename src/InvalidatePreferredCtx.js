import { createContext, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounceFn } from "./api/useDebouceFn";

/**
 * @type {React.Context<{ invalidate: () => void }>}
 */
export const InvalidatePreferredCtx = createContext(null);

export const InvalidatePreferredCtxProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const invalidate = useDebounceFn(
    () => queryClient.invalidateQueries({
      queryKey: ["preferred-currencies"]
    }),
    1500
  );
  return (
    <InvalidatePreferredCtx.Provider value={{ invalidate }}>
      {children}
    </InvalidatePreferredCtx.Provider>
  );
}

/**
 * @returns {{ invalidate: () => void }}
 */
export const useInvalidPreferred = () => useContext(InvalidatePreferredCtx);
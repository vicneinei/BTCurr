import { useRef } from "react";

export const useDebounceFn = (fn, delay = 1000) => {
  const debounceTimeoutRef = useRef(null);

  return (...args) => {
    debounceTimeoutRef.current && clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(
      () => {
        debounceTimeoutRef.current = null;
        return fn(...args);
      }, delay
    );
  }
}
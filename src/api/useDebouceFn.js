import { useRef, useEffect } from "react";

export const useDebounceFn = (fn, delay = 1000) => {
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      debounceTimeoutRef.current && clearTimeout(debounceTimeoutRef.current);
    }
  })

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
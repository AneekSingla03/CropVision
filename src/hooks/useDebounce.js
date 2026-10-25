import { useState, useEffect } from 'react';

/**
 * Custom React hook that debounces a fast-changing value.
 * @param {*} value - The raw value to debounce (e.g. text search input).
 * @param {number} delay - Delay in milliseconds before updating the debounced value (default: 300ms).
 * @returns {*} The debounced value.
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

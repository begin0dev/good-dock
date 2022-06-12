import { useState } from "react";
import { useThrottleCallback } from "./useThrottleCallback";

export function useSendApi<T extends any[] = any[]>(
  apiFn: (...args: T) => void,
  errorHandler?: (err: unknown) => void,
) {
  const [isLoading, setIsLoading] = useState(false);

  const callFn = useThrottleCallback(async (...args: T) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await apiFn(...args);
    } catch (err) {
      if (errorHandler) errorHandler(err);
    } finally {
      setIsLoading(false);
    }
  });

  return [isLoading, callFn] as const;
}

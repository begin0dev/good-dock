import { useState } from "react";
import { useThrottleCallback } from "./useThrottleCallback";

export function useSendApi(apiFn: (...args: any[]) => void, errorHandler?: (err: unknown) => void) {
  const [isLoading, setIsLoading] = useState(false);

  const callFn = useThrottleCallback(async (...args: any[]) => {
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

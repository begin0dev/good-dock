import { useCallback, useRef, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export function useSearchInput(initValue?: string) {
  const debounceTimer = useRef<NodeJS.Timeout>();

  const [keyword, setKeyword] = useState<string | undefined>(initValue);
  const [currentSearch, setCurrentKeyword] = useState<string | undefined>(initValue);

  const onChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const { text } = e.nativeEvent;
    setKeyword(text);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setCurrentKeyword(text);
    }, 1000);
  }, []);

  const onReset = useCallback(() => {
    setKeyword(initValue);
    setCurrentKeyword(initValue);
  }, [initValue]);

  return { keyword, onChange, currentSearch, onReset } as const;
}

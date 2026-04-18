import { useState, useEffect } from "react";

const STORAGE_KEY = "hf_api_key";

export function useHFKey() {
  const [hfKey, setHFKeyState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  });

  const setHFKey = (key: string) => {
    const trimmed = key.trim();
    setHFKeyState(trimmed);
    if (trimmed) {
      localStorage.setItem(STORAGE_KEY, trimmed);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const clearHFKey = () => {
    setHFKeyState("");
    localStorage.removeItem(STORAGE_KEY);
  };

  return { hfKey, setHFKey, clearHFKey, hasKey: !!hfKey };
}

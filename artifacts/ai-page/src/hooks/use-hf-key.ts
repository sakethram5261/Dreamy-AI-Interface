export function useHFKey() {
  const hfKey = import.meta.env.VITE_HF_API_KEY as string | undefined ?? "";
  return { hfKey, hasKey: !!hfKey };
}

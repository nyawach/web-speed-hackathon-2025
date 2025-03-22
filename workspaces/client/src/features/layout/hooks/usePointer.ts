import { useStore } from '@wsh-2025/client/src/app/StoreContext';

export function usePointer(): { x: number; y: number } {
  const pointer = useStore((s) => s.features.layout.pointer);
  return pointer;
}

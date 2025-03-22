import { useStore } from '@wsh-2025/client/src/app/StoreContext';

export function useAuthUser() {
  const user = useStore((s) => s.features.auth.user);
  return user;
}

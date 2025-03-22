import { useStore } from '@wsh-2025/client/src/app/StoreContext';

export function useShownNewFeatureDialog(): boolean {
  const timetablePage = useStore((s) => s.pages.timetable);
  return timetablePage.shownNewFeatureDialog;
}

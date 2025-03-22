import { useStore } from '@wsh-2025/client/src/app/StoreContext';

interface Params {
  referenceId: string;
}

export function useRecommended({ referenceId }: Params) {
  const state = useStore((s) => s);

  const moduleIds = state.features.recommended.references[referenceId];

  const modules = (moduleIds ?? [])
    .flatMap((moduleId) => state.features.recommended.recommendedModules[moduleId] ? [state.features.recommended.recommendedModules[moduleId]] : [])

  return modules;
}

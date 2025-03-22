import { useStore } from '@wsh-2025/client/src/app/StoreContext';

interface Params {
  referenceId: string;
}

export function useRecommended({ referenceId }: Params) {
  const recommended = useStore((s) => s.features.recommended);

  const moduleIds = recommended.references[referenceId];

  const modules = (moduleIds ?? [])
    .flatMap((moduleId) => recommended.recommendedModules[moduleId] ? [recommended.recommendedModules[moduleId]] : [])

  return modules;
}

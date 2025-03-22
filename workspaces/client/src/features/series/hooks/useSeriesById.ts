import { useStore } from '@wsh-2025/client/src/app/StoreContext';

interface Params {
  seriesId: string;
}

export function useSeriesById({ seriesId }: Params) {
  const seriesList = useStore((s) => s.features.series.series);

  const series = seriesList[seriesId];

  return series;
}

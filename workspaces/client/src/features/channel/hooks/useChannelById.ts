import { useStore } from '@wsh-2025/client/src/app/StoreContext';

type ChannelId = string;

export function useChannelById(params: { channelId: ChannelId }) {
  const channels = useStore((s) => s.features.channel.channels);

  const channel = channels[params.channelId];

  return channel;
}

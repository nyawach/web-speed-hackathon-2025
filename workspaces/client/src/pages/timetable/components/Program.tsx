import { StandardSchemaV1 } from '@standard-schema/spec';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { DateTime } from 'luxon';
import { ReactElement, useMemo, useRef } from 'react';
import Ellipsis from 'react-ellipsis-component';
import { ArrayValues } from 'type-fest';

import { Hoverable } from '@wsh-2025/client/src/features/layout/components/Hoverable';
import { ProgramDetailDialog } from '@wsh-2025/client/src/pages/timetable/components/ProgramDetailDialog';
import { useColumnWidth } from '@wsh-2025/client/src/pages/timetable/hooks/useColumnWidth';
import { useCurrentUnixtimeMs } from '@wsh-2025/client/src/pages/timetable/hooks/useCurrentUnixtimeMs';
import { useSelectedProgramId } from '@wsh-2025/client/src/pages/timetable/hooks/useSelectedProgramId';

interface Props {
  height: number;
  program: ArrayValues<StandardSchemaV1.InferOutput<typeof schema.getTimetableResponse>>;
}

export const Program = ({ height, program }: Props): ReactElement => {
  const width = useColumnWidth(program.channelId);

  const [selectedProgramId, setProgram] = useSelectedProgramId();
  const shouldProgramDetailDialogOpen = program.id === selectedProgramId;
  const onClick = () => {
    setProgram(program);
  };

  const currentUnixtimeMs = useCurrentUnixtimeMs();
  const startAtMs = DateTime.fromISO(program.startAt).toMillis()
  const endAtMs = DateTime.fromISO(program.endAt).toMillis()
  const currntMs = DateTime.fromMillis(currentUnixtimeMs).toMillis()
  const isBroadcasting =
    startAtMs <= currntMs && currntMs < endAtMs
  const isArchived = endAtMs <= currntMs;

  const titleRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // NOTE: widthが変わったときに再計算が必要
  const shouldImageBeVisible = useMemo(() => {
    const imageHeight = imageRef.current?.clientHeight ?? 0;
    const titleHeight = titleRef.current?.clientHeight ?? 0;
    return imageHeight <= height - titleHeight
  }, [height, titleRef.current, imageRef.current, width]);

  return (
    <>
      <button
        className={`w-auto border-[1px] border-solid border-[#000000] ${isBroadcasting ? 'bg-[#FCF6E5]' : 'bg-[#212121]'} px-[12px] py-[8px] text-left ${isArchived ? 'opacity-50' : 'opacity-100'} ${isArchived ? 'hover:brightness-200' : 'hover:brightness-125'} cursor-pointer`}
        style={{ height, width }}
        type="button"
        onClick={onClick}
      >
        <div className="flex size-full flex-col overflow-hidden">
          <div ref={titleRef} className="mb-[8px] flex flex-row items-start justify-start">
            <span
              className={`mr-[8px] shrink-0 grow-0 text-[14px] font-bold ${isBroadcasting ? 'text-[#767676]' : 'text-[#999999]'}`}
            >
              {DateTime.fromISO(program.startAt).toFormat('mm')}
            </span>
            <div
              className={`grow-1 shrink-1 overflow-hidden text-[14px] font-bold ${isBroadcasting ? 'text-[#212121]' : 'text-[#ffffff]'}`}
            >
              <Ellipsis ellipsis reflowOnResize maxLine={3} text={program.title} visibleLine={3} />
            </div>
          </div>
          <div className={`${shouldImageBeVisible ? 'visible' : 'hidden'} w-full`}>
            <img
              ref={imageRef}
              alt=""
              className="pointer-events-none w-full rounded-[8px] border-[2px] border-solid border-[#FFFFFF1F]"
              src={program.thumbnailUrl}
            />
          </div>
        </div>
      </button>
      <ProgramDetailDialog isOpen={shouldProgramDetailDialogOpen} program={program} />
    </>
  );
};

import { useSharedPlayer } from '@/components/PlayerContext';
import { IComponentProps } from '@/types/component';
import { secondToHHMMSS } from '@/utils/date';
import { Slider } from '@heroui/react';

interface IProps extends IComponentProps {
  isLive?: boolean;
  isDisabled?: boolean;
  isInline?: boolean;
}

const PlayerProgress = (props: IProps) => {
  const { isLive, isDisabled, isInline } = props;
  const { state, handleSeekChangeEnd, handleSeekChange } = useSharedPlayer();

  if (isInline) {
    return (
      <>
        {!isLive && (
          <p className="text-small text-gray-100/50">
            {secondToHHMMSS(state.duration * state.played)}
          </p>
        )}
        <Slider
          className="w-full"
          value={state.live ? 100 : state.played}
          hideValue={true}
          aria-label="Media Progress"
          maxValue={1}
          minValue={0}
          step={0.0001}
          size="sm"
          classNames={{
            track: [
              'data-[fill-start=true]:border-l-ams-red dark:data-[fill-start=true]:border-l-ams-red-dark',
              'data-[fill-end=true]:border-r-ams-red dark:data-[fill-end=true]:border-r-ams-red-dark',
              'border-x-4',
            ],
            filler: 'bg-ams-red dark:bg-ams-red-dark',
            thumb: [
              'transition-size bg-ams-red dark:bg-ams-red-dark',
              'data-[fill-start=true]:bg-ams-red dark:data-[fill-start=true]:bg-ams-red-dark',
              'h-3 w-3 after:h-3 after:w-3 before:w-3 before:h-3 after:bg-ams-red-dark overflow-clip',
            ],
          }}
          onChange={(value) => handleSeekChange(value as number)}
          onChangeEnd={(value) => handleSeekChangeEnd(value as number)}
          isDisabled={isDisabled}
        />
        {!isLive && (
          <p className="text-small text-gray-100/50">
            {secondToHHMMSS(state.duration)}
          </p>
        )}
        {isLive && (
          <div className="flex items-center justify-end gap-3 text-gray-100">
            <div className="flex gap-1">
              <div className="border-2 h-5 w-5 rounded-full grid items-center justify-center border-ams-red animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
              <p className="text-small">Live</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Slider
        className="w-full"
        value={props.isLive ? 100 : state.played}
        hideValue={true}
        aria-label="Media Progress"
        maxValue={1}
        minValue={0}
        step={0.0001}
        size="sm"
        classNames={{
          track: ['data-[fill-start=true]:border-l-ams-red', 'border-x-8'],
          filler: 'bg-ams-red',
          thumb: [
            'transition-size bg-ams-red',
            'data-[fill-start=true]:bg-ams-red',
            'h-4 w-4 after:h-2.5 after:w-2.5 after:bg-ams-red overflow-clip',
          ],
        }}
        onChange={(value) => handleSeekChange(value as number)}
        onChangeEnd={(value) => handleSeekChangeEnd(value as number)}
        isDisabled={isDisabled}
      />

      <div>
        {isLive && (
          <div className="flex items-center justify-end gap-3 text-gray-100 -mb-3">
            <div className="flex gap-1">
              <div className="border-2 h-5 w-5 rounded-full grid items-center justify-center border-ams-red dark:border-ams-red-dark animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
              <p className="text-small">Live</p>
            </div>
          </div>
        )}
        {!isLive && (
          <div className="flex justify-between -mb-3 text-small text-gray-100">
            <p>{secondToHHMMSS(state.duration * state.played)}</p>
            <p>{secondToHHMMSS(state.duration)}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PlayerProgress;

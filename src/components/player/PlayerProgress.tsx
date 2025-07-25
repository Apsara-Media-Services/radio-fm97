import {
  Slider,
} from "@heroui/react";
import { useSharedPlayer } from '@/components/PlayerContext';
import { IComponentProps } from '@/types/component';

interface IProps extends IComponentProps {
  isLive?: boolean;
}

const PlayerProgress = (props: IProps) => {
  const {
    state,
    handleSeekChangeEnd,
    handleSeekChange,
  } = useSharedPlayer();

  const onChange = (value: number) => {
    if (props.isLive) return;
    handleSeekChange(value);
  };

  const onChangeEnd = (value: number) => {
    if (props.isLive) return;
    handleSeekChangeEnd(value);
  };

  return (
    <Slider
      className="w-full"
      value={props.isLive ? 100 : state.played }
      hideValue={true}
      aria-label="Media Progress"
      maxValue={1}
      minValue={0}
      step={0.0001}
      size="sm"
      classNames={{
        track: [
          "data-[fill-start=true]:border-l-ams-red",
          "border-x-8"
        ],
        filler: "bg-ams-red",
        thumb: [
          "transition-size bg-ams-red",
          "data-[fill-start=true]:bg-ams-red",
          "h-4 w-4 after:h-2.5 after:w-2.5",
        ],
      }}
      onChange={(value) => onChange(value as number)}
      onChangeEnd={(value) => onChangeEnd(value as number)}
    />
  );
};

export default PlayerProgress;
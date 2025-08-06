import { useSharedPlayer } from '@/components/PlayerContext';
import { IComponentProps } from '@/types/component';
import { Button } from '@heroui/react';

const PlayerPlayPause = (props: IComponentProps) => {
  const { PlayingIcon, handlePlayPause } = useSharedPlayer();

  return (
    <div className={props.className}>
      <Button
        onPress={() => handlePlayPause()}
        isIconOnly
        className="w-auto h-auto data-[hover]:bg-gray-100/10 p-1 outline-none"
        radius="full"
        variant="light"
      >
        <PlayingIcon style={{ fontSize: 70 }} />
      </Button>
    </div>
  );
};

export default PlayerPlayPause;

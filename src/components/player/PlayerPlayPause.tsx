import { useSharedPlayer } from '@/components/PlayerContext';
import { IComponentProps } from '@/types/component';
import { Button } from '@heroui/react';

interface IProps extends IComponentProps {
  isDisabled?: boolean;
}

const PlayerPlayPause = (props: IProps) => {
  const { isDisabled, className } = props;
  const { state, PlayingIcon, handlePlayPause } = useSharedPlayer();

  return (
    <Button
      onPress={() => handlePlayPause()}
      isIconOnly
      className="w-auto h-auto data-hover:bg-gray-100/10 outline-none text-gray-100"
      radius="full"
      variant="light"
      isDisabled={isDisabled}
    >
      {state.loading && (
        <div className="absolute inset-0 rounded-full border-3 border-ams-primary border-t-transparent animate-spin"></div>
      )}

      <PlayingIcon style={{ fontSize: 70 }} />
    </Button>
  );
};

export default PlayerPlayPause;

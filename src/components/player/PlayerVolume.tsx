import { useSharedPlayer } from '@/components/PlayerContext';
import { IComponentProps } from '@/types/component';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
} from '@heroui/react';

interface IProps extends IComponentProps {
  isDisabled?: boolean;
  isInline?: boolean;
}

const PlayerVolume = (props: IProps) => {
  const { isDisabled, isInline } = props;
  const {
    state,
    VolumeIcon,
    handleVolumePopupChange,
    handleMuteToggle,
    handleVolumeChange,
  } = useSharedPlayer();

  if (isInline) {
    return (
      <>
        <div className="flex items-center gap-x-1">
          <Button
            onPress={handleMuteToggle}
            isIconOnly
            className="w-fit min-w-fit h-fit text-gray-100"
            radius="full"
            variant="light"
            isDisabled={isDisabled}
          >
            <VolumeIcon />
          </Button>
          <Slider
            value={state.volume}
            hideValue={true}
            minValue={0}
            maxValue={1}
            step={0.001}
            size="sm"
            aria-label="Volume"
            classNames={{
              base: 'w-10 md:w-16',
              track: [
                'data-[fill-start=true]:border-l-ams-red',
                'data-[fill-end=true]:border-r-ams-red',
                'border-x-4',
              ],
              filler: 'bg-ams-red',
              thumb: [
                'transition-size bg-ams-red',
                'data-[fill-start=true]:bg-ams-red',
                'h-2.5 w-2.5 after:h-2.5 after:w-2.5 before:w-2.5 before:h-2.5 after:bg-ams-red',
              ],
            }}
            onChange={(value) => handleVolumeChange(value as number)}
          />
        </div>
      </>
    );
  }
  return (
    <div className="flex items-center gap-0">
      <div
        onMouseOut={() => handleVolumePopupChange(false)}
        onMouseLeave={() => handleVolumePopupChange(false)}
        onMouseEnter={() => handleVolumePopupChange(true)}
        onMouseOver={() => handleVolumePopupChange(true)}
      >
        <Popover
          isOpen={state.volumePopup && !isDisabled}
          placement="top"
          offset={1}
        >
          <PopoverTrigger>
            <Button
              onClick={() => handleMuteToggle()}
              isIconOnly
              className="data-hover:bg-gray-100/10 text-gray-100"
              radius="full"
              variant="light"
              isDisabled={isDisabled}
            >
              <VolumeIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-gray-100/10 px-0.5 py-2 hidden md:block rounded-full">
            <div className="relative h-16">
              <Slider
                value={state.volume}
                hideValue={true}
                minValue={0}
                maxValue={1}
                step={0.001}
                size="sm"
                orientation="vertical"
                isDisabled={isDisabled}
                aria-label="Volume"
                classNames={{
                  base: 'max-w-md',
                  track: [
                    'data-[fill-start=true]:border-b-ams-red',
                    'border-y-8',
                  ],
                  filler: 'bg-ams-red',
                  thumb: [
                    'transition-size bg-ams-red',
                    'data-[fill-start=true]:bg-ams-red',
                    'h-4 w-4 after:h-2.5 after:w-2.5',
                  ],
                }}
                onChange={(value) => handleVolumeChange(value as number)}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default PlayerVolume;

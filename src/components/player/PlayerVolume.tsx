import { useSharedPlayer } from '@/components/PlayerContext';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
} from '@heroui/react';

const PlayerVolume = () => {
  const {
    state,
    VolumeIcon,
    handleVolumePopupChange,
    handleMuteToggle,
    handleVolumeChange,
  } = useSharedPlayer();

  return (
    <div className="flex items-center gap-0">
      <div
        onMouseLeave={() => handleVolumePopupChange(false)}
        onMouseOver={() => handleVolumePopupChange(true)}
      >
        <Popover isOpen={state.volumePopup} placement="top" offset={1}>
          <PopoverTrigger>
            <Button
              onClick={handleMuteToggle}
              isIconOnly
              className="data-[hover]:bg-gray-100/10 p-1"
              radius="full"
              variant="light"
            >
              <VolumeIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-gray-100/10 px-0.5 py-2 hidden md:block rounded-full">
            <div className="relative h-[100px]">
              <Slider
                value={state.volume}
                hideValue={true}
                minValue={0}
                maxValue={1}
                step={0.001}
                size="sm"
                orientation="vertical"
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

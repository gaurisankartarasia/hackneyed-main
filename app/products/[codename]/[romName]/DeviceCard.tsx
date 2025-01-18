// components/DeviceCard.tsx
'use client'
import Image from 'next/image';
import { Device } from '@/types/rom';
import { Card } from '@/components/ui/card';
import Spinner from '@/components/ui/Spinner';

interface DeviceCardProps {
  device: Device;
  romName: string;
  romVersion: string | null;
  imageLoaded: boolean;
  onImageLoad: () => void;
}

export const DeviceCard = ({ device, romName, romVersion, imageLoaded, onImageLoad }: DeviceCardProps) => {
  return (
    <Card className="p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-48 h-48">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </div>
          )}
          <Image
          priority
            src={device.imageUrl}
            alt={device.codename}
            height={200}
            width={200}
            className={`object-contain rounded-xl transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={onImageLoad}
          />
        </div>
        <div>
          <b>Available Builds</b>
          <p>
            Device: {device.availableDevices.join(', ')} ({device.codename})
          </p>
          <p>
            ROM: {(romName || '').replace(/-/g, ' ')}
          </p>
          <p>Version: {romVersion}</p>
        </div>
      </div>
    </Card>
  );
};


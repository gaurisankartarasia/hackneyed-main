
// // app/products/page.tsx
// 'use client'
// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { Search } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent,
//   CardDescription,
//   CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import  {Spinner}  from '@radix-ui/themes';



// interface Device {
//   id: string;
//   imageUrl: string;
//   codename: string;
//   availableDevices: string[];
//   createdAt: number;
//   updatedAt: number;
// }

// interface ProductCardProps {
//   device: Device;
// }

// const ProductCard = React.memo(({ device }: ProductCardProps) => {
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const handleImageLoad = () => {
//     setLoading(false);
//   };

//   const handleClick = () => {
//     router.push(`/products/${device.codename}`);
//   };

//   return (
//     <Card  >
//       <CardContent>
//       {loading && (
//         <div className="mx-auto">
//          <Spinner/>
//         </div>
//       )}
//       <div className={`relative overflow-hidden ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
//         <Image 
//           src={device.imageUrl} 
//           alt={device.codename} 
//           width={100}
//           height={100}
//           className="object-cover w-full max-w-[200px]  rounded-xl"  
//           onLoad={handleImageLoad}
//           loading="lazy"
          
//         />
//       </div>

//     <div className='m-3'>  
//       <div className='font-mono  '>
//       <CardTitle >{device.codename}</CardTitle>
//         <h2 className="text-xl font-medium tracking-tight">
//           <CardDescription>{device.availableDevices.join(', ')}</CardDescription>
//         </h2>

//       </div>
//         </div>

//         <Button
        
//           onClick={handleClick}
//           className="w-full font-semibold py-2 px-4"
//         >
//           Get Build
//         </Button>
//         </CardContent>
//     </Card>
//   );
// });

// ProductCard.displayName = 'ProductCard';

// const useDevices = (searchTerm: string) => {
//   const [devices, setDevices] = useState<Device[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDevices = async () => {
//       try {
//         const response = await fetch('/api/devices');
//         if (!response.ok) throw new Error('Failed to fetch devices');
//         const data = await response.json();
//         setDevices(data.devices);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDevices();
//   }, []);

//   const filteredDevices = useMemo(() => {
//     if (!searchTerm) return devices;
    
//     const searchLower = searchTerm.toLowerCase();
//     return devices.filter(device => 
//       device.codename.toLowerCase().includes(searchLower) ||
//       device.availableDevices.some(d => d.toLowerCase().includes(searchLower))
//     );
//   }, [devices, searchTerm]);

//   return { devices: filteredDevices, loading, error };
// };

// const CustomROMProductsPage = () => {
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const { devices, loading, error } = useDevices(searchTerm);

//   const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   }, []);

//   if (loading) {
    
//     return <div className=" flex justify-center "><Spinner size='3' /></div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 mt-8">Error: {error}</div>;
//   }

//   return (
    
//     <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//             <b className="mb-8 flex justify-center text-center">Find Your Device</b>

//       <div className="mb-10 relative max-w-md mx-auto flex items-center">
//       <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//         <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
//       </span>
//         <Input
//           type="text"
//           placeholder="Search by device name or codename..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//          className='block pl-10'
//         />
//       </div>
       

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {devices.map(device => (
//           <ProductCard key={device.id} device={device} />
//         ))}
//       </div>

//       {devices.length === 0 && (
//         <p className="text-center text-gray-500 mt-8">No matching devices found.</p>
//       )}
//     </div>
//   );
// };

// export default CustomROMProductsPage;









// app/products/page.tsx
'use client'
import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Spinner } from '@radix-ui/themes';

interface Device {
  id: string;
  imageUrl: string;
  codename: string;
  availableDevices: string[];
  createdAt: number;
  updatedAt: number;
}

// Cache key for SWR
const DEVICES_CACHE_KEY = '/api/devices';

// Fetch function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch devices');
  return res.json();
};

// Reusable Product Card with proper memoization
const ProductCard = React.memo(({ device }: { device: Device }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  return (
    <Card>
      <CardContent>
        {!imageLoaded && (
          <div className="mx-auto">
            <Spinner />
          </div>
        )}
        <div className={`relative overflow-hidden ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
          <Image 
            src={device.imageUrl} 
            alt={device.codename} 
            width={100}
            height={100}
            className="object-cover w-full max-w-[200px] rounded-xl"  
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
            priority={false}
          />
        </div>

        <div className='m-3'>  
          <div className='font-mono'>
            <CardTitle>{device.codename}</CardTitle>
            <CardDescription>{device.availableDevices.join(', ')}</CardDescription>
          </div>
        </div>

        <Button
          onClick={() => router.push(`/products/${device.codename}`)}
          className="w-full font-semibold py-2 px-4"
        >
          Get Build
        </Button>
      </CardContent>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

const CustomROMProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, isLoading } = useSWR<{ devices: Device[] }>(
    DEVICES_CACHE_KEY,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000, // Cache for 5 minutes
    }
  );

  const filteredDevices = useMemo(() => {
    if (!data?.devices) return [];
    if (!searchTerm) return data.devices;
    
    const searchLower = searchTerm.toLowerCase();
    return data.devices.filter(device => 
      device.codename.toLowerCase().includes(searchLower) ||
      device.availableDevices.some(d => d.toLowerCase().includes(searchLower))
    );
  }, [data?.devices, searchTerm]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center"><Spinner size='3' /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">Error loading devices</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <b className="mb-8 flex justify-center text-center">Find Your Device</b>

      <div className="mb-10 relative max-w-md mx-auto flex items-center">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
        <Input
          type="text"
          placeholder="Search by device name or codename..."
          value={searchTerm}
          onChange={handleSearchChange}
          className='block pl-10'
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDevices.map(device => (
          <ProductCard key={device.id} device={device} />
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No matching devices found.</p>
      )}
    </div>
  );
};

export default CustomROMProductsPage;
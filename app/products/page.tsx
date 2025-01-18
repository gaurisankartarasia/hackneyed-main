


// // app/products/page.tsx
// 'use client'
// import React, { useState, useMemo, useCallback } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { Search } from 'lucide-react';
// import useSWR from 'swr';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Spinner } from '@radix-ui/themes';

// interface Device {
//   id: string;
//   imageUrl: string;
//   codename: string;
//   availableDevices: string[];
//   createdAt: number;
//   updatedAt: number;
// }

// // Cache key for SWR
// const DEVICES_CACHE_KEY = '/api/devices';

// // Fetch function for SWR
// const fetcher = async (url: string) => {
//   const res = await fetch(url);
//   if (!res.ok) throw new Error('Failed to fetch devices');
//   return res.json();
// };

// // Reusable Product Card with proper memoization
// const ProductCard = React.memo(({ device }: { device: Device }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const router = useRouter();

//   return (
//     <Card>
//       <CardContent>
//         {!imageLoaded && (
//           <div className="mx-auto">
//             <Spinner />
//           </div>
//         )}
//         <div className={`relative overflow-hidden ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
//           <Image 
//             src={device.imageUrl} 
//             alt={device.codename} 
//             width={100}
//             height={100}
//             className="object-cover w-full max-w-[200px] rounded-xl"  
//             onLoad={() => setImageLoaded(true)}
//             loading="lazy"
//             priority={false}
//           />
//         </div>

//         <div className='m-3'>  
//           <div className='font-mono'>
//             <CardTitle>{device.codename}</CardTitle>
//             <CardDescription>{device.availableDevices.join(', ')}</CardDescription>
//           </div>
//         </div>

//         <Button
//           onClick={() => router.push(`/products/${device.codename}`)}
//           className="w-full font-semibold py-2 px-4"
//         >
//           Get Build
//         </Button>
//       </CardContent>
//     </Card>
//   );
// });

// ProductCard.displayName = 'ProductCard';

// const CustomROMProductsPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const { data, error, isLoading } = useSWR<{ devices: Device[] }>(
//     DEVICES_CACHE_KEY,
//     fetcher,
//     {
//       revalidateOnFocus: false,
//       revalidateOnReconnect: false,
//       dedupingInterval: 300000, // Cache for 5 minutes
//     }
//   );

//   const filteredDevices = useMemo(() => {
//     if (!data?.devices) return [];
//     if (!searchTerm) return data.devices;
    
//     const searchLower = searchTerm.toLowerCase();
//     return data.devices.filter(device => 
//       device.codename.toLowerCase().includes(searchLower) ||
//       device.availableDevices.some(d => d.toLowerCase().includes(searchLower))
//     );
//   }, [data?.devices, searchTerm]);

//   const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   }, []);

//   if (isLoading) {
//     return <div className="flex justify-center"><Spinner size='3' /></div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 mt-8">Error loading devices</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//       <b className="mb-8 flex justify-center text-center">Find Your Device</b>

//       <div className="mb-10 relative max-w-md mx-auto flex items-center">
//         <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//           <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
//         </span>
//         <Input
//           type="text"
//           placeholder="Search by device name or codename..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className='block pl-10'
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {filteredDevices.map(device => (
//           <ProductCard key={device.id} device={device} />
//         ))}
//       </div>

//       {filteredDevices.length === 0 && (
//         <p className="text-center text-gray-500 mt-8">No matching devices found.</p>
//       )}
//     </div>
//   );
// };

// export default CustomROMProductsPage;









// app/products/page.tsx
'use client'
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import useSWRInfinite from 'swr/infinite';
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

interface APIResponse {
  devices: Device[];
  hasMore: boolean;
}

const ITEMS_PER_PAGE = 12;
const PREFETCH_COUNT = 4;

// Type-safe fetcher defined before use
const fetcher = async (url: string): Promise<APIResponse> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch devices');
  return res.json();
};

const prefetchImages = (devices: Device[]) => {
  devices.slice(0, PREFETCH_COUNT).forEach(device => {
    const imgElement = document.createElement('img');
    imgElement.src = device.imageUrl;
  });
};

interface ProductCardProps {
  device: Device;
  priority: boolean;
}

const ProductCard = React.memo(({ device, priority }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Card ref={ref}>
      <CardContent>
        {!imageLoaded && (
          <div className="mx-auto h-[200px] flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {inView && (
          <div className={`relative overflow-hidden ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            <Image 
              src={device.imageUrl} 
              alt={device.codename} 
              width={200}
              height={200}
              className="object-cover w-full max-w-[200px] rounded-xl"  
              onLoad={() => setImageLoaded(true)}
              loading={priority ? "eager" : "lazy"}
              priority={priority}
            />
          </div>
        )}

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
  const searchDebounceRef = useRef<NodeJS.Timeout>();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getKey = (pageIndex: number, previousPageData: APIResponse | null): string | null => {
    // Return null if we know we've loaded all the data
    if (previousPageData && !previousPageData.hasMore) return null;
    // First page, we don't have `previousPageData`
    if (pageIndex === 0) {
      return `/api/devices?page=0&limit=${ITEMS_PER_PAGE}&search=${encodeURIComponent(debouncedSearchTerm)}`;
    }
    // Add the cursor to the API endpoint
    return `/api/devices?page=${pageIndex}&limit=${ITEMS_PER_PAGE}&search=${encodeURIComponent(debouncedSearchTerm)}`;
  };

  const { data, error, size, setSize, isLoading, isValidating } = useSWRInfinite<APIResponse>(
    getKey,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000,
      persistSize: true,
    }
  );

  // Search debounce effect
  useEffect(() => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    searchDebounceRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, [searchTerm]);

  // Image prefetch effect
  useEffect(() => {
    if (data?.[0]?.devices) {
      prefetchImages(data[0].devices);
    }
  }, [data]);

  // Check if we can load more
  const isReachingEnd = data?.slice(-1)[0]?.hasMore === false;
  const isRefreshing = isValidating && data && data.length === size;

  // Infinite scroll implementation
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && !isReachingEnd && !isRefreshing && !isLoadingMore) {
      setIsLoadingMore(true);
      setSize(size + 1).then(() => {
        setIsLoadingMore(false);
      });
    }
  }, [inView, isReachingEnd, isRefreshing]);

  const allDevices = useMemo(() => {
    return data ? data.flatMap(page => page.devices || []) : [];
  }, [data]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

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
        {allDevices.map((device, index) => (
          <ProductCard 
            key={device.id} 
            device={device} 
            priority={index < PREFETCH_COUNT}
          />
        ))}
      </div>

      {(isLoading || isLoadingMore) && (
        <div className="flex justify-center mt-8">
          <Spinner size='3' />
        </div>
      )}

      {!isReachingEnd && !isLoading && (
        <div ref={loadMoreRef} className="h-10" />
      )}

      {allDevices.length === 0 && !isLoading && (
        <p className="text-center text-gray-500 mt-8">No matching devices found.</p>
      )}
    </div>
  );
};

export default CustomROMProductsPage;
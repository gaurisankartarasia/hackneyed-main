

// 'use client'

// // app/products/[codename]/page.tsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import Image from 'next/image';
// import  {Spinner}  from '@radix-ui/themes';
// import { Button } from '@/components/ui/button';
// import { Card, CardDescription, CardTitle, CardContent } from '@/components/ui/card';
// import { ChevronLeft } from 'lucide-react';


// interface ROM {
//   id: string;
//   name: string;
//   version: string;
//   deviceCodename: string;
//   logoUrl: string;
//   createdBy: string;
//   createdAt: number;
//   updatedAt: number;
// }

// interface LazyImageProps {
//   src: string;
//   alt: string;
// }

// const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
//   const [loaded, setLoaded] = useState<boolean>(false);

//   return (
//     <div className="relative ">
//       {!loaded && (
//         <div className="relative inset-0 flex items-center justify-center">
//           <Spinner/>
//         </div>
//       )}
//       <Image
//       height={300}
//         width={300}
//         src={src}
//         alt={alt}
//         loading="lazy"
//         onLoad={() => setLoaded(true)}
//         className={`object-cover w-full my-4 max-w-[300px] h-full max-w-[300px]  rounded-xl  transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
//       />
//     </div>
//   );
// };

// const ROMListingPage = () => {
//   const params = useParams();
//   const codename = params.codename as string;
//   const [roms, setRoms] = useState<ROM[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   useEffect(() => {
//     const fetchRoms = async () => {
//       try {
//         const response = await fetch(`/api/roms?deviceCodename=${codename}`);
//         if (!response.ok) throw new Error('Failed to fetch ROMs');
//         const data = await response.json();
//         setRoms(data.roms);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to load ROMs');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRoms();
//   }, [codename]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center">
//           <Spinner size='3'/>
//           </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center mt-8 text-red-500">
//         Error: {error}
//       </div>
//     );
//   }

//   const formatDate = (timestamp: number) => {
//     return new Date(timestamp).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };
  
//   const formatRomNameForUrl = (name: string): string => {
//     return name.toLowerCase().replace(/\s+/g, '-');
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-[1000px]">
//       <Link 
//         href="/products"
//         className="flex items-center hover:opacity-80  transition-all duration-300 mb-4"
//       >
//       <ChevronLeft/>  Back to Device List
//       </Link>

//       <h1 className="text-3xl font-bold mb-6">Available ROMs for {codename}</h1>

//       {roms.length === 0 ? (
//         <p className="text-center text-gray-400">No ROMs available for this device yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {roms.map(rom => (

// <Card key={rom.id} className="overflow-hidden">
//   <CardContent>
//   <div >
//     <LazyImage src={rom.logoUrl} alt={rom.name}  />
//     <CardTitle>{`${rom.name} ${rom.version}`}</CardTitle>
//     <CardDescription>Updated: {formatDate(rom.updatedAt)}</CardDescription>
//     <Link href={`/products/${codename}/${formatRomNameForUrl(rom.name)}`}>
//       <Button color="primary" className="mt-4 w-full">
//         View Downloads
//       </Button>
//     </Link>
//   </div>
//   </CardContent>
// </Card>

//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ROMListingPage;










// app/products/[codename]/page.tsx
'use client'
import React, { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Spinner } from '@radix-ui/themes';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import useSWRInfinite from 'swr/infinite';

interface ROM {
  id: string;
  name: string;
  version: string;
  deviceCodename: string;
  logoUrl: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}

interface APIResponse {
  roms: ROM[];
  hasMore: boolean;
  lastUpdated: number;
}

const ITEMS_PER_PAGE = 9;
const IMAGE_BATCH_SIZE = 3;

// Optimized image component with intersection observer
const LazyImage = React.memo(({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="relative h-[300px]">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {inView && (
        <Image
          fill
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`object-cover rounded-xl transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

// ROM Card component with memoization
const ROMCard = React.memo(({ rom }: { rom: ROM }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRomNameForUrl = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <Card className="overflow-hidden">
      <CardContent>
        <div>
          <LazyImage src={rom.logoUrl} alt={rom.name} />
          <CardTitle>{`${rom.name} ${rom.version}`}</CardTitle>
          <CardDescription>Updated: {formatDate(rom.updatedAt)}</CardDescription>
          <Link href={`/products/${rom.deviceCodename}/${formatRomNameForUrl(rom.name)}`}>
            <Button className="mt-4 w-full">
              View Downloads
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
});

ROMCard.displayName = 'ROMCard';

const ROMListingPage = () => {
  const params = useParams();
  const codename = params.codename as string;
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // SWR fetcher with error handling
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch ROMs');
    return res.json();
  };

  // Get key for SWR infinite loading
  const getKey = (pageIndex: number, previousPageData: APIResponse | null) => {
    if (previousPageData && !previousPageData.hasMore) return null;

    if (pageIndex === 0) {
      return `/api/roms?deviceCodename=${codename}&page=0`;
    }

    return `/api/roms?deviceCodename=${codename}&page=${pageIndex}&lastTimestamp=${previousPageData?.lastUpdated}`;
  };

  // Setup SWR infinite
  const { data, error, size, setSize, isValidating } = useSWRInfinite<APIResponse>(
    getKey,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 300000, // 5 minutes
      persistSize: true,
    }
  );

  // Infinite scroll setup
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  // Handle infinite scroll
  React.useEffect(() => {
    const isReachingEnd = data?.slice(-1)[0]?.hasMore === false;
    const isRefreshing = isValidating && data && data.length === size;

    if (inView && !isReachingEnd && !isRefreshing && !isLoadingMore) {
      setIsLoadingMore(true);
      setSize(size + 1).then(() => {
        setIsLoadingMore(false);
      });
    }
  }, [inView, isValidating, data, size, setSize]);

  // Flatten all ROMs data
  const allRoms = React.useMemo(() => {
    return data ? data.flatMap(page => page.roms) : [];
  }, [data]);

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        Error loading ROMs. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1000px]">
      <Link 
        href="/products"
        className="flex items-center hover:opacity-80 transition-all duration-300 mb-4"
      >
        <ChevronLeft /> Back to Device List
      </Link>

      <h1 className="text-3xl font-bold mb-6">Available ROMs for {codename}</h1>

      {!data && !error ? (
        <div className="flex justify-center">
          <Spinner size="3" />
        </div>
      ) : allRoms.length === 0 ? (
        <p className="text-center text-gray-400">No ROMs available for this device yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allRoms.map(rom => (
              <ROMCard key={rom.id} rom={rom} />
            ))}
          </div>

          {(isValidating || isLoadingMore) && (
            <div className="flex justify-center mt-8">
              <Spinner size="3" />
            </div>
          )}

          <div ref={loadMoreRef} className="h-10" />
        </>
      )}
    </div>
  );
};

export default ROMListingPage;
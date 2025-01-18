

// 'use client'

// // app/products/[codename]/page.tsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { Card, Button, Spinner, Image } from '@nextui-org/react';


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
//     <div className="relative w-full h-48">
//       {!loaded && (
//         <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-t-3xl rounded-b">
//           <Spinner/>
//         </div>
//       )}
//       <Image
//             isBlurred
//         width={200}
//         src={src}
//         alt={alt}
//         loading="lazy"
//         onLoad={() => setLoaded(true)}
//         className={` object-cover  transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
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
//           <Spinner/>
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
//     <div className="container mx-auto px-4 py-8">
//       <Link 
//         href="/products"
//         className="flex items-center text-gray-100 active:scale-95 transition-all duration-500 mb-4"
//       >
//         Back to Device List
//       </Link>

//       <h1 className="text-3xl font-bold mb-6">Available ROMs for {codename}</h1>

//       {roms.length === 0 ? (
//         <p className="text-center text-gray-400">No ROMs available for this device yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {roms.map(rom => (
//             <Card  key={rom.id} className=" overflow-hidden">
//               <div className="p-4 relative">
//                 <LazyImage src={rom.logoUrl} alt={rom.name} />
//                 <h2 className="text-xl font-semibold m-3">{rom.name} {rom.version}</h2>
//                 <div className="m-3 space-y-2">
//                   <p>Updated: {formatDate(rom.updatedAt)}</p>
//                   {/* <p>Created by: {rom.createdBy}</p> */}
//                 </div>
//               <Link   href={`/products/${codename}/${formatRomNameForUrl(rom.name)}`}
//               >
//               <Button
//                 color='primary'
//                 variant='flat'
//   className='float-end'
// >
//   View Downloads
// </Button>
// </Link>
//               </div>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ROMListingPage;














'use client'

// app/products/[codename]/page.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import  {Spinner}  from '@radix-ui/themes';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';


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

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div className="relative ">
      {!loaded && (
        <div className="relative inset-0 flex items-center justify-center">
          <Spinner/>
        </div>
      )}
      <Image
      height={300}
        width={300}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`object-cover w-full my-4 max-w-[300px] h-full max-w-[300px]  rounded-xl  transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

const ROMListingPage = () => {
  const params = useParams();
  const codename = params.codename as string;
  const [roms, setRoms] = useState<ROM[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRoms = async () => {
      try {
        const response = await fetch(`/api/roms?deviceCodename=${codename}`);
        if (!response.ok) throw new Error('Failed to fetch ROMs');
        const data = await response.json();
        setRoms(data.roms);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load ROMs');
      } finally {
        setLoading(false);
      }
    };

    fetchRoms();
  }, [codename]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
          <Spinner size='3'/>
          </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        Error: {error}
      </div>
    );
  }

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
    <div className="container mx-auto px-4 py-8 max-w-[1000px]">
      <Link 
        href="/products"
        className="flex items-center hover:opacity-80  transition-all duration-300 mb-4"
      >
      <ChevronLeft/>  Back to Device List
      </Link>

      <h1 className="text-3xl font-bold mb-6">Available ROMs for {codename}</h1>

      {roms.length === 0 ? (
        <p className="text-center text-gray-400">No ROMs available for this device yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roms.map(rom => (

<Card key={rom.id} className="overflow-hidden">
  <CardContent>
  <div >
    <LazyImage src={rom.logoUrl} alt={rom.name}  />
    <CardTitle>{`${rom.name} ${rom.version}`}</CardTitle>
    <CardDescription>Updated: {formatDate(rom.updatedAt)}</CardDescription>
    <Link href={`/products/${codename}/${formatRomNameForUrl(rom.name)}`}>
      <Button color="primary" className="mt-4 w-full">
        View Downloads
      </Button>
    </Link>
  </div>
  </CardContent>
</Card>

          ))}
        </div>
      )}
    </div>
  );
};

export default ROMListingPage;


// 'use client'
// import { useState, useEffect, useMemo } from 'react';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { Spinner } from '@radix-ui/themes';
// import { DeviceCard } from './DeviceCard';
// import { BuildCard } from './BuildCard';
// import { parseRichTextContent } from '@/utils/richTextParser';
// import type { Build, Device, ROM } from '@/types/rom';
// import { ChevronLeft } from 'lucide-react';

// // Helper function to format ROM name for URL
// const formatRomNameForUrl = (name: string) => {
//   return name.toLowerCase().replace(/\s+/g, '-');
// };

// export default function ROMBuildsPage() {
//   const params = useParams<{ codename: string; romName?: string; }>();
//   const { codename, romName } = params || {};

//   const [builds, setBuilds] = useState<Build[]>([]);
//   const [device, setDevice] = useState<Device | null>(null);
//   const [romVersion, setRomVersion] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   // Pre-parse content for each build's custom fields
//   const parsedCustomFields = useMemo(() => {
//     return builds.map(build => {
//       if (!build.customFields) return {};
      
//       const parsed: Record<string, ReturnType<typeof parseRichTextContent>> = {};
//       Object.entries(build.customFields).forEach(([key, content]) => {
//         parsed[key] = parseRichTextContent(content);
//       });
//       return parsed;
//     });
//   }, [builds]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const romsResponse = await fetch(`/api/roms?deviceCodename=${codename}`);
//         if (!romsResponse.ok) throw new Error('Failed to fetch ROM data');
//         const romsData = await romsResponse.json();

//         if (!romName) throw new Error('ROM name is missing');

//         // Remove version from URL to match ROM name
//         const romNameWithoutVersion = romName.split('-v')[0];
        
//         const rom = romsData.roms.find((r: ROM) =>
//           formatRomNameForUrl(r.name) === romNameWithoutVersion
//         );

//         if (!rom) throw new Error('ROM not found');

//         const version = rom.version;
//         if (!version) throw new Error('ROM version is missing');
//         setRomVersion(version);

//         const buildsResponse = await fetch(`/api/builds?deviceCodename=${codename}&romId=${rom.id}`);
//         if (!buildsResponse.ok) throw new Error('Failed to fetch builds');
//         const buildsData = await buildsResponse.json();

//         const { builds, device } = buildsData;
//         setBuilds(builds);
//         setDevice(device);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [codename, romName]);

//   const formatDate = (timestamp: number) => {
//     return new Date(timestamp).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center">
//         <Spinner size="3" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center mt-8">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto max-w-[1000px]">
//       <div className="flex flex-col space-y-4 mb-8">
//         <Link href="/products" className="hover:opacity-80 transition-all duration-300 w-fit flex items-center">
//           <ChevronLeft /> Back to Device List
//         </Link>
//         <Link href={`/products/${codename}`} className="hover:opacity-80 transition-all duration-300 w-fit flex items-center">
//           <ChevronLeft /> Back to ROMs List
//         </Link>
//       </div>

//       {device && (
//         <DeviceCard
//           device={device}
//           romName={romName || ''}
//           romVersion={romVersion}
//           imageLoaded={imageLoaded}
//           onImageLoad={() => setImageLoaded(true)}
//         />
//       )}

//       {builds.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-gray-400">No builds available for this ROM yet.</p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {builds.map((build, buildIndex) => (
//             <BuildCard
//               key={build.id}
//               build={build}
//               parsedCustomFields={parsedCustomFields[buildIndex]}
//               formatDate={formatDate}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }








// ROMBuildsPage.tsx
'use client'
import { useState, useEffect, useMemo, useCallback, useTransition } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Spinner } from '@radix-ui/themes';
import { DeviceCard } from './DeviceCard';
import { BuildCard } from './BuildCard';
import { parseRichTextContent } from '@/utils/richTextParser';
import type { Build, Device, ROM } from '@/types/rom';
import { ChevronLeft } from 'lucide-react';

// Add request deduplication
const requestCache = new Map();

const fetchWithCache = async (url: string) => {
  if (requestCache.has(url)) {
    return requestCache.get(url);
  }

  const promise = fetch(url).then(async (res) => {
    const data = await res.json();
    // Cache expires after 5 minutes
    setTimeout(() => requestCache.delete(url), 5 * 60 * 1000);
    return data;
  });

  requestCache.set(url, promise);
  return promise;
};

// Helper function to format ROM name for URL
const formatRomNameForUrl = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

export default function ROMBuildsPage() {
  const params = useParams<{ codename: string; romName?: string; }>();
  const { codename, romName } = params || {};

  const [builds, setBuilds] = useState<Build[]>([]);
  const [device, setDevice] = useState<Device | null>(null);
  const [romVersion, setRomVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Memoize parsed custom fields
  const parsedCustomFields = useMemo(() => {
    return builds.reduce((acc, build, index) => {
      if (!build.customFields) return acc;
      
      acc[index] = Object.entries(build.customFields).reduce((fields, [key, content]) => {
        fields[key] = parseRichTextContent(content);
        return fields;
      }, {} as Record<string, ReturnType<typeof parseRichTextContent>>);
      
      return acc;
    }, {} as Record<number, Record<string, ReturnType<typeof parseRichTextContent>>>);
  }, [builds]);

  // Memoize date formatter
  const formatDate = useCallback((timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First fetch ROMs data
        const romsData = await fetchWithCache(`/api/roms?deviceCodename=${codename}`);
        
        if (!romName) throw new Error('ROM name is missing');

        // Remove version from URL to match ROM name
        const romNameWithoutVersion = romName.split('-v')[0];
        
        const rom = romsData.roms.find((r: ROM) =>
          formatRomNameForUrl(r.name) === romNameWithoutVersion
        );

        if (!rom) throw new Error('ROM not found');

        // Set ROM version
        if (rom.version) {
          setRomVersion(rom.version);
        }

        // Now fetch builds with the correct ROM ID
        const buildsData = await fetchWithCache(`/api/builds?deviceCodename=${codename}&romId=${rom.id}`);

        startTransition(() => {
          if (buildsData.builds && buildsData.device) {
            setBuilds(buildsData.builds);
            setDevice(buildsData.device);
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    if (codename && romName) {
      fetchData();
    }
  }, [codename, romName]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner size="3" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1000px]">
      <div className="flex flex-col space-y-4 mb-8">
        <Link href="/products" className="hover:opacity-80 transition-all duration-300 w-fit flex items-center">
          <ChevronLeft /> Back to Device List
        </Link>
        <Link href={`/products/${codename}`} className="hover:opacity-80 transition-all duration-300 w-fit flex items-center">
          <ChevronLeft /> Back to ROMs List
        </Link>
      </div>

      {device && (
        <DeviceCard
          device={device}
          romName={romName || ''}
          romVersion={romVersion}
          imageLoaded={imageLoaded}
          onImageLoad={() => setImageLoaded(true)}
        />
      )}

      {builds.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No builds available for this ROM yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {builds.map((build, buildIndex) => (
            <BuildCard
              key={build.id}
              build={build}
              parsedCustomFields={parsedCustomFields[buildIndex] || {}}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
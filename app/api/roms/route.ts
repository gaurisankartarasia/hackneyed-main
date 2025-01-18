// // src/app/api/roms/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { adminDb } from '../..//lib/firebaseAdmin';



// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const deviceCodename = searchParams.get('deviceCodename');

//     if (!deviceCodename) {
//       return NextResponse.json(
//         { error: 'Device codename is required' },
//         { status: 400 }
//       );
//     }

//     const romsSnapshot = await adminDb
//       .collection('devices')
//       .doc(deviceCodename)
//       .collection('roms')
//       .orderBy('createdAt', 'desc')
//       .get();

//     const roms = romsSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));

//     return NextResponse.json({ roms });
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }




// src/app/api/roms/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../lib/firebaseAdmin';

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
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// In-memory cache
let cache: { [key: string]: { data: APIResponse; timestamp: number } } = {};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceCodename = searchParams.get('deviceCodename');
    const page = parseInt(searchParams.get('page') || '0');
    const lastTimestamp = searchParams.get('lastTimestamp');

    if (!deviceCodename) {
      return NextResponse.json(
        { error: 'Device codename is required' },
        { status: 400 }
      );
    }

    const cacheKey = `${deviceCodename}-${page}`;
    const now = Date.now();

    // Check cache first
    if (cache[cacheKey] && (now - cache[cacheKey].timestamp) < CACHE_DURATION) {
      return NextResponse.json(cache[cacheKey].data);
    }

    // Build query
    let query = adminDb
      .collection('devices')
      .doc(deviceCodename)
      .collection('roms')
      .orderBy('updatedAt', 'desc')
      .limit(ITEMS_PER_PAGE);

    // Add cursor if paginating
    if (lastTimestamp) {
      query = query.startAfter(parseInt(lastTimestamp));
    }

    // Execute query
    const romsSnapshot = await query.get();

    // Transform data
    const roms = romsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ROM[];

    const response: APIResponse = {
      roms,
      hasMore: roms.length === ITEMS_PER_PAGE,
      lastUpdated: now
    };

    // Update cache
    cache[cacheKey] = {
      data: response,
      timestamp: now
    };

    // Clean up old cache entries
    Object.keys(cache).forEach(key => {
      if (now - cache[key].timestamp > CACHE_DURATION) {
        delete cache[key];
      }
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
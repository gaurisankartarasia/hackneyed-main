// import {  NextResponse } from 'next/server';
// import { adminDb } from '../../lib/firebaseAdmin';



// export async function GET() {
//   try {
//     const devicesSnapshot = await adminDb.collection('devices').get();
//     const devices = devicesSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));

//     return NextResponse.json({ devices });
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }







// app/api/devices/route.ts
import { NextResponse } from 'next/server';
import { adminDb } from '../../lib/firebaseAdmin';
import { cache } from 'react';

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Cache structure
let deviceCache: {
  data: any[] | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};

// Cached fetch function
const fetchDevices = cache(async () => {
  try {
    // Check if cache is valid
    const now = Date.now();
    if (deviceCache.data && (now - deviceCache.timestamp) < CACHE_DURATION) {
      return deviceCache.data;
    }

    // Batch read with pagination (if needed)
    const BATCH_SIZE = 50;
    const devices: any[] = [];
    
    let lastDoc = null;
    let query = adminDb.collection('devices').orderBy('updatedAt', 'desc').limit(BATCH_SIZE);

    do {
      if (lastDoc) {
        query = query.startAfter(lastDoc);
      }
      
      const snapshot = await query.get();
      const batch = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      devices.push(...batch);
      lastDoc = snapshot.docs[snapshot.docs.length - 1];
      
      if (snapshot.docs.length < BATCH_SIZE) break;
    } while (lastDoc);

    // Update cache
    deviceCache = {
      data: devices,
      timestamp: now
    };

    return devices;
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw error;
  }
});

export async function GET() {
  try {
    const devices = await fetchDevices();
    return NextResponse.json({ devices });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// // src/app/api/rom-builds/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { adminDb } from '../../lib/firebaseAdmin';

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const deviceCodename = searchParams.get('deviceCodename');
//     const romId = searchParams.get('romId');

//     if (!deviceCodename || !romId) {
//       return NextResponse.json({ error: 'Device codename and ROM ID are required' }, { status: 400 });
//     }

//     const deviceDoc = await adminDb.collection('devices').doc(deviceCodename).get();
//     const deviceData = deviceDoc.data();

//     if (!deviceData) {
//       return NextResponse.json({ error: 'Device not found' }, { status: 404 });
//     }

//     const buildsSnapshot = await adminDb.collection('devices')
//       .doc(deviceCodename)
//       .collection('roms')
//       .doc(romId)
//       .collection('builds')
//       .orderBy('createdAt', 'desc')
//       .get();

//     const builds = buildsSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));

//     return NextResponse.json({ device: deviceData, builds });
//   } catch (error) {
//     console.error('Error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }







// src/app/api/rom-builds/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../../lib/firebaseAdmin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceCodename = searchParams.get('deviceCodename');
    const romId = searchParams.get('romId');

    if (!deviceCodename || !romId) {
      return NextResponse.json({ error: 'Device codename and ROM ID are required' }, { status: 400 });
    }

    // Perform parallel fetching of device data and builds
    const [deviceDoc, buildsSnapshot] = await Promise.all([
      adminDb.collection('devices').doc(deviceCodename).get(),
      adminDb.collection('devices')
        .doc(deviceCodename)
        .collection('roms')
        .doc(romId)
        .collection('builds')
        .orderBy('createdAt', 'desc')
        .limit(10) // Limit initial fetch to improve performance
        .get()
    ]);

    const deviceData = deviceDoc.data();

    if (!deviceData) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 });
    }

    const builds = buildsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Cache the response for 5 minutes
    return new NextResponse(JSON.stringify({ device: deviceData, builds }), {
      headers: {
        'Cache-Control': 'public, max-age=300',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

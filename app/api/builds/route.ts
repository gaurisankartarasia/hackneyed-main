
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

    const deviceDoc = await adminDb.collection('devices').doc(deviceCodename).get();
    const deviceData = deviceDoc.data();

    if (!deviceData) {
      return NextResponse.json({ error: 'Device not found' }, { status: 404 });
    }

    const buildsSnapshot = await adminDb.collection('devices')
      .doc(deviceCodename)
      .collection('roms')
      .doc(romId)
      .collection('builds')
      .orderBy('createdAt', 'desc')
      .get();

    const builds = buildsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ device: deviceData, builds });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}








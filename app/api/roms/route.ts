// src/app/api/roms/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '../..//lib/firebaseAdmin';



export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceCodename = searchParams.get('deviceCodename');

    if (!deviceCodename) {
      return NextResponse.json(
        { error: 'Device codename is required' },
        { status: 400 }
      );
    }

    const romsSnapshot = await adminDb
      .collection('devices')
      .doc(deviceCodename)
      .collection('roms')
      .orderBy('createdAt', 'desc')
      .get();

    const roms = romsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ roms });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
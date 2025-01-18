import {  NextResponse } from 'next/server';
import { adminDb } from '../../lib/firebaseAdmin';



export async function GET() {
  try {
    const devicesSnapshot = await adminDb.collection('devices').get();
    const devices = devicesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ devices });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
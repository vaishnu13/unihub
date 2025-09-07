import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/firebase/adminApp';

export async function DELETE(
  request: Request,
  { params }: { params: { uid: string } }
) {
  const uid = params.uid
  try {
    // Delete user from Firebase Authentication
    await adminAuth.deleteUser(uid);
    
    // Delete user data from Firestore
    await adminDb.collection('users').doc(uid).delete();

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error(`Failed to delete user ${uid}:`, error);
    return new NextResponse(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
}

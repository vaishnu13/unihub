import { NextResponse } from 'next/server';
import { adminAuth } from '@/firebase/adminApp';

export async function DELETE(
  request: Request,
  { params }: { params: { uid: string } }
) {
  const uid = params.uid
  try {
    await adminAuth.deleteUser(uid);
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

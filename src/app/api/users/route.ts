import { NextResponse } from 'next/server';
import { adminAuth } from '@/firebase/adminApp';

export async function GET() {
  try {
    const listUsersResult = await adminAuth.listUsers();
    const users = listUsersResult.users.map(user => user.toJSON());
    return NextResponse.json({ users });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

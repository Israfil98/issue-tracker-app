import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// technically we don't need the request parameter here, we add it only to prevent Next caching
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });

  return NextResponse.json(users);
}

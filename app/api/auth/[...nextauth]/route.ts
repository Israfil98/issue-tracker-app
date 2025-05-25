import autOptions from '@/app/auth/authOptions';
import NextAuth from 'next-auth';

const handler = NextAuth(autOptions);

export { handler as GET, handler as POST };

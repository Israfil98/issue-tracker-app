'use client';

import { Box } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data } = useSession();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'>
        <AiFillBug />
      </Link>
      <ul className='flex space-x-6'>
        {links.map((link) => {
          return (
            <li key={link.href}>
              <Link
                className={classNames({
                  'text-zinc-900': currentPath === link.href,
                  'text-zinc-500': currentPath !== link.href,
                  'hover:text-zinc-800 transition-colors': true,
                })}
                href={link.href}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <Box>
        {status === 'authenticated' && (
          <Link href='/api/auth/signout'>Log Out</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href='/api/auth/signin'>Log In</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;

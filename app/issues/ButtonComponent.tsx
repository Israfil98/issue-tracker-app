'use client';

import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const ButtonComponent = ({ href, label }: { href: string; label: string }) => {
  return (
    <Button>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default ButtonComponent;

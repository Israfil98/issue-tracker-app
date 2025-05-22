'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

const DeleteButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color='red'>
      <TrashIcon />
      Delete Issue
    </Button>
  );
};

export default DeleteButton;

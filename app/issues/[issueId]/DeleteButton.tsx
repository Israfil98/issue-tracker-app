'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>
          <TrashIcon />
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth='500px'>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description size='3'>
          Are you sure you want to delete this issue? This action is permanent
          and cannot be undone.
        </AlertDialog.Description>
        <Flex
          mt='3'
          gap='3'
          justify='end'>
          <AlertDialog.Cancel>
            <Button
              variant='soft'
              color='gray'>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              color='red'
              onClick={async () => {
                await axios.delete('/api/issues/' + issueId);
                router.push('/issues');
                router.refresh();
              }}>
              <TrashIcon />
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteButton;

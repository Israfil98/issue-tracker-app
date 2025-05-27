'use client';

import SkeletonComponent from '@/app/components/SkeletonComponent';
import { Issue, User } from '@prisma/client';
import { Avatar, Flex, Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <SkeletonComponent />;

  if (error) return null;

  const assignUserId = (userId: string) => {
    axios
      .patch('/api/issues/' + issue.id, {
        assignedToUserId: userId === 'unassign' ? null : userId,
      })
      .then(() => toast.success('Successfully assigned!'))
      .catch(() => toast.error('Changes could not be saved.'));
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'unassign'}
        onValueChange={assignUserId}>
        <Select.Trigger
          placeholder='Assign...'
          radius='large'
        />
        <Select.Content
          color='violet'
          position='popper'>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value='unassign'>Unassigned</Select.Item>
            {users?.map((user) => {
              return (
                <Select.Item
                  key={user.id}
                  value={user.id}>
                  <Flex justify='between'>
                    <Flex
                      align='center'
                      gap='3'>
                      {user.image && (
                        <Avatar
                          size='1'
                          radius='full'
                          src={user.image}
                          fallback={user.name!}
                        />
                      )}
                      <Text>{user.name}</Text>
                    </Flex>
                  </Flex>
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

export default AssigneeSelect;

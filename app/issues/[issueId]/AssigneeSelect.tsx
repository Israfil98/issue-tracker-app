'use client';

import SkeletonComponent from '@/app/components/SkeletonComponent';
import { User } from '@prisma/client';
import { Avatar, Flex, Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AssigneeSelect = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  if (isLoading) return <SkeletonComponent />;

  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger
        placeholder='Assign...'
        variant='soft'
        radius='large'
      />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
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
  );
};

export default AssigneeSelect;

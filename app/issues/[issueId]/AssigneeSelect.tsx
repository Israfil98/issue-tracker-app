'use client';

import { User } from '@prisma/client';
import { Avatar, Flex, Select, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: users } = await axios.get<User[]>('/api/users');

      setUsers(users);
    };

    fetchUsers();
  }, []);

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
          {users.map((user) => {
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

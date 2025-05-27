'use client';

import { Status } from '@prisma/client';
import { Flex, Select, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'In progress', value: 'IN_PROGRESS' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get('orderBy');
  const currentStatus = searchParams.get('status');

  const selectFilter = (status: string) => {
    const params = new URLSearchParams();
    let query;

    if (orderBy) params.append('orderBy', orderBy);

    if (status) {
      if (status === 'ALL') {
        query = '' + '?' + params.toString();
        router.push('/issues/list' + query);
        return;
      }

      params.append('status', status);
    }

    query = params.size ? '?' + params.toString() : '';
    router.push('/issues/list' + query);
  };

  return (
    <Flex
      align='center'
      gap='3'>
      <Text>Filter</Text>
      <Select.Root
        defaultValue={currentStatus || 'ALL'}
        onValueChange={selectFilter}>
        <Select.Trigger
          radius='large'
          color='violet'
        />
        <Select.Content
          color='violet'
          position='popper'>
          {statuses.map((status) => {
            return (
              <Select.Item
                key={status.value}
                value={status.value}>
                {status.label}
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default IssueStatusFilter;

'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

const statuses: { label: string; value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'In progress', value: 'IN_PROGRESS' },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger
        placeholder='Filter by status...'
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
  );
};

export default IssueStatusFilter;

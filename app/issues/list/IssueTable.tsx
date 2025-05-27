import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Flex, Table, Text } from '@radix-ui/themes';
import { default as Link, default as NextLink } from 'next/link';

export interface IssueQueryParams {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: Promise<IssueQueryParams>;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {tableColumns.map(async (col) => {
            return (
              <Table.ColumnHeaderCell
                key={col.value}
                className={col.className}>
                <NextLink
                  href={{
                    query: { ...(await searchParams), orderBy: col.value },
                  }}>
                  <Flex
                    align='center'
                    gap='1'>
                    <Text>{col.label}</Text>
                    {col.value === (await searchParams).orderBy && (
                      <ArrowUpIcon />
                    )}
                  </Flex>
                </NextLink>
              </Table.ColumnHeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue) => {
          return (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link
                  className='text-violet-500 hover:underline hover:text-violet-900'
                  href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

interface TableColumn {
  label: string;
  value: keyof Issue;
  className?: string;
}

const tableColumns: TableColumn[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

export const tableColumnsValue = tableColumns.map((col) => col.value);

export default IssueTable;

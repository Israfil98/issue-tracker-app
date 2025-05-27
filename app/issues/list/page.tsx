import autOptions from '@/app/auth/authOptions';
import Pagination from '@/app/components/Pagination';
import { prisma } from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Flex, Table, Text } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { default as Link, default as NextLink } from 'next/link';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import IssueToolbar from './IssueToolbar';

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue; page: string }>;
}

interface TableColumn {
  label: string;
  value: keyof Issue;
  className?: string;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const tableColumns: TableColumn[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  const session = await getServerSession(autOptions);

  const status = (await searchParams).status;
  const statuses = Object.values(Status);
  const currentFilterStatus = statuses.includes(status) ? status : undefined;

  const orderBy = (await searchParams).orderBy;
  const currentOrderBy = tableColumns.map((col) => col.value).includes(orderBy)
    ? { [orderBy]: 'asc' }
    : undefined;

  const page = parseInt((await searchParams).page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status: currentFilterStatus,
    },
    orderBy: currentOrderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status: currentFilterStatus },
  });

  return (
    <div>
      {session && <IssueToolbar />}
      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
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
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;

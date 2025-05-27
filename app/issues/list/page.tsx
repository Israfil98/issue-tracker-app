import autOptions from '@/app/auth/authOptions';
import { prisma } from '@/prisma/client';
import { Status } from '@prisma/client';
import { Table } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import IssueToolbar from './IssueToolbar';

interface Props {
  searchParams: Promise<{ status: Status }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(autOptions);

  const status = (await searchParams).status;

  const statuses = Object.values(Status);

  const currentFilterStatus = statuses.includes(status) ? status : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: currentFilterStatus,
    },
  });

  return (
    <div>
      {session && <IssueToolbar />}

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created
            </Table.ColumnHeaderCell>
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

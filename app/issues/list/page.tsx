import autOptions from '@/app/auth/authOptions';
import Pagination from '@/app/components/Pagination';
import { prisma } from '@/prisma/client';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import IssueTable, { IssueQueryParams, tableColumnsValue } from './IssueTable';
import IssueToolbar from './IssueToolbar';

interface Props {
  searchParams: Promise<IssueQueryParams>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(autOptions);

  const status = (await searchParams).status;
  const statuses = Object.values(Status);
  const currentFilterStatus = statuses.includes(status) ? status : undefined;

  const orderBy = (await searchParams).orderBy;
  const currentOrderBy = tableColumnsValue.includes(orderBy)
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
    <Flex
      direction='column'
      gap='4'>
      {session && <IssueToolbar />}
      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
      <IssueTable
        searchParams={searchParams}
        issues={issues}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;

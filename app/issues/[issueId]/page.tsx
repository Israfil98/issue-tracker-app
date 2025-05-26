import autOptions from '@/app/auth/authOptions';
import { prisma } from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import AssigneeSelect from './AssigneeSelect';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import IssueDetails from './IssueDetails';
interface Props {
  params: Promise<{ issueId: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(autOptions);

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt((await params).issueId),
    },
  });

  if (!issue) notFound();

  return (
    <Grid
      columns={{ initial: '1', sm: '5' }}
      gap='4'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex
            direction='column'
            gap='3'>
            <AssigneeSelect issue={issue} />
            <EditButton issueId={issue.id} />
            <DeleteButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

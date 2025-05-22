import { prisma } from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import IssueDetails from './IssueDetails';
interface Props {
  params: Promise<{ issueId: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
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
      <Box>
        <Flex
          direction='column'
          gap='3'>
          <EditButton issueId={issue.id} />
          <DeleteButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;

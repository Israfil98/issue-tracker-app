import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { prisma } from '@/prisma/client';
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import EditButton from './EditButton';
interface Props {
  params: { issueId: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.issueId),
    },
  });

  if (!issue) notFound();

  return (
    <Grid
      columns={{ initial: '1', md: '2' }}
      gap='5'>
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex
          gap='5'
          my='3'
          align='center'>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card
          className='prose'
          mt='5'>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <EditButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;

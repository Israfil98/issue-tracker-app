import SkeletonComponent from '@/app/components/SkeletonComponent';
import { Box, Card, Flex } from '@radix-ui/themes';

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <SkeletonComponent />
      <Flex
        gap='5'
        my='3'
        align='center'>
        <SkeletonComponent width='5rem' />
        <SkeletonComponent width='8rem' />
      </Flex>
      <Card
        className='prose'
        mt='5'>
        <SkeletonComponent count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;

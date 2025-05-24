import SkeletonComponent from '@/app/components/SkeletonComponent';
import { Box } from '@radix-ui/themes';

const IssueFormSkeleton = () => {
  return (
    <Box className='max-w-xl'>
      <SkeletonComponent height='2rem' />
      <SkeletonComponent height='20rem' />
    </Box>
  );
};

export default IssueFormSkeleton;

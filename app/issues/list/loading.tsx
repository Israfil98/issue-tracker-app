import SkeletonComponent from '@/app/components/SkeletonComponent';
import { Table } from '@radix-ui/themes';
import IssueToolbar from './IssueToolbar';

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <div>
      <IssueToolbar />

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
              <Table.Row key={issue}>
                <Table.Cell>
                  <SkeletonComponent />
                  <div className='block md:hidden'>
                    <SkeletonComponent />
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <SkeletonComponent />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <SkeletonComponent />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuesPage;

import Pagination from './components/Pagination';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const currentPage = parseInt((await searchParams).page);

  return (
    <Pagination
      itemCount={100}
      pageSize={10}
      currentPage={currentPage}
    />
  );
}

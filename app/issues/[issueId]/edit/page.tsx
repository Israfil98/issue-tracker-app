import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';

interface Props {
  params: { issueId: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.issueId) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;

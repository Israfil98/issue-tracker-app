import { prisma } from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueFormWrapper from '../../_components/IssueFormWrapper';

interface Props {
  params: Promise<{ issueId: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt((await params).issueId) },
  });

  if (!issue) notFound();

  return <IssueFormWrapper issue={issue} />;
};

export default EditIssuePage;

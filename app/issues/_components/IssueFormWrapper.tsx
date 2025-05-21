'use client';

import { Issue } from '@prisma/client'; // или ваш тип
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './IssueFormSkeleton';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  issue: Issue;
}

export default function IssueFormWrapper({ issue }: Props) {
  return <IssueForm issue={issue} />;
}

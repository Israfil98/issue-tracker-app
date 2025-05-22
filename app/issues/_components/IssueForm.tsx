'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdError } from 'react-icons/md';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFromData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFromData>({
    resolver: zodResolver(issueSchema),
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmitHandler = async (data: IssueFromData) => {
    try {
      setSubmitting(true);

      if (issue) {
        await axios.patch('/api/issues/' + issue.id, data);
      } else {
        await axios.post('/api/issues', data);
      }

      router.push('/issues/list');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className='max-w-xl'>
      {errorMessage && (
        <Callout.Root
          className='mb-5'
          color='red'>
          <Callout.Icon>
            <MdError />
          </Callout.Icon>
          <Callout.Text>{errorMessage}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder='Title'
          {...register('title')}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE
              placeholder='Description'
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              Processing <Spinner />
            </>
          ) : (
            <>{issue ? 'Update Issue' : 'Submit New Issue'}</>
          )}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;

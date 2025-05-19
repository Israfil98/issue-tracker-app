'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { MdError } from 'react-icons/md';
import SimpleMDE from 'react-simplemde-editor';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmitHandler = async (data: IssueForm) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
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
          placeholder='Title'
          {...register('title')}
        />
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder='Description'
              {...field}
            />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;

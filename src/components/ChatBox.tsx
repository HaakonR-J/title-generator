import { Button, Card, Paper, Stack, TextField, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type ChatBoxProps = {
  onSubmit: (chatInput: string) => void;
};

type FormValues = {
  chatInput: string;
};

const ChatBox: FC<ChatBoxProps> = ({ onSubmit }) => {
  const { register, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      chatInput: ''
    }
  });

  const chatInput = watch('chatInput');

  const onFormSubmit = (formValues: FormValues) => {
    onSubmit(formValues.chatInput);
  };

  return (
    <Paper variant='outlined' sx={{ p: 4 }}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Stack gap={2} flex={1}>
          <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant='h6'>Chat</Typography>
            <Button disabled={chatInput?.length < 5} type='submit' variant='contained'>
              Submit
            </Button>
          </Stack>
          <Stack direction={'row'} gap={2}>
            <TextField
              label={'Write on me'}
              multiline
              fullWidth
              {...register('chatInput')}
              required
            />
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};

export default ChatBox;

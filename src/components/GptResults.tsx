import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useGptResults } from '../context/GptResultContext';
import GptResponse from './GptResponse';

const GptResults: FC = () => {
  const { gptResults } = useGptResults();

  return (
    <Stack gap={2}>
      {gptResults.map((result, resultIndex) => {
        return (
          <Stack key={result.id} gap={2}>
            <Typography>{resultIndex + 1}</Typography>
            {result.responses.map((response, index) => {
              return <GptResponse key={index} gptResponse={response} />;
            })}
          </Stack>
        );
      })}
      {gptResults.length === 0 && <Box>No results</Box>}
    </Stack>
  );
};

export default GptResults;

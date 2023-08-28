import { FC } from 'react';
import { Chip, Paper, Stack, Typography } from '@mui/material';

type GptSeoResultsProps = {
  gptResult: GptResult;
};

const GptSeoResults: FC<GptSeoResultsProps> = ({ gptResult }) => {
  const responses = gptResult?.responses?.map((response, responseIndex) => {
    const responseText = response.text;

    const parsedTags = responseText.split(',');

    return (
      <Paper key={responseIndex} sx={{ p: 4 }}>
        <Stack gap={1} direction={'row'} flexWrap={'wrap'}>
          {parsedTags.map((tag, index) => (
            <Chip key={responseIndex.toString() + index.toString()} label={tag} />
          ))}
        </Stack>
      </Paper>
    );
  });
  return (
    <Paper
      sx={{
        p: 4
      }}
      variant='outlined'
    >
      <Stack gap={2}>
        <Typography variant='h6'>Seo tags</Typography>
        {gptResult && (
          <>
            <Stack gap={2}>{responses}</Stack>
          </>
        )}
        {!responses && <Typography variant='body1'>Send in a text to generate seo tags</Typography>}
      </Stack>
    </Paper>
  );
};

export default GptSeoResults;

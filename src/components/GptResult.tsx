import { FC, useEffect, useState } from 'react';
import GptResponse from './GptResponse';
import { IconButton, Paper, Stack, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import openAiService from '../services/openAi.service';
import { cloneDeep } from 'lodash';

type GptResultProps = {
  gptResult: GptResult;
};

const GptResult: FC<GptResultProps> = ({ gptResult: gptResultProp }) => {
  const [gptResult, setGptResult] = useState<GptResult>();

  useEffect(() => {
    setGptResult(gptResultProp);
  }, []);

  const increaseTitleLength = async (responseIndex: number) => {
    try {
      const title = gptResult.responses[responseIndex].text;

      const { data } = await openAiService.increaseTitleLength(title);
      const { choices } = data;

      const gptResultTemp = cloneDeep(gptResult);

      gptResultTemp.responses[responseIndex] = {
        role: choices[0].message.role,
        text: choices[0].message.content
      };

      setGptResult(gptResultTemp);
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseTitleLength = async (responseIndex: number) => {
    try {
      const title = gptResult.responses[responseIndex].text;

      const { data } = await openAiService.decreaseTitleLength(title);

      const { choices } = data;

      const gptResultTemp = cloneDeep(gptResult);

      gptResultTemp.responses[responseIndex] = {
        role: choices[0].message.role,
        text: choices[0].message.content
      };

      setGptResult(gptResultTemp);
    } catch (error) {
      console.log(error);
    }
  };

  const responses = gptResult?.responses?.map((response, index) => {
    return (
      <Paper key={index} sx={{ p: 4 }}>
        <Stack direction={'row'} gap={2}>
          <GptResponse gptResponse={response} />
          <Stack gap={2}>
            <IconButton onClick={() => increaseTitleLength(index)}>
              <Add />
            </IconButton>
            <IconButton onClick={() => decreaseTitleLength(index)}>
              <Remove />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    );
  });

  return (
    <Paper sx={{ p: 4 }} variant='outlined'>
      <Stack gap={2}>
        <Typography variant='h6'>Titles</Typography>
        {gptResult && (
          <>
            <Stack gap={2}>{responses}</Stack>
          </>
        )}
        {!responses && <Typography variant='body1'>Send in a text to generate titles</Typography>}
      </Stack>
    </Paper>
  );
};

export default GptResult;

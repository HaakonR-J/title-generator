import { FC } from 'react';

type GptResponseProps = {
  gptResponse: GptResponse;
};

const GptResponse: FC<GptResponseProps> = ({ gptResponse }) => {
  return <div>{gptResponse.text}</div>;
};

export default GptResponse;

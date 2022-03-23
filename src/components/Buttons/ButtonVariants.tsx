import styled from 'styled-components/native';

interface Props {
  color: string;
}

export const SolidButton = styled.View`
  overflow: hidden;
  border-radius: 50px;
  width: 300px;
  height: 50px;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: red;
`;

import styled from 'styled-components/native';

export const Container = styled.View``;
export const Points = styled.View`
  margin: 10px 30px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const Point = styled.View`
  height: 12px;
  width: 12px;
  border-radius: 6px;
  border: 2px solid #7d40e7;
  background: ${(props: { finished?: boolean }) =>
    props.finished ? '#7d40e7' : '#fff'};
`;
export const Line = styled.View`
  border: 1px solid #7d40e7;
  height: 1px;
  flex: 1;
`;
export const Labels = styled.View`
  margin: 0;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.Text`
  text-align: center;
  width: 80px;
  color: #999;
  font-size: 12px;
`;

import styled from 'styled-components';

export const Container = styled.div`
  background-color: #95c2de;
  height: 100vh;
  display: flex;
`;

export const MainBox = styled.div`
  background-color: #95c2de;
  margin: auto;
  height: 600px;
  width: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MsgErr = styled.div`
  color: #ffffff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 11rem;
`;

export const Msg = styled.div`
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.6rem;
  a {
    text-decoration: none;
    color: white;
  }
  a:hover {
    text-decoration: underline;
  }
`;

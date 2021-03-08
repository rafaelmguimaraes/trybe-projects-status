import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container, MainBox, MsgErr, Msg,
} from './styles';

function NotFound() {
  return (
    <Container>
      <MainBox>
        <MsgErr>404</MsgErr>
        <Msg>
          Maybe this page moved? Got deleted? Is hiding out in quarantine?
          Never existed in the first place?
          <p>
            Let&apos;s go
            {' '}
            <Link to="/">home</Link>
            {' '}
            and try from there.
          </p>
        </Msg>
      </MainBox>
    </Container>
  );
}

export default NotFound;

import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  LinearProgress } from '@material-ui/core';
import AppContext from '../../context/AppContext';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function GridStatus() {
  const { analyzedPulls, analyzing } = useContext(AppContext);
  const [pulls, setPulls] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    console.log('analyzedPulls:', analyzedPulls);
    if (Object.prototype.hasOwnProperty.call(analyzedPulls, 'pullsAnalyzed')) {
      setPulls(analyzedPulls.pullsAnalyzed);
    }
  }, [analyzedPulls]);

  return (
    <div>
      { analyzing
        ? (<LinearProgress />)
        : (
          <TableContainer component={ Paper }>
            <Toolbar>

              <Typography color="inherit" variant="subtitle1" component="div">
                {`Total: ${analyzedPulls.totalPulls} | 
          Sufficient: ${analyzedPulls.totalSufficient} | 
          Insufficient: ${analyzedPulls.totalInsufficient} | 
          Not Analyzed:  ${analyzedPulls.totalNotAnalyzed}`}
              </Typography>

            </Toolbar>
            <Table className={ classes.table } aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>GitHub User</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Ev. Required</TableCell>
                  <TableCell align="right">Ev. Total</TableCell>
                  <TableCell align="right">When</TableCell>
                  <TableCell align="right">Pull Request</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pulls && pulls.map((pull) => (
                  <TableRow key={ pull.number }>
                    <TableCell component="th" scope="row">
                      <a href={ pull.userUrl }>
                        <Avatar alt={ pull.login } src={ pull.userAvatar } />
                        {pull.login}
                      </a>
                    </TableCell>
                    <TableCell align="right">{pull.result}</TableCell>
                    <TableCell align="right">{pull.bestReqEvaluation}</TableCell>
                    <TableCell align="right">{pull.bestTotalEvaluation}</TableCell>
                    <TableCell align="right">{pull.when}</TableCell>
                    <TableCell align="right">
                      <a href={ pull.link }>{pull.title}</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
    </div>
  );
}

export default GridStatus;

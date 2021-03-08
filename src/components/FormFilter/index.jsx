import React, { useState, useEffect, useContext } from 'react';

import {
  Paper,
  Typography,
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button } from '@material-ui/core';

import {
  getAllTeams,
  getAllReposByTeam,
  getAllPullsByRepo,
} from '../../services/githubAPI';

import AppContext from '../../context/AppContext';
import analyzePulls from '../../services/helper';

import useStyles from './styles';

function FormFilter() {
  const classes = useStyles();
  const { setAnalyzedPulls, setAnalyzing } = useContext(AppContext);

  // For Select Team
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teams, setTeams] = useState([]);

  // For Select Repo / Project
  const [isLoadingRepo, setIsLoadingRepo] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      setIsLoadingTeam(true);
      setTeams(await getAllTeams());
      setIsLoadingTeam(false);
    };
    getTeams();
  }, []);

  useEffect(() => {
    const getRepos = async () => {
      setIsLoadingRepo(true);
      setRepos(await getAllReposByTeam(selectedTeam));
      setIsLoadingRepo(false);
    };
    if (selectedTeam) {
      getRepos();
    }
  }, [selectedTeam]);

  const handleChangeTeam = ({ target: { value } }) => {
    setSelectedTeam(value);
    if (!value) {
      setSelectedRepo('');
      setRepos([]);
    }
  };

  const handleChangeRepo = ({ target: { value } }) => {
    setSelectedRepo(value);
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    const pulls = await getAllPullsByRepo(selectedRepo);
    setAnalyzedPulls(await analyzePulls(selectedTeam, pulls));
    setAnalyzing(false);
  };

  return (
    <Paper className={ classes.paper }>
      <Typography component="h1" variant="h4" align="center">
        Trybe Project Status
      </Typography>
      <FormGroup>
        <FormControl className={ classes.formControl }>
          <InputLabel id="label_team">Team</InputLabel>
          <Select
            labelId="label_team"
            id="select_team"
            value={ selectedTeam }
            onChange={ handleChangeTeam }
          >
            <MenuItem value="">
              <em>{isLoadingTeam ? 'Loading...' : 'None'}</em>
            </MenuItem>
            {teams.length && teams.map((team) => (
              <MenuItem key={ team.id } value={ team.name }>{team.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Please choose a Team to load Projects.</FormHelperText>
        </FormControl>
        <FormControl
          className={ classes.formControl }
          disabled={ selectedTeam === '' }
        >
          <InputLabel id="label_project">Project</InputLabel>
          <Select
            labelId="label_project"
            id="select_project"
            value={ selectedRepo }
            onChange={ handleChangeRepo }
          >
            <MenuItem value="">
              <em>{isLoadingRepo ? 'Loading...' : 'None'}</em>
            </MenuItem>
            {repos.length && repos.map((repo) => (
              <MenuItem key={ repo.id } value={ repo.name }>{repo.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Please choose a Project to Analyze Results. </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={ handleAnalyze }
          className={ classes.button }
          disabled={ selectedRepo === '' }
        >
          Analyze Results
        </Button>
      </FormGroup>
    </Paper>
  );
}

export default FormFilter;

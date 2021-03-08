import {
  getAllCommentsByPull,
} from './githubAPI';

const resultComment = (commentBody) => {
  const regexEvaluation = /Desempenho\s\|\s(.*?)\sCritério/;
  const regexReqPerc = /requisitos obrigatórios\s\|\s(.*?)%\sPercentual/;
  const regexTotalPerc = /requisitos totais\s\|\s(.*?)%\s###/;

  const evaluation = commentBody.match(regexEvaluation)[1];
  const reqPerc = commentBody.match(regexReqPerc)[1];
  const totalPerc = commentBody.match(regexTotalPerc)[1];
  return {
    evaluation,
    reqPerc,
    totalPerc,
    text: `Resultado: Desempenho: ${evaluation}
  Percentual Obrigatório: ${reqPerc}
  Percentual Total: ${totalPerc}`,
  };
};

const analyzePull = async (team, pull) => {
  const comments = await getAllCommentsByPull(pull.base.repo.name, pull.number);

  let pullSufficient = false;
  let pullIsAnalyzed = false;
  let maxEvaluation = 0;
  let maxReqPerc = 0;
  let when = '';

  for (let index = 0; index < comments.length; index += 1) {
    if (comments[index].user.login === 'trybe-evaluation-feedback[bot]') {
      pullIsAnalyzed = true;
      const result = resultComment(comments[index].body);
      if (result.evaluation === 'Suficiente') {
        pullSufficient = true;
      }
      if ((!pullSufficient && Number(result.totalPerc) > maxEvaluation)
      || (result.evaluation === 'Suficiente' && Number(result.totalPerc) > maxEvaluation)) {
        maxEvaluation = Number(result.totalPerc);
        maxReqPerc = Number(result.reqPerc);
        when = comments[index].created_at;
      }
    }
  }

  return {
    login: pull.user.login,
    userUrl: pull.user.html_url,
    userAvatar: pull.user.avatar_url,
    link: pull.html_url,
    number: pull.number,
    title: pull.title,
    isAnalyzed: pullIsAnalyzed,
    result: pullSufficient ? 'Suficiente' : 'Insuficiente',
    bestTotalEvaluation: maxEvaluation,
    bestReqEvaluation: maxReqPerc,
    when,
  };
};

const analyzePulls = async (team, pulls) => {
  let totalSufficient = 0;
  let totalInsufficient = 0;
  let totalNotAnalyzed = 0;
  const pullsAnalyzed = [];

  const promises = pulls.map((pull) => analyzePull(team, pull));
  await Promise.all(promises).then((results) => {
    results.forEach((anlyzedPull) => {
      if (anlyzedPull.isAnalyzed) {
        if (anlyzedPull.result === 'Suficiente') {
          totalSufficient += 1;
        } else {
          totalInsufficient += 1;
        }
      } else {
        totalNotAnalyzed += 1;
      }
      pullsAnalyzed.push(anlyzedPull);
    });
  });

  return {
    totalSufficient,
    totalInsufficient,
    totalNotAnalyzed,
    totalPulls: pulls.length,
    pullsAnalyzed: [...pullsAnalyzed],
  };
};

export default analyzePulls;

import _ from 'lodash';

const calculateScore = (userAnswer) => {
  let score = 0;
  userAnswer.forEach((answer) => {
    switch (answer.type) {
      case 'yesNo':
        if (answer.userSelection === 'yes' && answer.answer === 'true') {
          score++;
        }
        if (answer.userSelection === 'no' && answer.answer === 'false') {
          score++;
        }
        return;
      case 'quiz':
        if (answer.userSelection === answer.options[Number(answer.answer)]) {
          score++;
        }
        return;
      case 'multipleChoice':
        if (
          (_.isEqual(answer.userSelection.split(' ').sort()), answer.answer)
        ) {
          console.log(answer);
          score++;
        }
        return;
      default:
        return;
    }
  });
  return score;
};

export default calculateScore;

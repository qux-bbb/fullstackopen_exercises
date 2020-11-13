interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const calculateExercises = (target: number, exerciseTimes: Array<number>): Result => {
  const periodLength = exerciseTimes.length;
  const trainingDays = exerciseTimes.filter(time => time > 0).length;
  const average = exerciseTimes.reduce((a, b) => a + b) / exerciseTimes.length;
  let rating = 0;
  let ratingDescription = '';
  switch (true) {
    case average>3:
      rating = 3;
      ratingDescription = 'good'
      break;
    case average>1.5:
      rating = 2;
      ratingDescription = 'not too bad but could be better'
      break;
    default:
      rating = 1;
      ratingDescription = 'bad'
      break;
  }
  let success = false;
  if (rating > target)
    success = true;
  return { 
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
};

console.log(calculateExercises(2, [3,0,2,4.5,0,3,1]));
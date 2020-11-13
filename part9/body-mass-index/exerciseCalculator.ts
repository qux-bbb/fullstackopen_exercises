interface Result { 
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ArgValues {
  target: number;
  exerciseTimes: Array<number>;
}

const parseArguments2 = (args: Array<string>): ArgValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  args.slice(2).forEach(arg => {
    if (isNaN(Number(arg)))
      throw new Error('Provided values were not numbers!');
  });

  return {
    target: Number(args[2]),
    exerciseTimes: args.slice(3).map(arg => Number(arg))
  };
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
      ratingDescription = 'good';
      break;
    case average>1.5:
      rating = 2;
      ratingDescription = 'not too bad but could be better';
      break;
    default:
      rating = 1;
      ratingDescription = 'bad';
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
  };
};

try {
  const { target, exerciseTimes } = parseArguments2(process.argv);
  console.log(calculateExercises(target, exerciseTimes));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
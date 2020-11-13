interface MultiplyValues {
  height: number;
  mass: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, mass: number): string => {
  if (height === 0) throw new Error('height can not be 0')
  const hightByM: number = height / 100;
  const bmi: number = mass / (hightByM * hightByM);
  switch (true) {
    case bmi>40:
      return 'Obese Class III (Very severely obese)';
    case bmi>35:
      return 'Obese Class II (Severely obese)';
    case bmi>30:
      return 'Obese Class I (Moderately obese)';
    case bmi>25:
      return 'Overweight';
    case bmi>18.5:
      return 'Normal (healthy weight)';
    case bmi>16:
      return 'Underweight';
    case bmi>15:
      return 'Severely underweight';
    default:
      return 'Very severely underweight';
  }
  
};

try {
  const { height, mass } = parseArguments(process.argv);
  console.log(calculateBmi(height, mass));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
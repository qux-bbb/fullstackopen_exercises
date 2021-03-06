export const calculateBmi = (height: number, mass: number): string => {
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
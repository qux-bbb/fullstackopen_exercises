import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

const checkQuery = (query: any): boolean => {
  if (!query.height || !query.weight) 
    return false;
  if (isNaN(Number(query.height)) || isNaN(Number(query.weight)))
    return false;
  if (query.height === 0)
    return false;
  return true;
};

const checkParams = (body: any): boolean => {
  if (isNaN(Number(body.target)))
    return false;
  if (Object.prototype.toString.call(body.daily_exercises) !== '[object Array]')
    return false;
  for (let index = 0; index < body.daily_exercises.length; index++) {
    const exerciseTime = body.daily_exercises[index];
    if (isNaN(Number(exerciseTime)))
      return false;
  }
  return true;
}

app.get('/Hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (checkQuery(req.query)) {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi: string = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  } else {
    res.json({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req, res) => {
  const body = req.body;
  if (!body.target || !body.daily_exercises)
    return res.status(400).json({ error: "parameters missing" });
  if (checkParams(body))
    return res.json(calculateExercises(body.target, body.daily_exercises));
  else
    return res.status(400).json({ error: "malformatted parameters" });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
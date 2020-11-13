import express from 'express';
import { calculateBmi } from "./bmiCalculator";

const app = express();

const checkQuery = (query: any): boolean => {
  if (!query.height || !query.weight) 
    return false
  if (isNaN(Number(query.height)) || isNaN(Number(query.weight)))
    return false
  if (query.height === 0)
    return false
  return true
}

app.get('/Hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (checkQuery(req.query)) {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);
    const bmi: string = calculateBmi(height, weight);
    res.json({ weight, height, bmi })
  } else {
    res.json({ error: "malformatted parameters" });
  }
});



const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
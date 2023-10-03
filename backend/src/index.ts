import express from 'express';
import fs from 'fs';
import csv from 'csv-parser';

const app = express();
const port = 3003;

app.get('/', (req, res) => {
  const results: any[] = [];
  
  fs.createReadStream('src/Melbourne_Temperature.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

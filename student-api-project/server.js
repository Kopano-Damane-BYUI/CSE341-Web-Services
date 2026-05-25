require('dotenv').config();

const express = require('express');
const mongodb = require('./data/database');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/students', require('./routes/students'));
app.use('/courses', require('./routes/courses'));

app.get('/', (req, res) => {
  res.send('Student API');
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo').default || require('connect-mongo');

const mongodb = require('./data/database');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const passport = require('./config/passport');

const app = express();
const port = process.env.PORT || 3000;

/*
========================
MIDDLEWARE
========================
*/
app.use(express.json());
app.use(cors());

/*
========================
SESSION + OAUTH
========================
*/
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

/*
========================
SWAGGER
========================
*/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*
========================
ROUTES
========================
*/
app.use('/auth', require('./routes/auth'));
app.use('/students', require('./routes/students'));
app.use('/courses', require('./routes/courses'));

/*
========================
HOME ROUTE
========================
*/
app.get('/', (req, res) => {
  res.send('Student API');
});

/*
========================
DATABASE + SERVER START
========================
*/
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
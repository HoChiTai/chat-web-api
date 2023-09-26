const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3003;

const routes = require('./routes');

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Add logger
app.use(morgan('combined'));

// Route
routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

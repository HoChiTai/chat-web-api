import express from 'express';
import morgan from 'morgan';
import routes from './routes';

const app = express();
const port = 3003;

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

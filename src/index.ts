import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';

const app = express();
const port = 8321;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Add logger
app.use(morgan('combined'));

// CORS
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

// Route
routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

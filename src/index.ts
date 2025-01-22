import { AppDataSource } from './data-source.js';
import { MovieReloadData } from './config/reload.movie.js';
import express, { urlencoded, json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// feature
import movieRouter from './movie/router/movie.router.js';

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const app = express();
const movieReloadData = new MovieReloadData();

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(morgan(':date[iso] | :method | :url | :status | :res[content-length] - :response-time ms'));

// default route
app.get('/', (req, res) => {
    let message = 'Hello, ';
    if (process.env.NODE_ENV === 'dev') {
        message = message.concat(' Development Environment');
    }
    if (process.env.NODE_ENV === 'prod') {
        message = message.concat(' Production Environment');
    }
    if (process.env.NODE_ENV === 'qa') {
        message = message.concat(' Test Environment');
    }
    res.json({ msg: message });
});

// movie route
app.use('/api/v1/movie', movieRouter);

AppDataSource.initialize()
    .then(async () => {
        console.log('Database connected');
        await movieReloadData.loadData();
        app.listen(PORT, () => {
            console.log(`Server running at http://${HOST}:${PORT}`);
        });
    })
    .catch((error) => console.log(error));

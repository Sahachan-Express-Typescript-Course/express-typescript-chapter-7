import { Router } from 'express';
import { MovieController } from '../controller/movie.controller.js';

const movieRouter = Router();
const movieController = new MovieController();

// movie feature
movieRouter.get('/', movieController.getAllMovies);
movieRouter.get('/:id', movieController.getMovieById);
movieRouter.post('/', movieController.createMovie);
movieRouter.put('/:id', movieController.updateMovie);
movieRouter.delete('/:id', movieController.deleteMovie);

// comment feature
movieRouter.post('/:id/comment', movieController.addComment);
movieRouter.get('/:id/comment/:comment_id', movieController.getCommentById);
movieRouter.put('/:id/comment/:comment_id', movieController.updateComment);
movieRouter.delete('/:id/comment/:comment_id', movieController.deleteComment);

// advance feature
movieRouter.get('/:id/avg', movieController.getAvgRating);
movieRouter.get('/summary/comment', movieController.getTotalCommentFromEachMovie);
movieRouter.get('/summary/rating', movieController.getMovieRateSummary);
movieRouter.get('/summary/search', movieController.searchMovie);

export default movieRouter;

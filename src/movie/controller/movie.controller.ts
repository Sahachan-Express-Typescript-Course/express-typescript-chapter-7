import { Request, Response } from 'express';
import { MovieService } from '../service/movie.service.js';

export class MovieController {
    private readonly movieService: MovieService;

    constructor() {
        this.movieService = new MovieService(); // Create the service once
    }

    createMovie = async (req: Request, res: Response): Promise<void> => {
        const movie = await this.movieService.saveMovie(req.body);
        res.status(201).json(movie);
    };

    getAllMovies = async (req: Request, res: Response): Promise<void> => {
        const movies = await this.movieService.getMovies();
        res.status(200).json(movies);
    };

    getMovieById = async (req: Request, res: Response): Promise<void> => {
        const movie = await this.movieService.getMovieById(req.params.id);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        res.status(200).json(movie);
    };

    updateMovie = async (req: Request, res: Response): Promise<void> => {
        const movie = await this.movieService.updateMovie(req.params.id, req.body);
        res.status(200).json(movie);
    };

    deleteMovie = async (req: Request, res: Response): Promise<void> => {
        await this.movieService.deleteMovie(req.params.id);
        res.status(200).json({ message: `Movie id: ${req.params.id} deleted` });
    };

    // comment feature

    addComment = async (req: Request, res: Response): Promise<void> => {
        const comment = await this.movieService.addComment(req.params.id, req.body);
        res.status(201).json(comment);
    };

    getCommentById = async (req: Request, res: Response): Promise<void> => {
        const comment = await this.movieService.getCommentById(req.params.comment_id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        res.status(200).json(comment);
    };

    updateComment = async (req: Request, res: Response): Promise<void> => {
        const comment = await this.movieService.updateComment(req.params.comment_id, req.body);
        res.status(200).json(comment);
    };

    deleteComment = async (req: Request, res: Response): Promise<void> => {
        await this.movieService.deleteComment(req.params.comment_id);
        res.status(200).json({ message: `Comment id: ${req.params.comment_id} deleted` });
    };

    // advance api
    getAvgRating = async (req: Request, res: Response): Promise<void> => {
        const avgRating = await this.movieService.getAvgRatingByMovieId(req.params.id);
        res.status(200).json({ rating: avgRating });
    };

    getTotalCommentFromEachMovie = async (req: Request, res: Response): Promise<void> => {
        const totalComment = await this.movieService.getTotalCommentFromEachMovie();
        res.status(200).json(totalComment);
    };

    getMovieRateSummary = async (req: Request, res: Response): Promise<void> => {
        const movieRateSummary = await this.movieService.getMoviesWithRatingsAndGrades();
        res.status(200).json(movieRateSummary);
    };

    searchMovie = async (req: Request, res: Response): Promise<void> => {
        const q = req.query.q as string;
        const rate = req.query.rate as string;
        const orderBy = req.query.order_by as 'ASC' | 'DESC';
        const rateNumber = rate ? parseFloat(rate) : undefined;
        const movies = await this.movieService.searchMoviesWithDynamicConditions(q, rateNumber, orderBy);
        res.status(200).json(movies);
    };
}

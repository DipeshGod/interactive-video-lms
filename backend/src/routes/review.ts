import { Router } from "express";
import { CreateReviewController } from "../controllers/review/CreateReviewController";
import { GetReviewController } from "../controllers/review/GetReviewController";
import { Review } from "../models/Review";
import { ReviewRepository } from "../repositories/ReviewRepository";
import { authentication } from "../middleware/authenticate";

const router = Router();

const reviewRepository = new ReviewRepository(Review);

router.post('/', authentication, (req, res) =>
    new CreateReviewController(reviewRepository).execute(req, res)
);

//course id
router.get('/:id', (req, res) =>
    new GetReviewController(reviewRepository).execute(req, res)
);

export { router as reviewRouter };
import Review from "../models/Reviews.js";

//get allReviews
export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};
//get Review by id
export const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};
//update Review by id
export const updateReviewById = async (req, res, next) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};
//delete Review by id
export const deleteReview = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json("The review has been successfully deleted");
  } catch (error) {
    next(error);
  }
};
//Create new Review
export const createReview = async (req, res, next) => {
  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    next(error);
  }
};
// Count Review
export const countReviews = async (req, res, next) => {
  try {
    const totalReviews = await Review.countDocuments();
    res.status(200).json(totalReviews);
  } catch (error) {
    next(error);
  }
};

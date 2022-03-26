import React, { useContext, useReducer } from "react";

const reviewList = [
  {
    userId:"user-1",
    giftId:"product-1",
    userName:"RAM",
    reviewText:"This is really a nice product... Loved it !!!",
    reviewId:"pro",
  },
  {
    userId:"user-2",
    giftId:"product-2",
    userName:"KUMAR",
    reviewText:"Its Very beautiful !!!!",
    reviewId:"pro",
  }
];

const ReviewCxt = React.createContext({
  reviewList: [],
  addReview: () => {},
  editReview: () => {},
  deleteReview: () => {},
});

const reviewReducer = (state, action) => {
  let updatedReviewList;
  switch (action.type) {
    case "GET_REVIEWS":
      updatedReviewList = [...action.value];
      return updatedReviewList;
    case "ADD_REVIEW":
      updatedReviewList = [...state, { ...action.value }];
      return updatedReviewList;
    case "EDIT_REVIEW":
      const exsistedReview = state.find((item) => {
        return action.value.reviewId === item.reviewId;
      });
      const index = state.indexOf(exsistedReview);
      updatedReviewList = [...state];
      updatedReviewList[index] = { ...action.value };
      return updatedReviewList;
    case "DELETE_REVIEW":
      updatedReviewList = state.filter((item) => {
        return action.value !== item.reviewId;
      });
      return updatedReviewList;
    default:
      return state;
  }
};

export const ReviewContextProvider = (props) => {
  const [reviewsList, reviewDispatchFn] = useReducer(reviewReducer, reviewList);

  const addReviewDataHandler = (review, data) => {
    reviewDispatchFn({ type: "ADD_REVIEW", value: review });
  };

  const addReview = (review) => {
    addReviewDataHandler(review);
  };

  const editReviewDataHandler = (newReview, data) => {
    reviewDispatchFn({ type: "EDIT_REVIEW", value: newReview });
  };

  const editReview = (newReview) => {
    editReviewDataHandler(newReview);
  };

  const deleteReviewDataHandler = (reviewId, data) => {
    reviewDispatchFn({ type: "DELETE_REVIEW", value: reviewId });
  };

  const deleteReview = (reviewId) => {
   deleteReviewDataHandler(reviewId);
  };

  return (
    <ReviewCxt.Provider
      value={{
        reviewList: reviewsList,
        addReview: addReview,
        editReview: editReview,
        deleteReview: deleteReview,
      }}
    >
      {props.children}
    </ReviewCxt.Provider>
  );
};

export const useReviewCxt = () => {
  return useContext(ReviewCxt);
};

export default ReviewCxt;
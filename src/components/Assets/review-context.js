import React, { useContext, useReducer, useEffect } from "react";

// const reviewList = [
//   {
//     userId:"user-1",
//     giftId:"product-1",
//     userName:"RAM",
//     reviewText:"This is really a nice product... Loved it !!!",
//     reviewId:"pro",
//   },
//   {
//     userId:"user-2",
//     giftId:"product-2",
//     userName:"KUMAR",
//     reviewText:"Its Very beautiful !!!!",
//     reviewId:"pro",
//   }
// ];

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
      const newReview = action.value;

      //------------------
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newReview),
      };
      fetch("https://evfmjj-8000.csb.app/reviewsadd", options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
      //------------------

      updatedReviewList = [...state, { ...action.value }];
      return updatedReviewList;
    case "EDIT_REVIEW":
      const exsistedReview = state.find((item) => {
        return action.value.reviewId === item.reviewId;
      });

      //------------------
      const options2 = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(action.value),
      };
      fetch("https://evfmjj-8000.csb.app/reviewsupdate", options2)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
      //-----------------

      const index = state.indexOf(exsistedReview);
      updatedReviewList = [...state];
      updatedReviewList[index] = { ...action.value };
      return updatedReviewList;
    case "DELETE_REVIEW":
      const newRev = { reviewId: action.value };
      //------------------
      const options3 = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newRev),
      };
      fetch("https://evfmjj-8000.csb.app/reviewsdelete", options3)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
      //-----------------

      updatedReviewList = state.filter((item) => {
        return action.value !== item.reviewId;
      });
      return updatedReviewList;
    default:
      return state;
  }
};

export const ReviewContextProvider = (props) => {
  useEffect(() => {
    fetch("https://evfmjj-8000.csb.app/reviews") // Replace with your API URL
      .then((response) => response.json())
      .then((data) => {
        reviewDispatchFn({ type: "GET_REVIEWS", value: data });
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);
  const [reviewsList, reviewDispatchFn] = useReducer(reviewReducer, []);

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

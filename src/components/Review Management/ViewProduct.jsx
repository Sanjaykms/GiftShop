import { useState } from "react";
import classes from "./ViewProduct.module.css";
import ReviewsList from "./ReviewList";
import { MdAddBox, MdUpload } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsCxt } from "../Assets/products-context";

import useGenerateId from "../../Hooks/generate-id";
//import useHttp from "../../../hooks/use-http";

import { useReviewCxt } from "../Assets/review-context";
import { useCartCxt } from "../Assets/cart-context";
import { useAuthCxt } from "../Assets/auth-context";
import { useUserCxt } from "../Assets/user-context";

const ViewProduct = () => {
  const [reviewItem, setReviewItem] = useState({});
  const [reviewText, setReviewText] = useState("");
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const productsCxt = useProductsCxt();
  const cartCxt = useCartCxt();
  const authCxt = useAuthCxt();
  const userCxt = useUserCxt();
  const reviewCxt = useReviewCxt();
  const generateId = useGenerateId();

  const { productId } = params;
  const { productsList } = productsCxt;
  const { cartItems } = cartCxt;

  const product = productsList.find((item) => {
    return productId === item.giftId;
  });

  const changeHandler = (event) => {
    setReviewText(event.target.value);
  };

  const editReviewHandler = (reviewItem) => {
    setIsEditBtnClicked(true);
    setReviewText(reviewItem.reviewText);
    setReviewItem(reviewItem);
  };

  const updateReviewHandler = () => {
    const newReview = { ...reviewItem };
    newReview.reviewText = reviewText;
    reviewCxt.editReview(newReview);
    setReviewItem({});
    setReviewText("");
    setIsEditBtnClicked(false);
  };

  const addReviewHandler = () => {
    if(reviewText===""){
      return;
    }
    const user = userCxt.usersList.find((user) => {
      return user.userId === authCxt.userInfo.userId;
    });
    const review = {
      reviewId: generateId("REVIEW"),
      userId: authCxt.userInfo.userId,
      giftId: productId,
      userName: user.userName,
      reviewText: reviewText,
    };
    reviewCxt.addReview(review);
    setReviewText("");
  };

  const closeViewProduct = () => {
    navigate("/Homepage");
  };

  const cartDataHandle = (cartItem, data) => {
    cartCxt.cartDispatchFn({ type: "ADD_TO_CART", value: cartItem });
  };

  const addToCartHandler = () => {
    if (cartItems.length < 5) {
      const exsistedProduct = cartItems.find((item) => {
        return product.giftId === item.giftId;
      });
      const index = cartItems.indexOf(exsistedProduct);
      if (index >= 0) {
        alert("Product already in cart");
      } else {
        const cartItem = {
          cartItemId: generateId("CART"),
          userId: authCxt.userInfo.userId,
          giftId: product.giftId,
          url:product.url,
          productName: product.productName,
          price: product.price,
          quantity: 1,
        };
        cartDataHandle(cartItem);
      }
    } else {
      alert("Cant't add to cart. Your Cart is full :(");
    }
    closeViewProduct();
  };

  return (
    <div className={classes.container}>
      <header>
        <h1>Gift Info:</h1>
      </header>
      <div className={classes.content}>
        <div className={classes["images-div"]}>
          <img
            className={classes.img}
            src={product.url}
            alt="Acrylic Board"
          />
        </div>
        <div className={classes.details}>
          <div>
            <h3 className={classes.label}>Gift name :</h3>
            <h3>{product.productName}</h3>
          </div>
          <div>
            <h3 className={classes.label}>Price :</h3>
            <h3>${product.price}</h3>
          </div>
          <div>
            <h3 className={classes.label}>Available Quantity :</h3>
            <h3>{product.quantity}</h3>
          </div>
        </div>
      </div>
      <div>
        <div className={classes.reviews}>
          <h1>Reviews:</h1>
          <hr />
          <ReviewsList
            productId={productId}
            editReviewHandler={editReviewHandler}
          />
          <textarea
            className={classes.textarea}
            type="text"
            placeholder="Add Your Review here"
            value={reviewText}
            onChange={changeHandler}
          />
          {!isEditBtnClicked && (
            <MdAddBox onClick={addReviewHandler} className={classes.addIcon} />
          )}
          {isEditBtnClicked && (
            <MdUpload
              className={classes.addIcon}
              onClick={updateReviewHandler}
            />
          )}
        </div>
      </div>
      <div className={classes.footer}>
        <button className={classes.back} onClick={closeViewProduct}>
          Back
        </button>
        <button className={classes.toCart} onClick={addToCartHandler}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
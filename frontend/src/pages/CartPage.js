import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeFromCart } from "../store/cartSlice";
import Loader from "../components/Loader";

function CartPage() {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + (item.product?.discountPrice || item.productId?.discountPrice || 0) * item.quantity;
  }, 0);

  if (loading) return <Loader />;
  if (error) return <h2 className="container">Error: {error}</h2>;

  return (
    <div className="container cart-page">
      <h2 className="section-title">YOUR CART</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => {
            const product = item.product || item.productId;

            return (
              <div className="cart-item" key={item._id}>
                <div>
                  <h3>{product?.name}</h3>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: ${product?.discountPrice}</p>
                </div>

                <button
                  className="shop-btn"
                  onClick={() => dispatch(removeFromCart(item._id))}
                >
                  Remove
                </button>
              </div>
            );
          })}

          <h2 className="cart-total">Total: ${totalPrice}</h2>
        </>
      )}
    </div>
  );
}

export default CartPage;
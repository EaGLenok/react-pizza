import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removePizza, plusPizza, minusPizza } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const CartPizzas = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const removePizzaFn = (id) => {
    return dispatch(removePizza(id));
  };

  const plusPizzaFn = (id) => {
    return dispatch(plusPizza(id));
  };

  const minusPizzaFn = (id) => {
    return dispatch(minusPizza(id));
  };

  return (
    <div className="content__items-cart">
      {cartItems.map((item, index) => (
        <div className="cart__item" key={index}>
          <div className="cart__item-img">
            <img
              className="pizza-block__image"
              src={item.imageUrl}
              alt={item.title}
            />
          </div>
          <div className="cart__item-info">
            <h3>{item.title}</h3>
            <p>
              {item.types}, {item.sizes} см.
            </p>
          </div>
          <div className="cart__item-count">
            <button
              onClick={(index) => minusPizzaFn(item.id)}
              className="button button--outline button--circle cart__item-count-minus"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                  fill="#EB5A1E"
                />
                <path
                  d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                  fill="#EB5A1E"
                />
              </svg>
            </button>
            <b>{item.count}</b>
            <button
              onClick={(index) => plusPizzaFn(item.id)}
              className="button button--outline button--circle cart__item-count-plus"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                  fill="#EB5A1E"
                />
                <path
                  d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                  fill="#EB5A1E"
                />
              </svg>
            </button>
          </div>
          <div className="cart__item-price">
            <b>{item.price} UAH</b>
          </div>
          <div className="cart__item-remove">
            <button
              onClick={(index) => removePizzaFn(item.id)}
              className="button button--outline button--circle"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                  fill="#EB5A1E"
                />
                <path
                  d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                  fill="#EB5A1E"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          {/* Общее количество пицц и общая стоимость */}
          <span>
            Всего пицц:
            <b>{cartItems.reduce((acc, item) => (acc += item.count), 0)} шт.</b>
          </span>
          <span>
            Сумма заказа:
            <b>
              <br />
              {cartItems.reduce(
                (total, item) => (total += item.price * item.count),
                0
              )}
              UAH
            </b>
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <Link
            to="/"
            className="button button--outline button--add go-back-btn"
          >
            <span>Вернуться назад</span>
          </Link>
          <div className="button pay-btn">
            <span>Оплатить сейчас</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPizzas;

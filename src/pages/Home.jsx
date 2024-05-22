import React from "react";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { Link, NavLink } from "react-router-dom";

import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setPageCount } from "../redux/slices/filterSlice";

const Home = () => {
  const searchValue = useSelector((state) => state.pizza.searchValue);
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.pizza);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortTypeR = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.pageCount);

  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  const getPizzas = async () => {
    const order = sortTypeR.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortTypeR.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    try {
      dispatch(
        fetchPizzas({
          order,
          sortBy,
          category,
          currentPage,
        })
      );
    } catch (e) {
      console.error(e);
      alert("Ошибка при получении пицц ");
    }
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortTypeR, currentPage]);

  const pizzas = items
    .filter((obj, index) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((item) => (
        <PizzaBlock key={item.id} {...item} />
    ));
  const skeleton = [...new Array(12)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(categoryId) => dispatch(setCategoryId(categoryId))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading" ? skeleton : pizzas}
      </div>
      <Pagination
        value={currentPage}
        onChangePage={(page) => onChangePage(page)}
      />
    </div>
  );
};

export default Home;

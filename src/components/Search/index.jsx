import React from "react";
import styles from "./Search.module.scss";
import xbtn from "../../assets/img/cross.png";
import lupa from "../../assets/img/lupa.svg";
import debounce from "lodash.debounce";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../../redux/slices/pizzaSlice";

const Search = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.pizza.searchValue);
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearch(""));
    setValue("");
    inputRef.current.focus();
  };

  const debounces = React.useCallback(
    debounce((str) => {
      dispatch(setSearch(str));
    }, 1000),
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    debounces(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <img src={lupa} alt="lupa" className={styles.lupa} />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChangeInput(e)}
        className={styles.root}
        placeholder="Find an pizza..."
      ></input>
      {searchValue && (
        <img
          onClick={onClickClear}
          className={styles.xbtn}
          src={xbtn}
          alt="xbtn"
        />
      )}
    </div>
  );
};

export default Search;

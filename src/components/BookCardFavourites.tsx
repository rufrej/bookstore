import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../hooks/useStore";
import { removeFromTheFavourites } from "../redux/favourites-slice";
import styles from "../styles/book-card.module.scss";
import { Button } from "./Button";

interface IBookCardProps {
  image: string;
  title: string;
  author: string;
  isbn: string;
  price: string;
}

export function BookCardFavourites(props: IBookCardProps) {
  const dispatch = useAppDispatch();

  function handleClickButtonRemove() {
    dispatch(removeFromTheFavourites(props.isbn));
  }
  return (
    <div className={styles.book__card__favourites}>
      <Button
        className={styles.book__card__favourites__button__remove}
        color="red"
        onClick={handleClickButtonRemove}
      >
        X
      </Button>
      <NavLink
        className={styles.book__card__favourites__link}
        to={`/books/${props.isbn}`}
      >
        <img
          className={styles.book__card__favourites__image}
          src={props.image}
          alt="preview"
        />
        <h4 className={styles.book__card__favourites__title}>{props.title}</h4>
        <div>
          <p className={styles.book__card__favourites__author}>
            by <strong>{props.author}</strong>
          </p>
        </div>
        <span className={styles.book__card__favourites__price}>
          {props.price} $
        </span>
      </NavLink>
    </div>
  );
}
import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { FormField } from "./FormField.tsx";
import { FormFieldElement } from "../types/types.ts";
import styles from "../styles/search.module.scss";
import loupe from "../assets/header-icons/search.svg";

export function SearchForm() {
  const { query: queryParam } = useParams();
  const navigate = useNavigate();
  const [query, setQeury] = useState<any>(queryParam);

  const handleChange = ({ target }: React.ChangeEvent<FormFieldElement>) => {
    console.log("search: " + target.value);
    setQeury(target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const encodedQuery = encodeURIComponent(query);
    if (encodedQuery !== "") {
      navigate(`/search/${encodedQuery}/1`);
      setQeury("");
    }
  };

  return (
    <div className={styles.search}>
      <form className={styles.search__form} onSubmit={handleSubmit}>
        <div className={styles.search__form__input__wrapper}>
          <FormField
            name="search"
            type="text"
            value={query}
            placeholder="search..."
            onChange={handleChange}
          />
        </div>

        <button className={styles.search__form__button} type="submit">
          <img src={loupe} alt="" />
        </button>
      </form>
    </div>
  );
}

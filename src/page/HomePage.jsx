import React from "react";
import s from "./container.module.scss";
const HomePage = () => (
  <div className={s.container}>
    <h1>
      Приветственная страница нашего сервиса{" "}
      <span role="img" aria-label="Иконка приветствия">
        💁‍♀️
      </span>
    </h1>
  </div>
);

export default HomePage;

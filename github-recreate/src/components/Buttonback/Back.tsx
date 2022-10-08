import React from "react";
import styles from "./Back.module.scss";

export function Back() {
  return (
    <div
      className={styles["button-back"]}
      onClick={() => {
        history.back();
      }}
    >
      <img src="/src/assets/back.svg" alt="Обратно" />
    </div>
  );
}

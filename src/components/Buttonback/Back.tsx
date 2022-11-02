import React from "react";
import styles from "./Back.module.scss";

export function Back() {
  return (
    <div className={styles["container"]}>
      <div
        className={styles["button-back"]}
        onClick={() => {
          history.back();
        }}
      >
        <img src="/assets/back.svg" alt="Обратно" />
      </div>
      <div
        className={styles["button-back"]}
        onClick={() => {
          history.go(1);
        }}
      >
        <img src="/assets/forward.svg" alt="Вперед" />
      </div>
    </div>
  );
}

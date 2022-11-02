import React from "react";
import styles from "./Back.module.scss";
import back from "../../assets/back.svg";
import forward from "../../assets/forward.svg";
export function Back() {
  return (
    <div className={styles["container"]}>
      <div
        className={styles["button-back"]}
        onClick={() => {
          history.back();
        }}
      >
        <img src={back} alt="Обратно" />
      </div>
      <div
        className={styles["button-back"]}
        onClick={() => {
          history.go(1);
        }}
      >
        <img src={forward} alt="Вперед" />
      </div>
    </div>
  );
}

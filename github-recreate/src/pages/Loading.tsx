import styles from "../styles/loadingWindow.scss";
import React from "react";
export function Loading() {
  return (
    <div className={styles['loading-window']}>
      <h2>Loading...</h2>
    </div>
  );
}

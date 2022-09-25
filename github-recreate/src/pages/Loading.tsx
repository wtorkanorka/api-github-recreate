import styles from "../styles/loadingWindow.scss";
import React from "react";
export function Loading() {
  return (
    // <div className={styles['loading-window']}>
    //   <h2>Loading...</h2>
    // </div>
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(13px)",
        flexDirection: "column",
        color: "black",
        top: "0",
        left: "0",
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
        zIndex: "1000",
      }}
    >
      <h2>Loading...</h2>
    </div>
  );
}

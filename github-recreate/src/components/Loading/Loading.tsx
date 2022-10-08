import styles from "./loadingWindow.module.scss";
import React from "react";
export function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(13px)",
        flexDirection: "column",
        color: "white",

        bottom: "0",
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

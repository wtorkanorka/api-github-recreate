import React from "react";
import styles from "../styles/repo.module.scss";
import { Issue } from "./Issue";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Loading } from "./Loading";

export function Repos(props: any) {
  const [loginIssue, setLoginIssue] = useState("");
  const [repos, setRepos] = useState("");
  console.log(props.repos, "props repos");
  return (
    <div className={styles["container"]}>
      <p>репозитории: {props.login}</p>

      <div className={styles["repositories"]}>
        {props?.repos?.map((i: any, index: number) => {
          return (
            <button
              key={index}
              className={styles["repos-data"]}
              onClick={() => {
                setLoginIssue(props.login);
                setRepos(i.name);
              }}
            >
              {/* <Link to={"/" + i.name + "/issues"}> */}
                <p>Название репозитория: {i.name}</p>
              {/* </Link> */}
              <p>Дата создания: {i.created_at}</p>
              <p>Дата обновления: {i.updated_at}</p>
              <p>id: {i.id}</p>
              <p>Сейчас просматривают: {i.watchers}</p>
            </button>
          );
        })}
      </div>
      {loginIssue !== "" && repos !== "" ? (
        // <Routes>
        //   <Route
        //     path="*/:login/issues"
        //     element={
        <Issue login={loginIssue} repos={repos} />
      ) : (
        //   }
        //   />
        // </Routes>
        <></>
      )}
    </div>
  );
}

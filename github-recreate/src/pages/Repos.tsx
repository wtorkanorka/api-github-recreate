import React from "react";
import styles from "../styles/repo.module.scss";
import { Issue } from "./Issue";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Loading } from "./Loading";
interface Issue {
  name: string;
  created_at: string;
  updated_at: string;
  id: number;
  watchers: string;
}

export function Repos(props: any) {
  const [loginIssue, setLoginIssue] = useState("");
  const [repos, setRepos] = useState("");
  console.log(props.repos, "props repos");
  return (
    <div className={styles["container"]}>
      <p>репозитории: {props.login}</p>

      <div className={styles["repositories"]}>
        {props?.repos?.map((i: Issue, index: number) => {
          console.log(typeof i, "ТИП ISSUE");
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
              <p className={styles['repo-paragraph']}>Название репозитория: {i.name}</p>
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

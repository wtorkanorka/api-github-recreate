import React from "react";
import styles from "./repo.module.scss";
import { Issue } from "../Issue/Issue";
import { useState, useEffect } from "react";

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
  const [visible, setVisible] = useState(true);

  return (
    <div className={styles["container"]}>
      {visible && (
        <p className={styles["repo-paragraph"]}>репозитории: {props.login}</p>
      )}

      <div className={styles["repositories"]}>
        {visible &&
          props?.repos?.map((i: Issue, index: number) => {
            console.log(typeof i, "ТИП ISSUE");
            return (
              <button
                key={index}
                className={styles["repos-data"]}
                onClick={() => {
                  setLoginIssue(props.login);
                  setRepos(i.name);
                  if (visible === true) {
                    setVisible(false);
                  } else {
                    setVisible(true);
                  }
                }}
              >
                <p className={styles["repo-paragraph"]}>
                  Название репозитория: {i.name}
                </p>

                <p>Дата создания: {i.created_at}</p>
                <p>Дата обновления: {i.updated_at}</p>
                <p>id: {i.id}</p>
                <p>Сейчас просматривают: {i.watchers}</p>
              </button>
            );
          })}
      </div>

      {!visible && (
        <img
          src="/src/assets/cross.svg"
          alt="cross"
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: "#776c54",
          }}
          onClick={() => {
            if (visible === true) {
              setVisible(false);
            } else {
              setVisible(true);
            }
          }}
        />
      )}
      {!visible && loginIssue !== "" && repos !== "" ? (
        <Issue login={loginIssue} repos={repos} />
      ) : null}
    </div>
  );
}

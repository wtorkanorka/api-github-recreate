import React, { useEffect, useState } from "react";
import { Api } from "../request/useRequest";
import styles from "../styles/issue.module.scss";

interface Issue {
  title: string;
}

export function Issue(props: any) {
  const [login, setLogin] = useState("");
  const [repos, setRepos] = useState("");
  const [indexIssue, setIndexIssue] = useState(0);
  const [issues, setIssues] = useState([]);

  console.log(props, "ПРОПСЫ В issue");
  useEffect(() => {
    setLogin(props.login);
    setRepos(props.repos);
  });
  useEffect(() => {
    login !== "" && repos !== ""
      ? Api.getIssues(login, repos, setIssues, setRepos, setLogin)
      : null;
  }, [login, repos, indexIssue]);
  console.log(issues, "Выданные иссушку");

  return (
    <div className={styles["issues"]}>
      {login !== "" && repos !== "" ? (
        issues?.map((i: Issue, index) => {
          return (
            <button key={index} onClick={() => setIndexIssue(index + 1)}>
              {i.title}
            </button>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

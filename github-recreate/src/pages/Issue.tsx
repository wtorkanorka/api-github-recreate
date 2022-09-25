import React, { useEffect, useState } from "react";
import { Api } from "../request/useRequest";
import styles from "../styles/issue.module.scss";
import { Loading } from "./Loading";

interface Issue {
  title: string;
  body: string;
}

export function Issue(props: any) {
  const [login, setLogin] = useState("");
  const [repos, setRepos] = useState("");
  const [indexIssue, setIndexIssue] = useState(0);
  const [issues, setIssues] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(props, "ПРОПСЫ В issue");
  useEffect(() => {
    setLogin(props.login);
    setRepos(props.repos);
  });
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    login !== "" && repos !== ""
      ? Api.getIssues(login, repos, setIssues, setRepos, setLogin)
      : null;
  }, [login, repos, indexIssue]);
  console.log(issues, "Выданные иссушку");

  return (
    <div className={styles["issues"]}>
      {loading ? <Loading /> : null}

      {/* {loading ? <Loading /> : null} */}
      {login !== "" && repos !== ""
        ? issues?.map((i: Issue, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  // setIndexIssue(index + 1);
                  if (visible) {
                    setVisible(false);
                  } else {
                    setVisible(true);
                  }
                }}
              >
                <p>{i.title}</p>
                <p>{i.body}</p>
              </button>
            );
          })
        : null}
    </div>
  );
}

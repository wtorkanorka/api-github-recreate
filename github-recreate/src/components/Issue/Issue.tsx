import React, { useEffect, useState } from "react";
// import { Api } from "../../request/makeRequest";
import styles from "./issue.module.scss";
import { Loading } from "../Loading/Loading";

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
      ? Api.getIssues(login, repos, setIssues)
      : null;
  }, [login, repos, indexIssue]);
  console.log(issues, "Выданные иссушку");

  return (
    <>
      {loading ? <Loading /> : null}
      <div className={styles["issues"]}>
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
    </>
  );
}

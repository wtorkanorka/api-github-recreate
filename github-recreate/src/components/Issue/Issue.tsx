import React, { useEffect, useState } from "react";

import styles from "./issue.module.scss";
import { Loading } from "../Loading/Loading";
import useSWR from "swr";
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

  useEffect(() => {
    setLogin(props.login);
    setRepos(props.repos);
  });

  const getIssue = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");

      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    const data = await res.json();
    setIssues(data);
    return data;
  };

  const { data, error, isLoading } = useSWR(
    `https://api.github.com/repos/${props.login}/${props.repos}/issues`,
    getIssue
  );
  console.log(issues, "Выданные иссушку");

  return (
    <>
      {isLoading ? <Loading /> : null}
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

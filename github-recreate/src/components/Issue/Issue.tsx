import React, { useEffect, useState } from "react";

import styles from "./issue.module.scss";
import { Loading } from "../Loading/Loading";
import ReactMarkdown from "react-markdown";
import useSWR from "swr";
interface Issue {
  title: string;
  body: string;
}

export function Issue({ login, repos }) {
  const getIssue = async (url: string) => {
    const res = await fetch(url);

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");

      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    const data = await res.json();

    return data;
  };

  const { data, error } = useSWR(
    `https://api.github.com/repos/${login}/${repos}/issues`,
    getIssue
  );
  if (error) {
    throw new Error(error);
  }
  return (
    <>
      {!data ? <Loading /> : null}
      <div className={styles["issues"]}>
        {login !== "" && repos !== ""
          ? data?.map((i: Issue, index: number) => {
              return (
                <button key={index}>
                  <ReactMarkdown children={i.title} />
                  <ReactMarkdown children={i.body} />
                </button>
              );
            })
          : null}
      </div>
    </>
  );
}

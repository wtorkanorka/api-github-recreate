import React, { useEffect, useState } from "react";

import styles from "./issue.module.scss";
import { Loading } from "../Loading/Loading";
import ReactMarkdown from "react-markdown";
import useSWR from "swr";
import { fetcher } from "../../makeRequest/makeRequest";
import remarkGfm from "remark-gfm";
import { Back } from "../Buttonback/Back";
import { useParams } from "react-router-dom";
import { IssueText } from "../IssueText/IssueText";
interface Issue {
  login: string;
}

export function Issue({ login }: Issue) {
  const { issue } = useParams();

  const { data, error } = useSWR<[]>(
    `https://api.github.com/repos/${login}/${issue}/issues`,
    fetcher
  );

  if (error) {
    throw new Error("An error occurred while fetching the data.");
  }
  return (
    <>
      {!data ? <Loading /> : null}

      {data?.length !== 0 ? <Back /> : null}
      <div className={styles["issues"]}>
        {login !== "" && issue !== "" ? <IssueText data={data} /> : null}

        {data?.length === 0 ? (
          <>
            <Back />
            <p>Нет иссушек</p>
          </>
        ) : null}
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import styles from "./issue.module.scss";
import { Loading } from "../Loading/Loading";
import useSWR from "swr";
import { fetcher } from "../../makeRequest/makeRequest";
import { Back } from "../Buttonback/Back";
import { useParams } from "react-router-dom";
import { IssueText } from "../IssueText/IssueText";
interface Issue {
  login: string;
}
interface Content {
  title: string;
  body: string;
}

export function Issue({ login }: Issue) {
  const { issue } = useParams();

  const { data, error } = useSWR<[]>(
    `https://api.github.com/repos/${login}/${issue}/issues`,
    fetcher
  );

  if (error) {
    return <p>An error occurred while fetching the data.</p>;
  }
  return (
    <>
      {!data ? <Loading /> : null}
      {data?.length !== 0 ? <Back /> : null}
      <div className={styles["issues"]}>
        {data?.map((i: Content, index: number) => {
          return <IssueText dataElem={i} key={index} />;
        })}

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

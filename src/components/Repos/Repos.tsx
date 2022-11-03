import React from "react";
import styles from "./repo.module.scss";
import { Issue } from "../Issue/Issue";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../../makeRequest/makeRequest";
import { Link } from "react-router-dom";
import { Back } from "../Buttonback/Back";

interface Issue {
  name: string;
  created_at: string;
  updated_at: string;
  id: number;
  watchers: string;
}
interface Data {
  login: string;
  setRepos(value: string): void;
}
export function Repos({ login, setRepos }: Data) {
  const [loginIssue, setLoginIssue] = useState("");

  const [pageNumberForRepos, setPageNumberForRepos] = useState(1);

  const { data, error } = useSWR<[]>(
    `https://api.github.com/users/${login}/repos?page=${pageNumberForRepos}&per_page=5`,
    fetcher
  );
  if (error) {
    return <p>An error occurred while fetching the data.</p>;
  }
  function deleteSymbols(elem: string) {
    const arr = elem.split("");

    const arrayB = ["T", "Z"];
    const result = arr
      .map((s) => [...s]) // array of chars
      .map((chars) => chars.filter((ch) => !arrayB.includes(ch)).join("")) //filter out invalid char and transform back into string
      .reduce((prev, next) => {
        prev += next;
        return prev;
      });

    return result;
  }
  return (
    <>
      <Back />

      {data && (
        <div className={styles["container"]}>
          <p className={styles["repo-paragraph"]}>репозитории: {login}</p>
          <div className={styles["container-for-buttons"]}>
            {pageNumberForRepos !== 1 ? (
              <button
                className={styles["next-and-perv"]}
                onClick={() => {
                  setPageNumberForRepos(() => pageNumberForRepos - 1);
                }}
              >
                назад
              </button>
            ) : null}

            {pageNumberForRepos < data?.length - 1 ? (
              <button
                className={styles["next-and-perv"]}
                onClick={() => {
                  setPageNumberForRepos(() => pageNumberForRepos + 1);
                }}
              >
                Дальше
              </button>
            ) : null}
          </div>
          <div className={styles["repositories"]}>
            {data?.map((i: Issue, index: number) => {
              return (
                <button
                  key={index}
                  className={styles["repos-data"]}
                  onClick={() => {
                    setLoginIssue(login);

                    setRepos(i.name);
                  }}
                >
                  <Link to={`/api-github-recreate/issues/${i.name}`}>
                    <div className={styles["paragparhs"]}>
                      <p className={styles["repo-paragraph"]}>
                        Название репозитория: {i.name}
                      </p>
                      <p>Дата создания: {deleteSymbols(i.created_at)}</p>
                      <p>Дата обновления: {deleteSymbols(i.updated_at)}</p>
                      <p>id: {i.id}</p>
                      <p>Сейчас просматривают: {i.watchers}</p>
                    </div>
                  </Link>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

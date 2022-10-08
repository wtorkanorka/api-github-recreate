import React from "react";
import styles from "./repo.module.scss";
import { Issue } from "../Issue/Issue";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../../makeRequest/makeRequest";
import { Link } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { Back } from "../Buttonback/Back";

interface Issue {
  name: string;
  created_at: string;
  updated_at: string;
  id: number;
  watchers: string;
}

export function Repos({ login, setRepos }) {
  const [loginIssue, setLoginIssue] = useState("");

  const [pageNumberForRepos, setPageNumberForRepos] = useState(1);

  const { data, error } = useSWR<[]>(
    `https://api.github.com/users/${login}/repos?page=${pageNumberForRepos}&per_page=5`,
    fetcher
  );
  if (error) {
    throw new Error("An error occurred while fetching the data.");
  }

  return (
    <>
      <Back />
      {!data ? <Loading /> : null}
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
              Назад
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
                <Link to={`/issues/${i.name}`}>
                  <div className={styles["paragparhs"]}>
                    <p className={styles["repo-paragraph"]}>
                      Название репозитория: {i.name}
                    </p>
                    <p>Дата создания: {i.created_at}</p>
                    <p>Дата обновления: {i.updated_at}</p>
                    <p>id: {i.id}</p>
                    <p>Сейчас просматривают: {i.watchers}</p>{" "}
                  </div>
                </Link>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

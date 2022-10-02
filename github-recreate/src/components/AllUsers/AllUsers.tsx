import { Repos } from "../Repos/Repos";

import { useEffect, useState } from "react";
import styles from "./allUsers.module.scss";

import { Loading } from "../Loading/Loading";
import useSWR from "swr";

interface User {
  html_url: string;
  avatar_url: string;
  login: string;
}

export function AllUsers(props: any) {
  const [loginForRepos, setLoginForRepos] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [pageNumberForRepos, setPageNumberForRepos] = useState(1);

  const getRepos = async (url: string) => {
    if (loginForRepos == "") {
      return;
    }
    const res = await fetch(url);

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");

      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    const data = await res.json();
    setRepositories(data);
    return data;
  };

  const { data, error, isLoading } = useSWR(
    `https://api.github.com/users/${loginForRepos}/repos?page=${pageNumberForRepos}&per_page=5`,
    getRepos
  );
  return (
    <>
      {isLoading ? <Loading /> : null}

      <div className={styles["container"]}>
        <div className={styles["container-for-buttons"]}>
          {props.users?.map((i: User, index: number) => {
            return (
              <button
                key={index}
                className={styles["user-profile"]}
                onClick={() => {
                  setLoginForRepos(i.login);
                  console.log(i.login, "LoginAllUsers");
                }}
              >
                <a href={`${i.html_url}`}>
                  <img src={i.avatar_url} alt="Аватар пользователя" />
                </a>
                <p>{i.login}</p>
              </button>
            );
          })}
        </div>

        <div>
          {repositories.length == 0 && loginForRepos !== "" ? (
            <button
              onClick={() => {
                setPageNumberForRepos(1);
              }}
            >
              Перейти на 1-ю страницу по репозиториям
            </button>
          ) : null}
          {repositories?.length !== 0 ? (
            <div className={styles["container-of-repositories"]}>
              <div className={styles["container-for-buttons"]}>
                {pageNumberForRepos !== 1 ? (
                  <button
                    onClick={() => {
                      setPageNumberForRepos(() => pageNumberForRepos - 1);
                    }}
                  >
                    Назад
                  </button>
                ) : null}

                {pageNumberForRepos < repositories?.length - 1 ? (
                  <button
                    onClick={() => {
                      setPageNumberForRepos(() => pageNumberForRepos + 1);
                    }}
                  >
                    Дальше
                  </button>
                ) : null}
              </div>

              <Repos repos={repositories} login={loginForRepos} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

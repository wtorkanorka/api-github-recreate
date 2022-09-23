import { Link } from "react-router-dom";
import { Repos } from "./Repos";
import { Api } from "../request/useRequest";
import { useEffect, useState } from "react";
import styles from "../styles/allUsers.module.scss";

interface User {
  html_url: string;
  avatar_url: string;
  login: string;
}

export function AllUsers(props: any) {
  const [loginForRepos, setLoginForRepos] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [pageNumberForRepos, setPageNumberForRepos] = useState(1);
  console.log(props.users, "props allusers");
  useEffect(() => {
    if (loginForRepos === "") {
      return;
    } else {
      Api.getRepos(
        repositories,
        setRepositories,
        loginForRepos,
        pageNumberForRepos
      );
    }
  }, [loginForRepos, pageNumberForRepos]);
  console.log(repositories);
  return (
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
        {repositories?.length == 0 && loginForRepos !== "" ? (
          <button
            onClick={() => {
              setPageNumberForRepos(1);
            }}
          >
            Перейти на 1-ю страницу по репозиториям
          </button>
        ) : (
          <></>
        )}
        {repositories.length !== 0 ? (
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
              ) : (
                <></>
              )}

              {pageNumberForRepos < repositories?.length - 1 ? (
                <button
                  onClick={() => {
                    setPageNumberForRepos(() => pageNumberForRepos + 1);
                  }}
                >
                  Дальше
                </button>
              ) : (
                <></>
              )}
            </div>
            <Repos repos={repositories} login={loginForRepos} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

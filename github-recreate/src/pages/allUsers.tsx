import { Repos } from "./Repos";
import { Api } from "../request/useRequest";
import { useEffect, useState } from "react";
import styles from "../styles/allUsers.module.scss";
import { Routes, Route, Link } from "react-router-dom";
import { Loading } from "../pages/Loading";

interface User {
  html_url: string;
  avatar_url: string;
  login: string;
}

export function AllUsers(props: any) {
  const [loginForRepos, setLoginForRepos] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [pageNumberForRepos, setPageNumberForRepos] = useState(1);
  const [loading, setLoading] = useState(false);
  console.log(props.users, "props allusers");
  useEffect(() => {
    if (loginForRepos === "") {
      return;
    } else {
      setLoading(true);

      Api.getRepos(
        repositories,
        setRepositories,
        loginForRepos,
        pageNumberForRepos
      );
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      console.log(loading);
    }
  }, [loginForRepos, pageNumberForRepos]);
  console.log(repositories);
  return (
    <>
      {loading ? <Loading /> : null}

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
                {/* <Link to={"/" + i.login}> */}
                <a href={`${i.html_url}`}>
                  <img src={i.avatar_url} alt="Аватар пользователя" />
                </a>
                <p>{i.login}</p>
                {/* </Link> */}
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
          ) : null}
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
              {/* <Routes>
                <Route
                  path="/:login/*"
                  element={<Repos repos={repositories} login={loginForRepos} />}
                />
              </Routes> */}
              <Repos repos={repositories} login={loginForRepos} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

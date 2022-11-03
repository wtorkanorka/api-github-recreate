import { Repos } from "../Repos/Repos";
import { useEffect, useState } from "react";
import styles from "./allUsers.module.scss";
import { Loading } from "../Loading/Loading";
import useSWR from "swr";
import { Link, useParams } from "react-router-dom";
import { fetcher } from "../../makeRequest/makeRequest";
import { Back } from "../Buttonback/Back";
import ContentLoader from "react-content-loader";

interface User {
  html_url: string;
  avatar_url: string;
  login: string;
}
interface Data {
  login: string;
  setLogin(value: string): void;
}
export function AllUsers({ login, setLogin }: Data) {
  const [pageNumber, setPageNumber] = useState(1);
  const { user } = useParams();
  const { data, error } = useSWR<{ items: [] }>(
    `https://api.github.com/search/users?q=${login}&page=${pageNumber}&per_page=10`,
    fetcher
  );
  if (error) {
    return <p>An error occurred while fetching the data</p>;
  }

  return (
    <>
      {!data ? <Loading /> : null}
      <Back />

      {data && (
        <div className={styles["pagination"]}>
          {pageNumber > 1 ? (
            <button
              className={styles["next-and-perv"]}
              onClick={() => {
                setPageNumber(() => pageNumber - 1);
              }}
            >
              Назад по пользователям
            </button>
          ) : null}
          {pageNumber < data?.items?.length - 1 ? (
            <button
              className={styles["next-and-perv"]}
              onClick={() => {
                setPageNumber(() => pageNumber + 1);
              }}
            >
              Дальше
            </button>
          ) : null}
        </div>
      )}

      {data && (
        <div className={styles["container"]}>
          <div className={styles["container-for-buttons"]}>
            {data?.items?.map((i: User, index: number) => {
              return (
                <Link
                  to={`/api-github-recreate/repositories/${i.login}`}
                  key={index}
                  className={styles["style"]}
                >
                  <button
                    className={styles["user-profile"]}
                    onClick={() => {
                      setLogin(i.login);
                      console.log(i.login, "LoginAllUsers");
                    }}
                  >
                    <img
                      src={i.avatar_url}
                      alt="Аватар пользователя"
                      title={`Перейти на github пользователя: ${i.login}`}
                      className={styles["avatar"]}
                    />

                    <p>{i.login}</p>
                  </button>
                </Link>
              );
            })}
          </div>

          {data?.items?.length == 0 ? (
            <p>Нет пользователей с таким ником</p>
          ) : null}
        </div>
      )}
    </>
  );
}

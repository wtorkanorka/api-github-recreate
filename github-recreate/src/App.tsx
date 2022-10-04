import styles from "./App.module.scss";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { AllUsers } from "./components/AllUsers/AllUsers";
import { Repos } from "./components/Repos/Repos";
import { Loading } from "./components/Loading/Loading";
import cx from "classnames";

function App() {
  const [login, setLogin] = useState<string>("wtorkanorka");
  const [pageNumber, setPageNumber] = useState(1);
  const [perRequest, setPerRequest] = useState(0);

  useEffect(() => {
    setPageNumber(1);
  }, []);

  window.addEventListener("scroll", (e) => {
    document.body.style.cssText = `--scrollTop: ${window.scrollY}px`;
  });

  const getUsers = async (url: string) => {
    if (login === "") {
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
    return data.items;
  };

  const { data, error } = useSWR(
    `https://api.github.com/search/users?q=${login}&page=${pageNumber}&per_page=10`,
    getUsers
  );
  if (error) {
    throw new Error(error);
  }

  return (
    <>
      <header className={styles["main-header"]}>
        <div className={styles["layers"]}>
          <div className={styles["layer-header"]}>
            <div className={styles["caption"]}>Welcome to </div>
            <div className={styles["title"]}>GitHub Api</div>
          </div>
          <div className={cx(styles["layer"], styles["base"])}></div>
          <div className={cx(styles["layer"], styles["middle"])}></div>
          <div className={cx(styles["layer"], styles["front"])}></div>
        </div>
      </header>

      <article className={styles["main-article"]}>
        {!data ? <Loading /> : null}

        <div className={styles["main-article-content"]}>
          <div className={styles["form-position"]}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLogin(e.target.userName.value);
              }}
            >
              <input type="text" placeholder="user name" name="userName" />
              <input type="submit" value="Отправить" />
            </form>
            <p>Всего пользователей: {perRequest}</p>
            <p>Всего страниц: {Math.ceil(perRequest / 10)}</p>
          </div>
          <div className={styles["container"]}>
            {data?.length == 0 && login !== "" ? (
              <button onClick={() => setPageNumber(1)}>
                Превышен запрос на страницы, вернуться на 1 страницу
              </button>
            ) : null}
            <div className={styles["api-content"]}>
              {data?.length !== 0 ? (
                <div className={styles["buttons-with-users"]}>
                  <div className={styles["button-position"]}>
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

                    {pageNumber < data?.length - 1 ? (
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

                  {login !== "" ? <AllUsers users={data} /> : null}
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles["copy"]}>© Api GitHub</div>
        </div>
      </article>
    </>
  );
}

export default App;

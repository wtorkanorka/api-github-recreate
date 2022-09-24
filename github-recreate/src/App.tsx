import styles from "./styles/App.module.scss";
import { Api } from "./request/useRequest";
import { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
// import { User } from "./pages/User";
import { AllUsers } from "./pages/AllUsers";
import { Repos } from "./pages/Repos";
import { Loading } from "./pages/Loading";
import cx from "classnames";

function App() {
  const [users, setUsers] = useState<[]>([]);
  const [login, setLogin] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [perRequest, setPerRequest] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [component, setComponent] = useState(<Repos />);
  useEffect(() => {
    setPageNumber(1);
  }, []);
  useEffect(() => {
    console.log(pageNumber, "Page number");
    if (login === "") {
      return;
    } else {
      Api.getUsers(login, setUsers, pageNumber, setPerRequest);
    }
  }, [login, pageNumber]);
  console.log(perRequest, "perRequest");
  console.log(users, "users app");
  window.addEventListener("scroll", (e) => {
    document.body.style.cssText = `--scrollTop: ${window.scrollY}px`;
  });
  return (
    <>
      <header className={styles["main-header"]}>
        <div className={styles["layers"]}>
          <div className={styles["layer__header"]}>
            <div className={styles["layers__caption"]}>Welcome to Parallax</div>
            <div className={styles["layers__title"]}>Fairy Forest</div>
          </div>
          <div className={cx(styles["layer"], styles["layers__base"])}></div>
          <div className={cx(styles["layer"], styles["layers__middle"])}></div>
          <div className={cx(styles["layer"], styles["layers__front"])}></div>
        </div>
      </header>
      <article className={styles["main-article"]}>
        <div className={styles["main-article__content"]}>
          <h2 className={styles["main-article__header"]}> to be continued</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            cumque facere, dolores eveniet similique recusandae eaque maxime
            nobis omnis dolorum rerum commodi quis nisi molestias facilis
            repellat distinctio laudantium neque, quaerat, ipsam vel. Corporis.
          </p>
          <div className={styles["copy"]}>© Api GitHub</div>
        </div>
      </article>
      {/* {loading ? <Loading /> : null}
      <div className={styles["form-position"]}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
            setLogin(e.target.userName.value);
            setPageNumber(Number(e.target.selectPageNumber.value) + 1);
          }}
        >
          <input type="text" placeholder="user name" name="userName" />
          <input type="submit" value="Отправить" />
          <input
            type="number"
            name="selectPageNumber"
            placeholder="Введи номер страницы"
            max={perRequest / 10}
            min="1"
          />
        </form>
        <p>Всего пользователей: {perRequest}</p>
        <p>Всего страниц: {Math.ceil(perRequest / 10)}</p>
      </div>
      <div className={styles["container"]}>
        {users?.length == 0 && login !== "" ? (
          <button onClick={() => setPageNumber(1)}>
            Превышен запрос на страницы, вернуться на 1 страницу
          </button>
        ) : (
          <></>
        )}
        {users?.length !== 0 ? (
          <div className={styles["buttons-with-users"]}>
            <div className={styles["button-position"]}>
              {pageNumber > 1 ? (
                <button
                  onClick={() => {
                    setPageNumber(() => pageNumber - 1);
                  }}
                >
                  Назад по пользователям
                </button>
              ) : (
                <></>
              )}

              {pageNumber < users?.length - 1 ? (
                <button
                  onClick={() => {
                    setPageNumber(() => pageNumber + 1);
                  }}
                >
                  Дальше
                </button>
              ) : (
                <></>
              )}
            </div>

            <AllUsers users={users} />
          </div>
        ) : (
          <></>
        )}
      </div> */}
    </>
  );
}

export default App;

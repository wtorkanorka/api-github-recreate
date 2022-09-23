import styles from "./styles/App.module.scss";
import { Api } from "./request/useRequest";
import { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
// import { User } from "./pages/User";
import { AllUsers } from "./pages/AllUsers";
import { Repos } from "./pages/Repos";

function App() {
  const [users, setUsers] = useState<[]>([]);
  const [login, setLogin] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [perRequest, setPerRequest] = useState(0);
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

  return (
    <>
      <div className={styles["form-position"]}>
        <form
          onSubmit={(e) => {
            e.preventDefault();

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
      </div>
    </>
  );
}

export default App;

import styles from "./App.module.scss";
import { Api } from "./request/useRequest";
import { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { User } from "./pages/User";
import { AllUsers } from "./pages/AllUsers";
import { Repos } from "./pages/Repos";

function App() {
  const [users, setUsers] = useState<null | []>([]);
  const [login, setLogin] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [perRequest, setPerRequest] = useState();
  useEffect(() => {
    if (login === "") {
      return;
    } else {
      Api.getUsers(login, setUsers, pageNumber, setPerRequest);
    }
  }, [login, pageNumber]);
  console.log(perRequest, "perRequest");

  return (
    <>
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
      </div>
      <div className={styles["container"]}>
        <div className={styles["users-profile"]}>
          {users?.length !== 0 ? <AllUsers users={users} /> : <></>}
        </div>
      </div>
      <Routes>
        <Route path="/:user" element={<User />} />
        <Route path="/:user/:repos" element={<Repos />} />
      </Routes>
    </>
  );
}

export default App;

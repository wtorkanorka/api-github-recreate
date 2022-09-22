import "./App.css";
import { Api } from "./request/useRequest";
import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState<null | []>([]);
  const [login, setLogin] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(0);
  const [perRequest, setPerRequest] = useState(0);
  useEffect(() => {
    if (login === "") {
      return;
    } else {
      Api.getUsers(login, setUsers, pageNumber, setPerRequest);
    }
  }, [login, pageNumber]);
  console.log(perRequest, "perRequest");
  // setUsersVisited(()=>{perRequest - })
  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            setLogin(e.target.userName.value);
          }}
        >
          <input type="text" placeholder="user name" name="userName" />
          <input type="submit" value="Отправить" />
        </form>
        <p>Отрисовано пользователей: {pageNumber * 10 }</p>
      </div>
      <div className="container">
        <div className="nav-button">
          <button
            onClick={() => {
              setPageNumber(() => pageNumber - 1);
            }}
          >
            Предыдущаяя страница
          </button>
          <button
            onClick={() => {
              setPageNumber(() => pageNumber + 1);
            }}
          >
            следующая страница
          </button>
        </div>
        <div className="users-profile">
          {users?.length !== 0 ? (
            users?.map((i, index) => {
              return (
                <div key={index} className="user-profile">
                  <img src={i.avatar_url} alt="Аватар пользователя" />
                  <p>{i.login}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

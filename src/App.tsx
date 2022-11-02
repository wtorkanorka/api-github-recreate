import styles from "./App.module.scss";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AllUsers } from "./components/AllUsers/AllUsers";
import { Repos } from "./components/Repos/Repos";
import cx from "classnames";
import { Issue } from "./components/Issue/Issue";
import { Form } from "./components/Form/Form";

function App() {
  const [login, setLogin] = useState<string>("wtorkanorka");
  const [repos, setRepos] = useState<string>("");
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      document.body.style.cssText = `--scrollTop: ${window.scrollY}px`;
    });
    if (login == "") {
      setLogin("wtorkanorka");
      alert("Введи ник");
    }
  });

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
        <div className={styles["main-article-content"]}>
          <div className={styles["container"]}>
            <div className={styles["api-content"]}>
              <div className={styles["buttons-with-users"]}>
                <Routes>
                  <Route
                    path="/api-github-recreate/"
                    element={<Form setLogin={setLogin} login={login} />}
                  />
                  <Route
                    path="/api-github-recreate/users/:user"
                    element={<AllUsers login={login} setLogin={setLogin} />}
                  />
                  <Route
                    path="/api-github-recreate/repositories/:repo"
                    element={<Repos login={login} setRepos={setRepos} />}
                  />

                  <Route
                    path="/api-github-recreate/issues/:issue"
                    element={<Issue login={login} />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["copy"]}>© Api GitHub</div>
      </article>
    </>
  );
}

export default App;

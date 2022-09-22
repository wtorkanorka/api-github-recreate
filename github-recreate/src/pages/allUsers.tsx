import React from "react";
import styles from "../App.module.scss";
import { Link } from "react-router-dom";
interface User {
  html_url: string;
  avatar_url: string;
  login: string;
}

export function AllUsers(props: any) {
  return props.users?.map((i: User, index: number) => {
    return (
      <div key={index} className={styles["user-profile"]}>
        <Link to={`/${i.login}`}>
          <a href={`${i.html_url}`}>
            <img src={i.avatar_url} alt="Аватар пользователя" />
          </a>
          <p>{i.login}</p>
        </Link>
      </div>
    );
  });
}

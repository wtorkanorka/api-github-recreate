import React from "react";
import styles from "../styles/repo.module.scss";

export function Repos(props: any) {
  console.log(props.repos, "props repos");
  return (
    <div className={styles["container"]}>
      <p>репозитории: {props.login}</p>

      <div className={styles["repositories"]}>
        {props?.repos?.map((i: any, index: number) => {
          return (
            <div key={index}>
              <p>Название репозитория: {i.name}</p>
              <p>Дата создания: {i.created_at}</p>
              <p>Дата обновления: {i.updated_at}</p>
              <p>id: {i.id}</p>
              <p>Сейчас просматривают: {i.watchers}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

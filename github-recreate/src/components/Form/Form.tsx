import React from "react";
import styles from "../../App.module.scss";
import { useNavigate } from "react-router-dom";
import { Back } from "../Buttonback/Back";

interface Form {
  login: string;
  setLogin(value: string): void;
}

export function Form({ setLogin, login }: Form) {
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();

    setLogin(e.target.userName.value);
    navigate(`/users/${login}`);
  };

  return (
    <>
      {/* <Back /> */}
      <div className={styles["form-position"]}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="user name" name="userName" />
          <input type="submit" value="Отправить" />
        </form>
      </div>
    </>
  );
}

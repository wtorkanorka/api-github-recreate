import React from "react";

const defaultErrorResponse = {
  error: "Something went wrong. Please try again later",
};
const useRequest = async (path: string) => {
  try {
    const res = await fetch(`http://api.github.com/${path}`);
    const data = res.json();

    return data;
  } catch (error) {
    console.log(`useRequest error: `, error);
    return defaultErrorResponse;
  }
};
export const Api = {
  async getUsers(
    users: any,
    setUsers: any,
    pageNumber: number = 1,
    setPerRequest: string
  ) {
    const user = await useRequest(
      `search/users?q=${users}&page=${pageNumber}&per_page=10`
    );
    if (user.items == undefined) {
      this.getUsers;
    } else {
      console.log(user.items);
      setUsers(user.items);
      setPerRequest(user.total_count);
    }
  },
};
//https://api.github.com/search/users?q=${props.login}&page=1&per_page=10  //поиск пользователей

//https://api.github.com/repos/${props.login}/${props.repos}/issues/${props.index} //вывод иссушки

//https://api.github.com/users/${props.login}/repos //вывод репоизиториев
//https://api.github.com/repos/${props.login}/${props.repos}/issues // поиск иссушек

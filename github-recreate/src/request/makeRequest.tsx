import useSWR from "swr";
import React, { useState, useEffect } from "react";
import { Loading } from "../components/Loading/Loading";

export const makeRequest = (url: string) => {
  const getUsers = async (url: string) => {
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

  const { data, error } = useSWR(url, getUsers);
  if (error) {
    console.error(error);
  }

  return data;
};

//https://api.github.com/search/users?q=${props.login}&page=1&per_page=10  //поиск пользователей

//https://api.github.com/repos/${props.login}/${props.repos}/issues/${props.index} //вывод иссушки

//https://api.github.com/users/${props.login}/repos //вывод репоизиториев
//https://api.github.com/repos/${props.login}/${props.repos}/issues // поиск иссушек
// }
// export const Api = {
// async getUsers(
//   users: any,
//   setUsers: any,
//   pageNumber: number = 1,
//   setPerRequest: any
// ) {
//   const { data, error } = useSWR(
//     `search/users?q=${users}&page=${pageNumber}&per_page=10`,
//     getUsersSWR
//   );
//   console.log(data, "DATA SWR");
//   // if (user.items == undefined) {
//   //   this.getUsers;
//   // } else {
//   //   console.log(user.items);
//   //   setUsers(user.items);
//   //   setPerRequest(user.total_count);
//   // }
// },
// async getRepos(
//   repositories: any,

//   setRepositories: any,
//   loginForRepos: string,
//   pageNumberForRepos: number = 1
// ) {
//   const repos = await useRequest(
//     `users/${loginForRepos}/repos?per_page=5&page=${pageNumberForRepos}`
//   );

//   setRepositories(repos);
// },
// async getIssues(login: string, repos: string, setIssues: any) {
//   const issue = await useRequest(`repos/${login}/${repos}/issues`);
//   setIssues(issue);
// },
// };

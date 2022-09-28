import React from "react";
import useSWR from "swr";
import { useState, useEffect } from "react";

export function makeRequest() {
  const [url, setUrl] = useState("");
  const [dataSWR, setDataSWR] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetcher = async (url: string) => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setLoading(false);
    return data;
  };

  const { data, error } = useSWR(url, fetcher);
  setDataSWR(data);
  // const Api = {
  async function getUsers(users: string, pageNumber: number) {
    setUrl(`search/users?q=${users}&page=${pageNumber}&per_page=10`);
    if (dataSWR !== null) {
      return dataSWR;
    } else {
      return;
    }
  }
  // };
  // return Api;
  return data;
}

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

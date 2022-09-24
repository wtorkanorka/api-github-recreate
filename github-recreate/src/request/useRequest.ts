import React from "react";
import { useState } from "react";
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
    setPerRequest: any
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
  async getRepos(
    repositories: any,

    setRepositories: any,
    loginForRepos: string,
    pageNumberForRepos: number = 1
  ) {
    const repos = await useRequest(
      `users/${loginForRepos}/repos?per_page=5&page=${pageNumberForRepos}`
    );

    setRepositories(repos);
  },
  async getIssues(
    login: string,
    repos: string,
    setIssues: any,
    // issues: [],

    setRepos: any,
    setLogin: any
  ) {
    const issue = await useRequest(
      // `repos/${login}/${repos}/issues${indexIssue > 0 ? "/" + indexIssue : ""}`
      `repos/${login}/${repos}/issues`
    );
    setIssues(issue);
  },
};
//https://api.github.com/search/users?q=${props.login}&page=1&per_page=10  //поиск пользователей

//https://api.github.com/repos/${props.login}/${props.repos}/issues/${props.index} //вывод иссушки

//https://api.github.com/users/${props.login}/repos //вывод репоизиториев
//https://api.github.com/repos/${props.login}/${props.repos}/issues // поиск иссушек

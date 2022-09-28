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

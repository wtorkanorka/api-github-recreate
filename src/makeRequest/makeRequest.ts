export async function fetcher<Tres>(url: string): Promise<Tres> {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error(
      "An error occurred while fetching the data."
    ) as Error & { info: Tres; status: number };
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  const data = await res.json();
  return data;
}

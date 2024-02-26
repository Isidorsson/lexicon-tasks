export const fetchData = async (endpoint: string) => {
  const response = await fetch(`https://api.sr.se/api/v2/${endpoint}`);
  const data = await response.json();
  return data;
}
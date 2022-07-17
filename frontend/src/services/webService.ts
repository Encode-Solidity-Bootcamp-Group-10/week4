export async function get(url: string) {
  const response = await fetch(url);
  const resJson = await response.json();
  return resJson;
}

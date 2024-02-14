
export function clearLocalStorage() {
  localStorage.clear();
  location.reload();
  beerData = [];
  console.log("Local storage cleared");
}
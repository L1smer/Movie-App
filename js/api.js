export async function fetchMoviesByTopic(topic) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=564727fa&s=${topic}`);
  const data = await res.json();
  if (data.Response !== "True") throw new Error("No results found");
  return data.Search;
}

export async function fetchMovieById(id) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=564727fa&i=${id}`);
  const data = await res.json();
  if (data.Response !== "True") throw new Error("Movie not found");
  return data;
}
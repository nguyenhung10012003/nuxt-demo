import games from '@/datas/games.json'

export default defineEventHandler((event) => {
  const query = getQuery(event);
  if (query.id) return games.find((game) => game.id === query.id);
  return games;
})
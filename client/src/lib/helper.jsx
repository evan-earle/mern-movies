export function mapGenres(genIds, genre) {
  const genresMap = genre.reduce((result, current) => {
    result[current.id] = current.name;
    return result;
  }, {});

  return genIds.map((id) => genresMap[id]).join(", ");
}

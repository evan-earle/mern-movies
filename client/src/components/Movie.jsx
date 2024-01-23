/* eslint-disable react/prop-types */
import { IMAGES_PATH, COVER_PLACEHOLDER } from "../config";
import { Movies } from "./Movies";

export const Movie = ({ movie, genres }) => {
  const formatRunTime = (runtime) => {
    const hours = Math.floor(runtime / 60) + "h";
    const minutes = (runtime % 60) + "m";
    return `${hours} ${minutes}`;
  };

  return (
    <>
      <GridStyled container={true} spacing={2}>
        <Grid item={true} md={3}>
          {movie.poster_path ? (
            <ImgStyled
              src={`${IMAGES_PATH}/w300${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <ImgStyled src={`${COVER_PLACEHOLDER}`} alt={movie.title} />
          )}
        </Grid>
        <Grid item={true} md={9}>
          <Typography component="h1" variant="h3" gutterBottom={true}>
            {movie.title}
          </Typography>
          {movie.tagline && (
            <>
              <Typography component="h3" variant="h6">
                Tagline:
              </Typography>
              <Typography component="h3" variant="body1" gutterBottom={true}>
                {movie.tagline}
              </Typography>
            </>
          )}
          {movie.genres && (
            <>
              <Typography component="h3" variant="h6">
                Genre:
              </Typography>
              <Typography component="h3" variant="body1" gutterBottom={true}>
                {movie.genres.map((genre) => genre.name).join(", ")}
              </Typography>
            </>
          )}
          {movie.production_countries && (
            <>
              <Typography component="h3" variant="h6">
                Country:
              </Typography>
              <Typography component="h3" variant="body1" gutterBottom={true}>
                {movie.production_countries
                  .map((country) => country.name)
                  .join(", ")}
              </Typography>
            </>
          )}
          {movie.runtime && (
            <>
              <Typography component="h3" variant="h6">
                Duration:
              </Typography>
              <Typography component="h3" variant="body1" gutterBottom={true}>
                {formatRunTime(movie.runtime)}
              </Typography>
            </>
          )}
          {movie.release_date && (
            <>
              <Typography component="h3" variant="h6">
                Release Date:
              </Typography>
              <Typography component="h3" variant="body1" gutterBottom={true}>
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </>
          )}
          {movie.overview && (
            <>
              <Typography component="h3" variant="h6">
                Description:
              </Typography>
              <Typography component="h3" variant="body1" gutterBottom={true}>
                {movie.overview}
              </Typography>
            </>
          )}
        </Grid>
      </GridStyled>
      {movie.recommendations && (
        <>
          <Typography component="h2" variant="h4" gutterBottom={true}>
            Recommended
          </Typography>
          <Movies movies={movie.recommendations} genres={genres} />
        </>
      )}
    </>
  );
};

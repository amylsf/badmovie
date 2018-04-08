import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul className="movies">
        {this.props.movies.map((movie) => 
          <li className="movie_item" onClick={() => {this.props.handleClick(movie)}}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
          <div className="movie_description">
            <h2>{movie.title}</h2>
            <section className="movie_details">
              <div className="movie_year">
                <span className="title">Release Date</span>
                <span>{movie.release_date}</span>
              </div>
              <div className="movie_rating">
                <span className="title">Rating</span>
                <span>{movie.vote_average}</span>
              </div>
            </section>
          </div>
        </li>
        )}
      </ul>
    )
  }
};

export default Movies;


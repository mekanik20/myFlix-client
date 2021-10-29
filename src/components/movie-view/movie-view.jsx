import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';


export class MovieView extends React.Component {

  addFavorite = () => {
    const token = localStorage.getItem('token');
    console.log(token)
    const username = localStorage.getItem('user');
    axios.post(`https://myflixcf.herokuapp.com/users/${username}/Movies/${this.props.movie._id}`,
      {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        alert(this.props.movie.Title + ' has been added to your favorites list!')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.imageURL} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
          <Link to={`/genre/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          <Link to={`/director/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
        </div>
        <Button variant="success" onClick={this.addFavorite}> Add to Favorites</Button>
        <Button variant="outline-secondary" onClick={() => { onBackClick(null); }}>Back</Button>

      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
import React from 'react';
import axios from 'axios';
import { Navbar, Nav, Row, Col, Button } from 'react-bootstrap';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /*When a user successfully logs in, this function updates the 'user' 
property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getUser(token) {
    const user = localStorage.getItem('user');
    axios.get('https://myflixcf.herokuapp.com/users/:Username', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMovies(token) {
    axios.get('https://myflixcf.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /*Logout function that removes token and user*/
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://myflixcf.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        this.setState({
          name: response.data.name,
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRegister(user) {
    console.log(user);
    this.setState({
      user: user,
    });
  }

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        {user && <header className="mb-4" style={{ marginTop: 150 }}>
          <Navbar expand="lg" fixed="top" className="nav-bar" bg="primary" variant="dark">
            <NavbarToggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to={`/`}>Home</Nav.Link>
                <Nav.Link as={Link} to={`/users/${user}`}>My Account</Nav.Link>
              </Nav>
              <Link to={`/`}>
                <Button variant="dark" className="logout-button" onClick={() => this.onLoggedOut()}>Logout</Button>
              </Link>
            </Navbar.Collapse>
          </Navbar>
        </header>}
        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} />;
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return (
              <Col>
                <RegistrationView />
              </Col>
            );
          }} />

          <Route path="/users/:username" render={(history) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <div>
                <Col>
                  <ProfileView history={history} movies={movies} />
                </Col>
              </div>)
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />
            return (
              <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />

          <Route path="/director/:name" render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />

          <Route path="/genre/:name" render={({ match, history }) => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);
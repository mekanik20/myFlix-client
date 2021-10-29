import React from 'react';
import { Container, Col, Form, Row, Card, Button } from 'react-bootstrap';
import axios from 'axios';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      username: null,
      password: null,
      email: null,
      birthday: null,
      FavoriteMovies: [],
    }
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
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

  removeFavoriteMovie(_id) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.delete(`https://myflixcf.herokuapp.com/users/${username} /movies/${movie._id} `, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert('Movie has been removed');
        this.componentDidMount();
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate(e, name, username, password, email, birthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    axios.put(`https://myflixcf.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: newName ? newName : this.state.name,
        username: newUsername ? newUsername : this.state.username,
        password: newPassword ? newPassword : this.state.password,
        email: newEmail ? newEmail : this.state.email,
        birthday: newBirthday ? newBirthday : this.state.birthday,
      },
    })
      .then((response) => {
        alert('Saved Changes');
        this.setState({
          name: response.data.name,
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
        });
        localStorage.setItem('user', this.state.username);
        window.open(`/users/$username`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setName(input) {
    this.name = input;
  }

  setUsername(input) {
    this.username = input;
  }

  setPassword(input) {
    this.password = input;
  }

  setEmail(input) {
    this.email = input;
  }

  setBirthday(input) {
    this.birthday = input;
  }

  handleDeleteUser(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.delete(`https://myflixcf.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been removed.');
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { user } = this.props;
    console.log(user);

    return (
      <div>
        <div className="name">
          <span className="label">Name: </span>
          <span className="value">{user.name}</span>
        </div>
        <div className="username">
          <span className="label">Username: </span>
          <span className="value">{user.username}</span>
        </div>
        <div className="password">
          <span className="label">Password: </span>
          <span className="value">{user.password}</span>
        </div>
        <div className="email">
          <span className="label">Email: </span>
          <span className="value">{user.email}</span>
        </div>
        <div className="birthday">
          <span className="label">Birthday: </span>
          <span className="value">{user.birthday}</span>
        </div>
      </div>
    )
  }
}


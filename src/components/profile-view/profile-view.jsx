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

  removeFavoriteMovie(_id) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
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

  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(newUsername ? newUsername : this.state.username)
    axios.put(`https://myflixcf.herokuapp.com/users/${username}`, {
      Username: newUsername ? newUsername : this.state.username,
      Password: newPassword ? newPassword : this.state.password,
      Email: newEmail ? newEmail : this.state.email,
      Birthday: newBirthday ? newBirthday : this.state.birthday,
    },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert('Your information has been updated!');
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
        });
        console.log(response.data)
        localStorage.setItem('user', response.data.Username);
        window.open(`/users/${response.data.Username}`, '_self')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.setState({ username: input })
  }

  setPassword(input) {
    this.setState({ password: input })
  }

  setEmail(input) {
    this.setState({ email: input })
  }

  setBirthday(input) {
    this.setState({ birthday: input })
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
    const { username, password, email, birthday, FavoriteMovies } = this.state;
    return (
      <div>
        <h2>Favorite Movies:</h2>
        {FavoriteMovies.length > 0 && this.props.movies.map((movie) => {
          if (
            movie._id === FavoriteMovies.find((favorite) => favorite === movie.id)
          ) {
            return (
              <Card className="card-style" key={movie._id}>
                <Card.Body>
                  <Card.Title className="text-center">
                    {movie.Title}
                  </Card.Title>
                </Card.Body>
                <Card.Footer>
                  <div className="remove-button">
                    <Button variant="danger" size="sm" onClick={(e) => this.removeFavoriteMovie(movie._id)}>
                      Remove
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            );
          }
        })}

        <h2 className="section">Update Profile</h2>
        <Card.Body>
          <Form className="update-form" onSubmit={(e) =>
            this.handleUpdate(e, username, password, email, birthday)}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="form-label">Username</Form.Label>
              <Form.Control type="text" placeholder="Change Username" onChange={(e) =>
                this.setUsername(e.target.value)} value={username} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control type="password" placeholder="New Password" onChange={(e) =>
                this.setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control type="email" placeholder="Change Email" onChange={(e) =>
                this.setEmail(e.target.value)} value={email} />
            </Form.Group>
            <Form.Group controlId="formBasicBirthday">
              <Form.Label className="form-label">Birthday</Form.Label>
              <Form.Control type="date" placeholder="Change Birthday" onChange={(e) =>
                this.setBirthday(e.target.value)} />
            </Form.Group>

            <Button variant="danger" type="submit">Update</Button>

            <h3>Delete your account</h3>
            <Card.Body>
              <Button variant="danger" onClick={(e) =>
                this.handleDeleteUser(e)}>Delete Account</Button>
            </Card.Body>
          </Form>
        </Card.Body>
      </div>
    );
  }
}


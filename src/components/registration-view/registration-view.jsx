import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, name, password, email, birthDate);
    props.onRegistration(username);
  }

  axios.post('https://myflixcf.herokuapp.com/users', {
    Name: name,
    Username: username,
    Password: password,
    Email: email,
    Birthdate: birthDate
  })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); //second argument is necessary so the page opens in current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" onChange={e => setName(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birth Date:</Form.Label>
        <Form.Control type="date" onChange={e => setBirthDate(e.target.value)} />
      </Form.Group>
      <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }),
};

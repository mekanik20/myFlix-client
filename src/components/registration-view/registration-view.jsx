import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [name, SetName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, name, password, email, birthDate);
    props.onRegistration(username);
  }

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birth Date:
        <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
      </label>
      <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Submit</Button>
    </form>
  );
}

RegistrationView.propTypes = {
  SignIn: PropTypes.func.isRequired
};
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password);
    /*Send a request to the server for authentication */
    /*then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

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
      <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Submit</Button>
    </form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
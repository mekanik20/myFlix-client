import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

export function DirectorView(props) {
  const { director } = props;
  console.log(director);

  return (
    <div>
      <div className="director-name">
        <span className="label">Name: </span>
        <span className="value">{director.Name}</span>
      </div>
      <div className="director-bio">
        <span className="label">Biography: </span>
        <span className="value">{director.Bio}</span>
      </div>
      <div className="director-birthyear">
        <span className="label">Date of Birth: </span>
        <span className="value">{director.Birth}</span>
      </div>
      <Link to={`/`}>
        <Button className='outline-secondary'>Back to movies</Button>
      </Link>
    </div>
  )
}
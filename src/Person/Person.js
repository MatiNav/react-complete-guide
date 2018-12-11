import React from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';

const Person = props => {
  console.log(props);
  const { age, name, children, click, changed } = props;

  return (
    <div className={classes.Person}>
      <h1 onClick={click}>
        Hi i'm {name} and I am
        {age}
        years old !!
      </h1>
      <p>{children}</p>
      <input type="text" onChange={changed} value={name} />
    </div>
  );
};

Person.propTypes = {
  age: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  click: PropTypes.func,
  changed: PropTypes.func,
  children: PropTypes.string
};

export default Person;

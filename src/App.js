import React, { Component } from 'react';

import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'id 1', name: 'Max', age: 22 },
      { id: 'id 2', name: 'Stephanie', age: 22 },
      { id: 'id 3', name: 'Lulu', age: 28 }
    ],
    username: 'Some username',
    showPersons: false
  };

  switchNameHandler = newName => {
    // HANDLER es porque es un metodo llamado desde el html, es una convención.

    // DON'T DO THIS this.state.persons[0].name = 'Maximilian';

    this.setState({
      persons: [
        {
          name: newName,
          age: 22
        },
        {
          name: 'Stephanie',
          age: 77
        },
        {
          name: 'Lulu',
          age: 28
        }
      ]
    });

    console.log(this.state);
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const personCopy = { ...this.state.persons[personIndex] }; // para no manipular el state

    personCopy.name = event.target.value;
    const personsCopy = [...this.state.persons];
    personsCopy[personIndex] = personCopy;
    this.setState({ persons: personsCopy });
  };

  togglePersonsHandler = () => {
    // lo hace asi y no 'togglePersonsHandler(){}' por el quilombo con this
    this.setState({ showPersons: !this.state.showPersons });
  };

  deletePerson = index => {
    let persons; // tanto la linea 76 como 77 (esta ultima es la mas usada) lo que hacen es copiar el array, porque
    // trabajar directamente con el state ES MALA PRACTICA, SE TRABAJA CON UNA COPIA DEL MISMO
    //  persons = this.state.persons.slice();
    // Esto se llama usarlo de manera inmutable (que no cambia), para desp cambiarlo con el this.setState();
    persons = [...this.state.persons];

    persons.splice(index, 1);
    this.setState({ persons });
  };

  copyHandler = () => {
    console.log('copy');
    this.setState({ username: 'copyHandler' });
  };

  userInputHandler = event => {
    this.setState({ username: event.target.value });
  };

  render() {
    const style = {
      backgroundColor: 'red',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePerson(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={event => this.nameChangeHandler(event, person.id)}
              />
            );
          })}
        </div>
      );

      style.backgroundColor = 'green';
      style[':hover'] = {
        color: 'white',
        backgroundColor: 'red'
      };
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <p className={classes.join(' ')}>Hi i'm a React App</p>
        <button style={style} onClick={this.togglePersonsHandler}>
          Toggle Person
        </button>
        {persons}
      </div>
    );
  }
}

export default App;

// {
//   test: cssRegex,
//   exclude: cssModuleRegex,
//   use: getStyleLoaders({
//       importLoaders: 1,
//       modules: true,
//       localIdentName: '[name]__[local]__[hash:base64:5]'
//   }),
// // Don't consider CSS imports dead code even if the
// // containing package claims to have no side effects.
// // Remove this when webpack adds a warning or an error for this.
// // See https://github.com/webpack/webpack/issues/6571
//   sideEffects: true,
// },

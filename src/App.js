import React, { Component } from 'react';

// con la modificacion que hicimos (lectura 67, con modificaciones en la 66) => ahora las clases aplican solo a donde la importas
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
    const personIndex = this.state.persons.findIndex(p => p.userId === id);
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
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <ErrorBoundary key={person.id}>
                <Person
                  click={() => this.deletePerson(index)}
                  name={person.name}
                  age={person.age}
                  changed={event => this.nameChangeHandler(event, person.id)}
                />
              </ErrorBoundary>
            );
          })}
        </div>
      );

      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    // para lo de ErrorBoundary
    // const rnd = Math.random();
    // if (rnd > 0.7) {
    //   throw new Error('Something went wrong');
    // }

    return (
      <div className={classes.App}>
        <p className={assignedClasses.join(' ')}>Hi i'm a React App</p>
        <button className={btnClass} onClick={this.togglePersonsHandler}>
          Toggle Person
        </button>
        {persons}
      </div>
    );
  }
}

export default App;

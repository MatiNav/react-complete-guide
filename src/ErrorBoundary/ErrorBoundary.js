import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * SOLO usar ErrorBoundary cuando un codigo puede fallar. Solo se muestra en el modo produccion.
 */
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ''
  };

  componentDidCatch = error => {
    this.setState({ hasError: true, errorMessage: error });
  };

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.errorMessage}</h1>;
    } else {
      return this.props.children;
    }
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.string
};

export default ErrorBoundary;

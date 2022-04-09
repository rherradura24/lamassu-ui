<<<<<<< HEAD
import React from "react"
import PropTypes from "prop-types"

class LoaderWrapper extends React.Component {
  // componentDidMount will be called after all the subcomponents are loaded too
  componentWillMount () {
    this.props.onMount()
  }

  componentWillUnmount () {
=======
import React from 'react'
import PropTypes from 'prop-types'

class LoaderWrapper extends React.Component {
  // componentDidMount will be called after all the subcomponents are loaded too
  componentWillMount() {
    this.props.onMount()
  }

  componentWillUnmount() {
>>>>>>> 329032338ba1cca638bd95853901a928df086efe
    if (this.props.onUnmount) {
      this.props.onUnmount()
    }
  }

<<<<<<< HEAD
  componentDidUpdate (prevProps) {
=======
  componentDidUpdate(prevProps) {
>>>>>>> 329032338ba1cca638bd95853901a928df086efe
    if (this.props.shouldReload(prevProps.children.props)) {
      this.props.onMount()
    }
  }

<<<<<<< HEAD
  render () {
=======
  render() {
>>>>>>> 329032338ba1cca638bd95853901a928df086efe
    return this.props.children
  }
}

LoaderWrapper.propTypes = {
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func,
  shouldReload: PropTypes.func
}

export { LoaderWrapper }

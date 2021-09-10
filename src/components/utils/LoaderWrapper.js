import React from 'react'
import PropTypes from 'prop-types'

class LoaderWrapper extends React.Component {
  // componentDidMount will be called after all the subcomponents are loaded too
  componentWillMount() {
    this.props.onMount()
  }

  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.shouldReload(prevProps.children.props)) {
      this.props.onMount()
    }
  }

  render() {
    return this.props.children
  }
}

LoaderWrapper.propTypes = {
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func,
  shouldReload: PropTypes.func
}

export { LoaderWrapper }

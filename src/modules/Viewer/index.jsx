import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {BrokenFileError, Branch} from './components'
import './styles.css'

class Viewer extends PureComponent {
  static defaultProps = {
    theme: 'light' // dark
  }
  static propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
    json: PropTypes.object,
    dataUrl: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {}
    fetch(props.dataUrl)
      .then(response => {
        this.response = response.clone()
        return response.json()
      })
      .then(json => this.setState({json}))
      .catch(e => {
        if (e instanceof SyntaxError) {
          return this.response
            .text()
            .then(raw => this.setState({
                error: e.message,
                raw
            }))
        } else throw e
      })
  }

  render () {
    const {state: {error, raw, json}, props: {theme}} = this
    return (
      <div className={`viewer theme--${theme}`}>
        {error
          ? <BrokenFileError {...{error, raw}}/>
          : json
            ? <Branch data={json}/>
            : null
        }
      </div>
    )
  }
}

export default Viewer

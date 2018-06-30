import React, {Component, Fragment} from 'react'
import {Leaf} from './'

export const PREVIEW_LIMIT = 3,
      SHORT_CONTENT = '...',
      PROPERTY_DELIMITER = ',',
      BRACKETS = {
        array: '[]',
        object: '{}'
      }

class Branch extends Component {

  static defaultProps = {
    depth: 0,
    hideKey: false
  }


  constructor (props) {
    super(props)
    this.state = {open: !props.depth}
  }

  isObject = value => typeof value === 'object' && value != null

  toggle = () => this.setState(({open}) => ({open: !open}))

  render () {
    const {state: {open}, props: {name, data, depth, last, compact, hideKey}} = this,
          type = data instanceof Array ? 'array' : 'object',
          keys = Object.keys(data),
          renderChildren = (compact, sliced) => (key, index, source) => {
            const Component = this.isObject(data[key]) ? Branch : Leaf
            return (
              <Component
                compact={compact}
                name={key}
                key={key}
                data={data[key]}
                depth={depth + 1}
                last={index === source.length - 1 && !sliced}
                hideKey={source.length === 1}
              />
            )
          }

    return compact ? (
      <span className="branch">
        {!hideKey && <span className="branch__name">{name}</span>}
        {BRACKETS[type][0] + (keys.length && SHORT_CONTENT) + BRACKETS[type][1]}
        {!last && PROPERTY_DELIMITER}
      </span>
    ) : (
      <div className={`branch ${!depth && 'branch__root'}`}>
        <button className="branch__header" onClick={this.toggle} disabled={!keys.length || !depth}>
          {!!depth && <span className={`branch__arrow ${open && 'branch__arrow--open'}`}/>}
          {name && <span className="branch__name">{name}</span>}
          {!!keys.length && <span className="branch__counter">{keys.length}</span>}
          {BRACKETS[type][0]}
          {!open &&
            <Fragment>
              {keys.slice(0, PREVIEW_LIMIT).map(renderChildren(true, keys.length > PREVIEW_LIMIT))}
              {keys.length > PREVIEW_LIMIT && <span>{SHORT_CONTENT}</span>}
              {BRACKETS[type][1]}
              {!last && PROPERTY_DELIMITER}
            </Fragment>
          }
        </button>
        {open && (
          <Fragment>
            <div className="branch__content">
              {keys.map(renderChildren())}
            </div>
            <div className="branch__footer">
              {BRACKETS[type][1]}
              {!last && !!depth && PROPERTY_DELIMITER}
            </div>
          </Fragment>
        )}
      </div>
    )
  }

}

export default Branch

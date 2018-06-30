import React from 'react'
import {PROPERTY_DELIMITER, SHORT_CONTENT} from './Branch'

const LENGTH_LIMIT = 10

const Leaf = ({name, data, compact, last}) => {
  const Tag = compact ? 'span' : 'div',
        type = data != null ? typeof data : 'number'
  return (
    <Tag className="leaf">
      <span className="branch__name">{name}</span>
      <span className={"leaf__" + type}>
        {compact && type === 'string' && data.length > LENGTH_LIMIT ? data.slice(0, LENGTH_LIMIT) + SHORT_CONTENT : data}
        {type === 'number' && !data && 'null'}
        </span>
      {!last && PROPERTY_DELIMITER}
    </Tag>
  )
}


export default Leaf

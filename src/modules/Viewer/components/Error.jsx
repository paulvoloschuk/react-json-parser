import React from 'react'

const LIMIT = 15

const Error = ({error, raw}) => {
  const index = +error.match(/\d+$/)[0],
        isNearStart = index < LIMIT,
        isNearEnd = index + LIMIT > raw.length
  return (
    <div className="viewer__error">
      <p className="viewer__error__message">{error}</p>
      <p className="viewer__error__code">
        {isNearStart ? null : '...'}
        {index && raw.slice(isNearStart ? 0 : index - LIMIT, index - 1)}
        <span>{raw[index]}</span>
        {index < raw.length - 1 && raw.slice(index + 1, isNearEnd ? raw.length : index + LIMIT)}
        {isNearEnd ? null : '...'}
      </p>
    </div>
  )
}

export default Error

import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Text from './Text';

const Preview = ({ context, submitted }) => {

  const inputs = useContext(context);

  const createPreview = () => {
    if(submitted === false) {
      return (
        <div></div>
      )
    }
    console.log(submitted);
    return (
      <div>
        <h2>{inputs.name}</h2>
        <Text text={inputs.problemText} />
      </div>
    )
  }

  return (
    <>
      {createPreview()}
    </>
  )
}

export default Preview
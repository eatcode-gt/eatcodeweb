import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Text from './Text';

const Preview = ({ context }) => {

  const inputs = useContext(context);

  return (
    <>
      <h2>{inputs.name}</h2>
      <Text text={inputs.problemText} />
      <h3>Input</h3>
      <Text text={inputs.input} />
      <h3>Output</h3>
      <Text text={inputs.output} />
    </>
  )
}

export default Preview
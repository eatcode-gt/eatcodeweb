import React from 'react'
import { MathComponent } from 'mathjax-react'
import { useState, useEffect } from 'react'

const Text = ( {text} ) => {

  const styles = {
    p: {
      whiteSpace: "pre-wrap",
    },
  }

  const [filteredText, setFilteredText] = useState([]);

  const appendToPreview = (element) => {
    return (
      <p style={styles.p}>{element}</p>
    )
  }

  useEffect(() => {
    console.log(text);
    if(text !== undefined) {
      const pattern = new RegExp("[$]{2}");
      setFilteredText(text.split(pattern));
    }
  }, [text])

  return (
    <div>
      {filteredText.map((data) => {
        return appendToPreview(data);
      })}
    </div>
  )
}

export default Text
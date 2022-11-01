import React from 'react'
import { MathComponent } from 'mathjax-react'
import { useState, useEffect } from 'react'

const Text = ( {text} ) => {

  const styles = {
    p: {
      display: "inline",
      whiteSpace: "pre-wrap",
    },
    error: {
      color: "red",
      fontWeight: "bold",
    }
  }

  const [filteredText, setFilteredText] = useState([]);
  let isLatex = false;

  const appendToPreview = (element) => {
    if(isLatex) {
      isLatex = false;
      return (
        <MathComponent tex={element} display={false} />
      )
    }
    else {
      isLatex = true;
      return (
        <p style={styles.p}>{element}</p>
      )
    }
  }

  useEffect(() => {
    if(text !== undefined) {
      const pattern = new RegExp("[$]{2}");
      isLatex = false;
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
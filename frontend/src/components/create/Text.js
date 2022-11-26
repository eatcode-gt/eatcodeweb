import React from 'react'
import { MathComponent } from 'mathjax-react'
import { useState, useEffect } from 'react'

const Text = ({ text }) => {

  const styles = {
    container: {
      margin: 0,
      padding: 0,
      fontSize: '1.2em',
      display: "inline"
    },
    p: {
      display: "inline",
      whiteSpace: "pre-wrap",
      fontSize: `${2 / 1.2}em`,
    },
    error: {
      color: "red",
      fontWeight: "bold",
    }
  }

  const [filteredText, setFilteredText] = useState([]);
  let isLatex = false;

  const appendToPreview = (element, i) => {
    if(isLatex) {
      isLatex = false;
      return (
        <MathComponent key={i} tex={element} display={false} />
      )
    }
    else {
      isLatex = true;
      return (
        <p key={i} style={styles.p}>{element}</p>
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
    <div style={styles.container}>
      {filteredText.map((data, i) => {
        return appendToPreview(data, i);
      })}
    </div>
  )
}

export default Text
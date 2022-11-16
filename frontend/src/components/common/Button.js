import React, { useState } from 'react';
import { colors } from '../../global/vars';

const Button = ({color, text, onClick}) => {
  const [btnHover, setBtnHover] = useState(false);
  const handleMouseEnter = () => {
    setBtnHover(true);
  }
  const handleMouseLeave = () => {
    setBtnHover(false);
  }

  const styles = {
    container: {
      cursor: 'default',
      padding: '0.8em 1.2em',
      width: '100%',
      backgroundColor: btnHover ? colors.black : color,
      transition: 'all 0.27s ease',
      cursor: 'pointer'
    },
    text: {
      color: colors.white,
      textAlign: 'center'
    }
  }

  return (
    <div onClick={onClick} style={styles.container} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <h4 style={styles.text}>{text}</h4>
    </div>
  )
}

export default Button
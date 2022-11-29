import React, { useState } from 'react';
import { colors } from '../../global/vars';

const Button = ({onClick, color, text}) => {
  const [btnHover, setBtnHover] = useState(false);

  const handleMouseEnter = () => {
    setBtnHover(true);
  }
  const handleMouseLeave = () => {
    setBtnHover(false);
  }

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'default',
      padding: '0.8em 1.2em',
      flex: 1,
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
    <div id="confettiReward" style={styles.container} onClick={onClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <h4 style={styles.text}>{text}</h4>
    </div>
  )
}

export default Button
import React, { useState } from 'react';
import { colors } from '../../global/vars';

const CompanyButton = (props) => {
  const [btnHover, setBtnHover] = useState(false);
  const handleMouseEnter = () => {
    setBtnHover(true);
  }
  const handleMouseLeave = () => {
    setBtnHover(false);
  }

  const svgTurnsPink = true;

  const styles = {
    container: {
      cursor: 'default',
      padding: '0.8em',
      backgroundColor: btnHover ? colors.black : props.color,
      transition: 'all 0.27s ease'
    },
    company: {
      color: colors.white
    }
  }

  return (
    <div style={styles.container} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <h4 style={styles.company}>{props.company}</h4>
    </div>
  )
}

export default CompanyButton
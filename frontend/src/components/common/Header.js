import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { colors } from '../../global/colors';
import UserNameBox from './UserNameBox';

const Header = () => {
  const [titleHover, setTitleHover] = useState(false);
  const handleMouseEnter = () => {
    setTitleHover(true);
  }
  const handleMouseLeave = () => {
    setTitleHover(false);
  }

  const styles = {
    nav: {
      display: 'flex',
      height: '8em',
      padding: '0em 2em 0.5em 2em',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    title: {
      color: titleHover ? colors.accent1 : colors.accent2,
      transition: 'all 0.27s ease'
    },
    span: {
      color: titleHover ? colors.accent2 : colors.accent1,
      transition: 'all 0.27s ease'
    }
  }

  return (
    <nav style={styles.nav}>
      <Link to="/"><h2 style={styles.title} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><span style={styles.span}>eat</span>code</h2></Link>
      <UserNameBox />
    </nav>
  )
}

export default Header
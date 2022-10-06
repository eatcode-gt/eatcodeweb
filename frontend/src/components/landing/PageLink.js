import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../../global/colors';

const PageLink = (props) => {
  const [pageLinkHover, setPageLinkHover] = useState(false);
  const handleMouseEnter = () => {
    setPageLinkHover(true);
  }
  const handleMouseLeave = () => {
    setPageLinkHover(false);
  }

  const svgTurnsPink = true;

  const styles = {
    container: {
        display: 'flex',
        gap: '1.8em'
    },
    pageLink: {
      cursor: 'pointer',
      color: pageLinkHover ? colors.accent2 : colors.accent1,
      transition: 'all 0.27s ease'
    },
    span: {
      color: pageLinkHover ? colors.accent1 : colors.accent2,
      transition: 'all 0.27s ease'
    },
    utensil: {
      width: '6em',
      filter: svgTurnsPink ? 'invert(59%) sepia(69%) saturate(456%) hue-rotate(307deg) brightness(87%) contrast(96%)' : 'invert(51%) sepia(43%) saturate(689%) hue-rotate(139deg) brightness(96%) contrast(90%)',
      opacity: pageLinkHover ? 1 : 0,
      transition: 'all 0.27s ease',
      transform: "scale(-1,1)"
    }
  }

  return (
    <div style={styles.container}>
        <Link to={`/${props.page}`}><h2 style={styles.pageLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{props.page}</h2></Link>
        <img style={styles.utensil} src={require(`../common/${props.utensil}.svg`)} />
    </div>
  )
}

export default PageLink
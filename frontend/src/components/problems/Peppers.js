import Spline from '@splinetool/react-spline';

export default function Peppers({diff, size}) {
  const styles = {
    pepper: {
      maxHeight: size,
      height: '20em',
      maxWidth: size,
      width: '20em',
    }
  }

  switch (diff) {
    case 'Bell':
      return <Spline style={styles.pepper} scene="https://prod.spline.design/AyZENBTTiYsCtOEz/scene.splinecode" />
    case 'Jalepeño':
      return <Spline style={styles.pepper} scene="https://prod.spline.design/S4aMXVN-d485MqaN/scene.splinecode" />
    case 'Habenero':
      return <Spline style={styles.pepper} scene="https://prod.spline.design/E2T77Mr2jTN1awvW/scene.splinecode" />
    case 'Ghost':
      return <Spline style={styles.pepper} scene="https://prod.spline.design/Zt4GdLUDNIWkdbXU/scene.splinecode" />
    default:
      return null
  }
}
import Spline from '@splinetool/react-spline';

export default function App() {
  const styles = {
    fruit: {
      height: '31.83vh',
      width: '42.90vw'
    }
  }

  return (
    <Spline style={styles.fruit} scene="https://prod.spline.design/UPH0FefXgybOyQCv/scene.splinecode" />
  );
}
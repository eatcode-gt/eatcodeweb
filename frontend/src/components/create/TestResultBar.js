import { colors } from '../../global/vars'

export default function TestResultBar({number, code}) {
  const resultCodeToString = [
    "Correct",
    "Wrong Answer",
    "Time Limit Exceeded",
    "Memory Limit Exceeded",
    "Runtime Error",
    "System Error"
  ]

  const resultCodeToColor = [
    "#2b8030", //green
    "#a83914", //orange
    "#212b40", //navy
    "#522175", //purp
    "#752121", //red
    "#752121", //red
    "#333333" //grey
  ]

  const styles = {
    testIndividual: {
      textAlign: 'center',
      backgroundColor: resultCodeToColor[code],
      padding: '0.5em 0em 0.5em 0em',
      fontWeight: 'bold',
      color: colors.white,
      fontSize: '1.8em',
      margin: 0
    }
  }
  
  return (
    <p style={styles.testIndividual}>Test {number} : {resultCodeToString[code]}</p>
  )
}
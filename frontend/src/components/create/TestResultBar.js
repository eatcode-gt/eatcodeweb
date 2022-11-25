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

  const styles = {
    testIndividual: {
        textAlign: 'center',
        backgroundColor: resultCodeToString[code] == "Correct" ? colors.accent2 : colors.accent1,
        padding: '0.3em 0em 0.2em 0em',
        fontWeight: 'bold',
        color: colors.white,
        fontSize: '2.3em',
        margin: 0
    }
  }

  return (
    <p style={styles.testIndividual}>Test {number} {resultCodeToString[code]}</p>
  )
}
import { colors } from '../../global/vars'

export default function TestResultBar({number, passed}) {
  let passedText = passed ? "Passed" : "Failed"

  const styles = {
    testIndividual: {
        textAlign: 'center',
        backgroundColor: passed ? colors.accent2 : colors.accent1,
        padding: '0.3em 0em 0.2em 0em',
        fontWeight: 'bold',
        color: colors.white,
        fontSize: '2.3em',
        margin: 0
    }
  }

  return (
    <p style={styles.testIndividual}>Test 1 {passedText}</p>
  )
}
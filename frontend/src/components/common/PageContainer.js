import { colors } from '../../global/vars'


export default function PageContainer({children}) {
    const styles = {
        container: {
            minWidth: '100vw',
            minHeight: 'calc(100vh - 8em)', //header height
            height: 'max-content',
            backgroundColor: colors.grey,
            padding: '0em 3em 8em 3em'
        }
    }

    return (
        <div style={styles.container}>
            {children}
        </div>
    )
}
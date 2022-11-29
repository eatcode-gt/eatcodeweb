import { colors } from '../../global/vars';
import Button from '../common/Button'

export default function ProfileCard({user}) {
    const styles = {
        card: {
            flex: 1,
        },
        horiz: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2em'
        },
        title: {
            color: colors.accent1,
            marginBottom: '0.25em',
            textAlign: 'center'
        },
        flex: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1em'
        }
    }

    return (
        <div style={styles.card}>
            <h3 style={styles.title}>profile</h3>  
            <div style={styles.horiz}>          
                <img style={styles.imageContainer} src={user.userProfilePictureUrl} alt="profile" height="100px" width="100px"/>
                <div>
                    <h4>{user.userName}</h4>
                    <h5>{user.totalScore} 🥩</h5>
                    <p>{user.email}</p>
                </div>
            </div>
        </div>   
    )
}
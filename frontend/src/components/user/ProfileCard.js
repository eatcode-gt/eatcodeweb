import { colors } from '../../global/vars';
import Button from '../common/Button'

export default function ProfileCard({user}) {
    const styles = {
        card: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1em'
        }
    }

    return (
        <div style={styles.card}>
            <img style={styles.imageContainer} src={user.userProfilePictureUrl} alt="profile" height="100px" width="100px"/>
            <h4>Welcome back {user.userName.split(" ")[0]}!</h4>
            <h5>{user.email}</h5>
            <p>{user.totalScore} 🥩</p>
        </div>   
    )
}
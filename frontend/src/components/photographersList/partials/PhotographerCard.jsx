import { formatDate } from '@/utils/globalHelpers';
import styles from './PhotographerCard.module.css';

const PhotographerCard = ({ photographer }) => {
    const { username, avatar, photographyStyle, createdAt } = photographer;

    const date = new Date(createdAt);
    const formattedDate = formatDate(date, 'short');

    const month = formattedDate.slice(0, 3);
    const year = formattedDate.split(' ').at(1);

    return (
        <div className={styles.card}>
            <header>
                <div className={styles.imgContainer}>
                    <img src={avatar} alt={username} />
                </div>
                <h3>{username}</h3>
            </header>
            <div>
                <p>{photographyStyle}</p>
            </div>
            <footer>
                <small>
                    Joined {month} {year}
                </small>
            </footer>
        </div>
    );
};

export default PhotographerCard;


import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'


export function Profile() {
  const {level} = useContext(ChallengesContext)
    return (
    <div className={styles.profileContainer}>
    <img src="https://github.com/Regis-Castro.png" alt="BombermanPlayer"/>
    <div>
    <strong>Regis Castro</strong>
    <p>
      <img src="icons/level.svg" alt="level"/>
      Level {level}</p>
    </div>
    </div>
    );
}
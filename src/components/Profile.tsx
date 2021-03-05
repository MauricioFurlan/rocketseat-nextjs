
import { useSession } from 'next-auth/client';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'



export function Profile() {
    const [ session, loading ] = useSession()
  const {level} = useContext(ChallengesContext)
  let img = 'Bomberman_Branco.png'
  let name = 'You'
    if (session){
      img = session.user.image
      name = session.user.name
    }
    return (
    <div className={styles.profileContainer}>
    <img src={img} alt="BombermanPlayer"/>
    <div>
    <strong>{name}</strong>
    <p>
      <img src="icons/level.svg" alt="level"/>
      Level {level}</p>
    </div>
    </div>
    );
}
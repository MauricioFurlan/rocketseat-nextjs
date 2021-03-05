import { signOut } from 'next-auth/client';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
    const {currentExperience, experienceToNexLevel} = useContext(ChallengesContext)
    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNexLevel
    function logout() {
        console.log('oi')
        signOut();
    }
    return (
       <header className={styles.experienceBar}>
           <span>0 xp</span>
           <div>
               <div style={{width: `${percentToNextLevel}%`}}></div>
               <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>{currentExperience}xp</span>
           </div>
           <span>{experienceToNexLevel}xp</span>
           <button onClick={logout}>Logout</button>
       </header>
   );
}

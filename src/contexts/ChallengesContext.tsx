import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookie from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';
interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;

}


interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNexLevel: number;
    completedChallenge: () => void;
    closeLevelUpModal: () => void;

}


interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}
export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNexLevel = Math.pow((level + 1) * 4, 2);
    const [isLevelUpModalOpen, setLevelUpModalOpen] = useState(false);
    useEffect(() => {
        Notification.requestPermission();
    }, [])
    useEffect(() => {
        Cookie.set('level', String(level))
        Cookie.set('currentExperience', String(currentExperience))
        Cookie.set('challengesCompleted', String(challengesCompleted))

    },[level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setLevelUpModalOpen(true);
    }
    function closeLevelUpModal() {
        setLevelUpModalOpen(false);
    }
    function startNewChallenge() {

        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);
        new Audio('/notification.mp3').play();
        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio', {
                body: `valendo ${challenge.amount}xp!`
            })
        }
    }
    function resetChallenge() {
        setActiveChallenge(null);

    }
    function completedChallenge() {
        if(!activeChallenge) {
            return;
        }
        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;
        if (finalExperience >= experienceToNexLevel){
           finalExperience = finalExperience - experienceToNexLevel; 
           levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1)
    }
    return (
        <ChallengesContext.Provider value={{level, currentExperience, challengesCompleted, levelUp, startNewChallenge, activeChallenge, resetChallenge, experienceToNexLevel, completedChallenge, closeLevelUpModal}}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
        )
}
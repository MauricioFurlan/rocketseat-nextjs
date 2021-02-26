import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

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
    completedChallenge: (exp: Challenge) => void;

}


interface ChallengesProviderProps {
    children: ReactNode;
}
export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children}: ChallengesProviderProps) {
    const [level, setLevel] = useState(0);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNexLevel = Math.pow((level + 1) * 4, 2);
    function levelUp() {
        setLevel(level + 1);
    }
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);
    }
    function resetChallenge() {
        setActiveChallenge(null);
    }
    function completedChallenge(exp: Challenge) {
        const xp = currentExperience + exp.amount
        if (xp < experienceToNexLevel){
            setCurrentExperience(xp)
            setChallengesCompleted(challengesCompleted + 1)
        }else {
            setCurrentExperience(0);
            setLevel(level + 1);
        }
    }
    return (
        <ChallengesContext.Provider value={{level, currentExperience, challengesCompleted, levelUp, startNewChallenge, activeChallenge, resetChallenge, experienceToNexLevel, completedChallenge}}>
            {children}
        </ChallengesContext.Provider>
        )
}
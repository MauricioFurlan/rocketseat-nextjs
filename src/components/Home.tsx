import { CompletedChallenges } from "./CompletedChallenges";
import { Countdown } from "./Countdown";
import { ExperienceBar } from "./ExperienceBar";
import {Profile} from './Profile';
import styles from '../styles/components/Home.module.css';
import Head from 'next/head'
import { ChallengeBox } from "./ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface Data {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export default function Home(props: Data) {
  return (
      <ChallengesProvider level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}>
       <div className={styles.container}>
          <Head>
        <title>
          Início | Move.it
        </title>
      </Head>
      <ExperienceBar />
      <CountdownProvider>
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
        <ChallengeBox />
        </div>
      </section>
      </CountdownProvider>
    </div>
      </ChallengesProvider>
  )
}

import styles from  '../styles/pages/Login.module.css';
import React from 'react';
import { getSession, signIn, signOut, useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import Home from '../components/Home';
interface Data {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Login(props: Data) {
  const [session] = useSession()

  return (
     <div >
    {!session && <div className={styles.loginContainer}>
      <div className="mark">MarkTime</div>
      <button className={styles.facebookButton} onClick={() => signIn('facebook')}>Login with Facebook</button>
      <button className={styles.githubButton} onClick={() => signIn('github')}>Login with Github</button>
    </div>}
    {session && <>
      <Home level={props.level} currentExperience={props.currentExperience} challengesCompleted={props.challengesCompleted}/>
    </> }
     </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level, currentExperience, challengesCompleted } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
import Head from 'next/head'
import Link from 'next/link'
import styles from  '../styles/pages/Login.module.css';
import React from 'react';
import { getSession, signIn, signOut, useSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';

export default function Login(props) {
  const [ session, loading ] = useSession()
  console.log('session', session)
  return (
     <div className={styles.loginContainer}>
    {!session && <>

      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>}
     </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch('https://api.github.com/user')
  const posts = await res.json()
    console.log('ew', posts)
  return {
    props: {
      posts
    }
  }
}
import Head from 'next/head'
import Link from 'next/link'
import styles from  '../styles/pages/Login.module.css';

export default function Login() {
  return (
     <div className={styles.loginContainer}>
       Github
       <Link href="/home">
         <div>
          <button> Entrar </button>
         </div>
       </Link>
     </div>
  )
}

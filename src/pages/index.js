import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { initEventApps, sendEvent } from '@/helper/EventTracker'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  useEffect(() => {
    initEventApps()
  },[])
  return (
    <>
      <h1 onClick={() => sendEvent('clicked')}>Hello</h1>
    </>
  )
}

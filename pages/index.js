import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import styles from '@/styles/Home.module.css'
import SearchIcon from '../assets/searchicon.png'

export default function Home() {
  const [text, setText] = useState('')
  const [wordDetails, setWordDetails] = useState({})

  const SearchHandler = async () => {
    if(text.trim().length <= 0) {
      return alert("Please enter some text!")
    }
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
    const data = await response.json()
    if(!response.ok) {
      alert(`Information related to ${text} does not exist!`)
    }
    setWordDetails(data[0])
  }

  return (
    <>
      <Head>
        <title>Dictionary</title>
        <meta name="description" content="Dictionary made by Anish Patel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+Chettan+2:wght@400;500&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.maincontainer}>
        <div className={styles.inputcontainer}>
          <input value={text} placeholder='What would you like to search?' onChange={(e) => setText(e.target.value)} />
          <button onClick={SearchHandler}><Image src={SearchIcon} alt="Picture of the author" /></button>
        </div>
        {wordDetails?.word != undefined && <div className={styles.contentcontainer}>
          <div className={styles.contentdetailcontainer}>
            <h1>Word</h1>
            <hr />
            <p>{wordDetails.word}</p>
          </div>
          {wordDetails.meanings.length > 0 && <div className={styles.contentdetailcontainer}>
            <h1>Meaning</h1>
            <hr />
            <div className={styles.cardscontainer}>
              {wordDetails.meanings.map(meaning => <div className={styles.card}>
                <h2>Part of speech <h6>{meaning.partOfSpeech}</h6></h2>
                <h2>Defination <h6>{meaning.definitions[0].definition}</h6></h2>
                {meaning?.synonyms?.length > 0 && <h2>Synonyms {meaning.synonyms.map(d => <h6>{d}</h6>)} </h2>}
              </div>)}
            </div>
          </div>}
        </div>}
      </div>
    </>
  )
}

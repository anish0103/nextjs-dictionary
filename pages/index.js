import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import styles from '@/styles/Home.module.css'
import SearchIcon from '../assets/searchicon.png'
import SpeakerIcon from '../assets/speakericon.png'

export default function Home() {
  const [text, setText] = useState('')
  const [wordDetails, setWordDetails] = useState({})

  const SearchHandler = async () => {
    if (text.trim().length <= 0) {
      return alert("Please enter some text!")
    }
    const wordData = { word: text }
    const response = await fetch(`/api/word/`,
      {
        method: "POST",
        body: JSON.stringify(wordData)
      })
    const data = await response.json()
    if (!response.ok) {
      return alert(`Information related to ${text} does not exist!`)
    }
    setWordDetails(data.data.results)
  }

  function play() {
    var audio = document.getElementById('audio');
    audio.play();
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
          <button onClick={SearchHandler}><Image src={SearchIcon} alt="Search" /></button>
        </div>
        {wordDetails[0]?.id != undefined && <div className={styles.contentcontainer}>
          <div className={styles.contentdetailcontainer}>
            <h1>Word</h1>
            <hr />
            <p>{wordDetails[0].id} <button onClick={play}><Image src={SpeakerIcon} alt="Speaker" /></button></p>
          </div>
          <audio id='audio' src={wordDetails[0].lexicalEntries[0].entries[0].pronunciations[0].audioFile}></audio>
          <div className={styles.contentdetailcontainer}>
            <h1>Meaning</h1>
            <hr />
            {wordDetails.length > 0 && wordDetails.map(result =>
              <div key={Math.random()} className={styles.cardscontainer}>
                {result.lexicalEntries.map(meaning =>
                  <div key={Math.random()} className={styles.card}>
                    <h2>Part of speech <h6>{meaning.lexicalCategory.id}</h6></h2>
                    <h2>Defination <h6>{meaning.entries[0].senses[0].definitions[0]}</h6></h2>
                    {meaning?.entries[0]?.senses[0]?.examples.length > 0 && <h2>Example {meaning?.entries[0]?.senses[0].examples.map(d => <h6 key={Math.random()}>{d.text}</h6>)} </h2>}
                    {meaning?.entries[0]?.senses[0]?.synonyms != undefined && <h2>Synonyms <div className={styles.synonymscontainer}>{meaning?.entries[0]?.senses[0].synonyms.map(d => <h6 key={Math.random()}>{d.text},</h6>)}</div> </h2>}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>}
      </div>
    </>
  )
}

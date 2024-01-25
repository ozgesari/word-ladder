import React, { useState, useEffect, useCallback } from 'react'
import Spinner from '../Spinner/Spinner';
import './WordLadder.css';
import words from '../../utils/words'

const WordLadder = () => {
    const [firstWord, setFirstWord] = useState('');
    const [secondWord, setSecondWord] = useState('');
    const [ladder, setLadder] = useState([]);
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt');
                const data = await res.text() || words;
                const wordsArray = data.replace(/\r/g, '').split('\n');
                setWords(wordsArray);
            } catch (error) {
                setError('Error fetching word list');
            }
        };
        fetchData();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    }

    const resetForm = () => {
        setFirstWord('');
        setSecondWord('');
        setLadder([]);
        setError('');
    }

    function isButtonDisabled() {
        return loading || error || !firstWord || !secondWord || firstWord === secondWord || firstWord.length !== secondWord.length;
    }

    return (
        <div className='word-ladder'>
            <div className='word-ladder_header'>
                <h1>Word Ladder</h1>
                <button className='button-reset' disabled={loading} onClick={resetForm} >Reset Game</button>
            </div>
            {
                loading ? <Spinner /> :
                    <form onSubmit={(e) => handleSubmit(e)} name="form" className='word-ladder_container'>
                        <label htmlFor='firstWord'>First  Word: </label>
                        <input type='text' value={firstWord} onChange={(e) => setFirstWord(e.target.value)} required />
                        <ul className='word-ladder_list'>
                            {ladder.map((word, index) => (
                                <li key={index}>{word}</li>
                            ))}
                        </ul>
                        <label htmlFor='firstWord'>Second  Word: </label>
                        <input type='text' value={secondWord} onChange={(e) => setSecondWord(e.target.value)} required />
                        {error && <p>*{error}</p>}

                        <button type='submit' className='button-submit' disabled={isButtonDisabled()}  >Solve</button>
                    </form>
            }
        </div >
    )

}

export default WordLadder;

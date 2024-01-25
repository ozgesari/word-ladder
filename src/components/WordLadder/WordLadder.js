import React, { useState, useEffect, useCallback } from 'react'
import Spinner from '../Spinner/Spinner';
import './WordLadder.css';
import { words } from '../../utils/words'
import Modal from '../Modal/Modal';

const WordLadder = () => {
    const [firstWord, setFirstWord] = useState('');
    const [secondWord, setSecondWord] = useState('');
    const [ladder, setLadder] = useState([]);
    const [wordList, setWords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
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


    useEffect(() => {
        if (((firstWord.length > 0 && !wordList.includes(firstWord)) || (secondWord.length > 0 && !wordList.includes(secondWord)))) {
            setError('Word not found in dictionary');
        }
        else {
            setError('');
        }
    }, [firstWord, secondWord])

    // I had to use a different approach here. I used a while loop to generate random words. If the length of a word's characters exceeds 5, a modal will be displayed.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            let newWordList = [];
            let currentLength = 0;
            const firstWordCharset = firstWord.split('');
            const secondWordCharset = secondWord.split('');
            const allCharsets = [...firstWordCharset, ...secondWordCharset];


            while (currentLength < 5000) {
                currentLength++;
                let word = '';
                for (let i = 0; i < firstWord.length; i++) {
                    word += allCharsets[Math.floor(Math.random() * allCharsets.length)];
                }

                if (wordList.includes(word) && !newWordList.includes(word)) {
                    newWordList.push(word);
                }
            }

            if (firstWord.length > 5) {
                setShowModal(true);
                newWordList.length = 0;
            }
            setLoading(false);
            setLadder(newWordList)
        }, 0);
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
            {showModal && <Modal onClose={() => setShowModal(false)} />}
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

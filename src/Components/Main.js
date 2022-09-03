import './Main.css'
import React, {useState, useEffect, useRef} from 'react'

function Main(){
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(10)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textBoxRef = useRef(null)
    
    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }

    function startClock() {
        setIsTimeRunning(true)
        setTimeRemaining(10)
        setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }
    
    function endGame() {
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
    }

    useEffect(() => {
         if(isTimeRunning && timeRemaining > 0){
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
         }else if(timeRemaining < 1) {
            endGame()
        }
    }, [timeRemaining, isTimeRunning])

    return(
        <div className='container'>
            <h1>How fast do you type?</h1>
            <textarea
                 ref={textBoxRef}
                 onChange={handleChange}
                 value={text} 
                 disabled={!isTimeRunning}
            />
            <h4>Time remaining: {timeRemaining}</h4>
            <button onClick={startClock} disabled={isTimeRunning}>Start</button>
            <h1>Word count: {wordCount}</h1>
        </div>
    )
}
export default Main
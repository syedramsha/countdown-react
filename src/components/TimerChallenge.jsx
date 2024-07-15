import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

const TimerChallenge =  ({title,targetTime}) => {
    const timer = useRef();
    const dialog = useRef();
    const [remainingTime, setRemainingTime] = useState(targetTime*1000)
    const timerActive = remainingTime > 0 && remainingTime < targetTime*1000

    if(remainingTime <= 0 ){
        clearInterval(timer.current)
        dialog.current.open();
    }

    const handleStart = () => {
        timer.current = setInterval(()=> {
           setRemainingTime((preRemainingTime) => preRemainingTime - 10)
        },10)
    }

    const handleReset = () => {
        setRemainingTime(targetTime*1000);
        clearInterval(timer.current)
    }

    const handleStop = () => {
        dialog.current.open()
        clearInterval(timer.current)
    }

    return <>
        <ResultModal ref={dialog} targetTime={targetTime} remainingTime={remainingTime} onReset={handleReset}></ResultModal>
        <section className="challenge">
            <h1>{title}</h1>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerActive ? handleStop : handleStart}> {timerActive ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerActive ? 'active' : undefined}>
                {timerActive ? 'Time is running ...' : 'Time is inactive'}
            </p>
        </section>
    </>
}

export default TimerChallenge;
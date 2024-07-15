import {forwardRef,useImperativeHandle,useRef} from "react";

const ResultModal =forwardRef(({remainingTime,targetTime,onReset},ref) => {
    const dialog = useRef()
    const userLost = remainingTime <= 0
    console.log(remainingTime);
    const formattedRemainingTime = (targetTime - (remainingTime/1000)).toFixed(2)
    const score =  Math.round((remainingTime/(targetTime*1000)) * 100)
    useImperativeHandle(ref, ()=> {
        return{
            open() {
                dialog.current.showModal()
            }
        };
    },[]);
    return <dialog ref={dialog} className="result-modal">
        {userLost && <h2>You Lost</h2>}
        {!userLost && <h2>Your score: {score}</h2>}
        <p>The target time was <strong>{targetTime} seconds</strong></p>
        <p>You stopped timer after <strong>{formattedRemainingTime}</strong></p>
        <form method="dialog">
            <button onClick={onReset}>Close</button>
        </form>
    </dialog>
})

export default ResultModal
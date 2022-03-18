import React from "react"
import Startpage from "./components/Startpage"
import Quizframe from "./components/Quizframe"

export default function App() {
    const [started, setStarted] = React.useState(false)
    
    function startQuiz() {
        setStarted(true)
    }
    
    return (
        <main>
            {!started && <Startpage handleClick={startQuiz} />}
            {started && <Quizframe />}
        </main>
    )
}
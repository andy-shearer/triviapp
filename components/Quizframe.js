import React from "react"
import Question from "./Question"
import {nanoid} from "nanoid"

export default function Startpage(props) {
    const [questions, setQuestions] = React.useState([])
    const [submitted, setSubmitted] = React.useState(false)
    
    React.useEffect(() => {
        if(!submitted) {
            fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(data => data.json())
            .then(questions => setQuestions(previousQuestions => {
                return questions.results.map(q => (
                    {
                        ...q,
                        id: nanoid(),
                        options: shuffleInCorrectAnswer(q.incorrect_answers, q.correct_answer)
                    }
                ))
            }))
        }
    }, [submitted])
    
    function shuffleInCorrectAnswer(options, correct) {
        if(options.length === 0) {
            return []
        }
        const insertIndex = Math.floor(Math.random() * (options.length + 1))
        const fullOptions = [...options]
        fullOptions.splice(insertIndex, 0, correct)
        return fullOptions
    }
    
    function handleClick(questionId, ans) {
        setQuestions(prevQuests => {
            return prevQuests.map(question => {
                return question.id === questionId ?
                    {...question, selected: ans} :
                    question
            })
        })
    }
    
    function handleSubmit() {
        setSubmitted(prevSubmitted => !prevSubmitted)
    }
    
    const correctAnswers = questions.filter(q => q.selected === q.correct_answer).length
    const resultString = `${correctAnswers}/${questions.length} correct answers`
    
    const questionElements = questions.map(item => (
        <Question
            key={item.id}
            question={item.question}
            options={item.options}
            correct={item.correct_answer}
            handleClick={(ans) => handleClick(item.id, ans)}
            selected={item.selected}
            submitted={submitted}
        />
    ))
        
    return (
        <section>
            <h1>QUIZ TIME!</h1>
            <div>
                {questionElements}
                {submitted && <h3>{resultString}</h3>}
                <button
                    className="quiz-button"
                    onClick={handleSubmit}
                >
                    {submitted ? "Play again" : "Check Answers"}
                </button> 
            </div>
        </section>
    )
}
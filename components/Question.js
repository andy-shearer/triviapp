import React from "react"

export default function Question(props) {
    function getClass(option) {
        if(!props.submitted) {
            if(option === props.selected) {
                return "selected"
            }
        } else if(props.submitted) {
            if(option === props.correct) {
                return "correct"
            } else if (option === props.selected) {
                return "incorrect-submitted"
            } else {
                return "incorrect"
            }
        }
        return ""
    }
    
    const optionsElements = props.options.map((opt, index) => (
        <div
            key={index}
            className={"question-option " + getClass(opt)}
            onClick={() => !props.submitted && props.handleClick(opt)}
        >
            {opt}
        </div>
    ))
    
    return(
        <section>
            <p className="question-text">{props.question}</p>
            <div className="question-options">
                {optionsElements}
            </div>
            <hr className="question-divider" width="75%" />
        </section>
    )
}
import React from "react"

export default function Startpage(props) {
    return (
        <section className="start-container">
            <h1 className="start-title">Triviapp</h1>
            <h3 className="start-description">The best darn trivia app you've ever used.</h3>
            <button onClick={props.handleClick}>Start</button>
        </section>
    )
}
import React from 'react'
import dateFormat from 'dateformat';
import { useHistory } from 'react-router-dom';
export const MyQuestionCard = (props) => {
    const {question} = props;
    const date = question.timestamp;
    let history = useHistory();
    const host = process.env.REACT_APP_BACKEND_URL;
    const resolvedClick = async () => {
        const response = await fetch(`${host}/api/questions/deleteques/${question._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const res = await response.json();
        alert(res);
    }

    const viewAnswerClick = async () => {
        history.push(`/view/${question._id}`)
    }
    return (
        <div className={`my-q-card ${question.responded?"yellow-q":""} ${question.answered?"green-q":""}`}>
            <div className="my-q">
                {question.question}
            </div>
            <div className="date-ques">
                {question.user && dateFormat(date, "dddd, mmmm dS, yyyy")}
            </div>
            <div className="my-q-tags">

            {question.tags.map((tag) => 
                <div className="tag" key={tag}>
                    {tag}
                </div>
            )}
            </div>
            
            {question.user && <div className="answer-question">
                <button className={`view-ans ${question.responded?"yellow-q":"magenta-q"} ${question.answered?"green-q":"magenta-q"}`} onClick={resolvedClick}><i class="fas fa-trash"></i></button>
                <button className={`view-ans ${question.responded?"yellow-q":"magenta-q"} ${question.answered?"green-q":"magenta-q"}`} onClick={viewAnswerClick}><i className="fas fa-eye"></i></button>
            </div>}
        </div>
    )
}

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackButton = ({clickHandler, text}) => {
    return (
        <button onClick={clickHandler}> {text} </button>    
    )
}

const Statistic = ({text, count}) => {
    return (
        <tr>
            <td>
                {text}
            </td> 
            <td>
                {count}
            </td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
    if(all < 1) {return (<p>No feedback given</p>)}
    return (
        <div>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <Statistic
                        text="good"
                        count={good}
                        />
                    <Statistic
                        text="neutral"
                        count={neutral}
                        />
                    <Statistic
                        text="bad"
                        count={bad}
                        />
                    <Statistic
                        text="all"
                        count={all}
                        />
                    <Statistic
                        text="average"
                        count={average}
                        />
                    <Statistic
                        text="positive"
                        count={`${positive * 100} %`}
                        />
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;
  const average = (good - bad)/ (all)
  const positive = good / all
  

  return (
    <div>
      <h2>give feedback</h2>
        <FeedbackButton 
            clickHandler={()=> setGood(good +1)}
            text={"good"}
            />
        <FeedbackButton 
            clickHandler={()=> setNeutral(neutral +1)}
            text={"neutral"}
            />
        <FeedbackButton 
            clickHandler={()=> setBad(bad +1)}
            text={"bad"}
            />
      <Statistics 
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        average={average}
        positive={positive}
      
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
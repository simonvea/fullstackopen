import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackButton = ({clickHandler, text}) => {
    return (
        <button onClick={clickHandler}> {text} </button>    
    )
}

const StatisticsInfo = ({text, count}) => {
    return (
        <p>
            {text} {count}
        </p>
    )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
    if(all < 1) {return (<p>No feedback given</p>)}
    return (
        <div>
            <h2>statistics</h2>
            <StatisticsInfo
                text={"good"}
                count={good}
                />
            <StatisticsInfo
                text={"neutral"}
                count={neutral}
                />
            <StatisticsInfo
                text={"bad"}
                count={bad}
                />
            <StatisticsInfo
                text={"all"}
                count={all}
                />
            <StatisticsInfo
                text={"average"}
                count={average}
                />
            <StatisticsInfo
                text={"positive"}
                count={`${positive * 100} %`}
                />
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
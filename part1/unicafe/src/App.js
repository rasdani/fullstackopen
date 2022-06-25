import { useState } from 'react'

const Button = ({handleClick, text}) => {
	return (
		<>
		<button onClick={handleClick}>{text}</button>
		</>
	)
}

const StatisticsLine = ({text, value}) => {
	return (
		<>
		<td>{text}</td><td>{value}</td>
		</>
	)
}

const Statistics = ({good, neutral, bad}) => {
	if (good || neutral || bad) {
		return (
			<>
			<table>
			<tr><StatisticsLine text="good" value={good} /></tr>
			<tr><StatisticsLine text="neutral" value={neutral} /></tr>
			<tr><StatisticsLine text="bad" value={bad} /></tr>
			<tr><StatisticsLine text="all" value={good + bad + neutral} /></tr>
			<tr><StatisticsLine text="average" value={(good - bad) / (good + neutral + bad )} /></tr>
			<tr><StatisticsLine text="positive %" value={good / (good + bad + neutral) * 100} /></tr>
			</table>
			</>
		)
	}
	return (
		<>
		<p>No feedback given</p>
		</>
	)
}


const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
		<h1>give feedback</h1>
		<Button handleClick={() => setGood(good + 1)} text="good" />
		<Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
		<Button handleClick={() => setBad(bad + 1)} text="bad" />
		<h2>statistics</h2>
		<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}
	

export default App;

const Header = ({course}) => {
	return (
		<div>
		<h1>{course.name}</h1>
		</div>
	)
}

const Content = ({parts}) => {
	const [part1, part2, part3] = parts
	return (
		<>
		<Part name={part1.name} exercises={part1.exercises} />
		<Part name={part2.name} exercises={part2.exercises} />
		<Part name={part3.name} exercises={part3.exercises} />
		</>
	)
}

const Part = (props) => {
	return (
		<>
		<p>
		{props.name} {props.exercises}
		</p>
		</>
	)
}
const Total = ({parts}) => {
	const [part1, part2, part3] = parts
	return (
		<>
		<p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}
		</p>
		</>
	)
}

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
				exercises:  7
			},
			{
				name: 'State of a component',
				exercises: 14
			}
		]
	}

	return (
		<div>
		<Header course={course} />
		<Content parts={course.parts} />
		<Total  parts={course.parts} />
		</div>
	)
}


export default App;

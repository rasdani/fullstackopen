const Course = ({ course }) => {
	return (
		<>
		<Header course={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts}/>
		</>
	)

}
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
	const sum = parts.map(part => part.exercises).reduce((a, b) => a+b)
	return (<p>Number of exercises {sum}</p>)
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => 
	  <>
		{parts.map(part => <Part key={part.id} part={part} />)}
	  </>

export default Course

import { useState } from 'react'

//const Form = () => {
  //return (
    //<>
      //<form onSubmit={addPerson}>
        //<div>
          //name: <input value={newName} onChange={handleNameChange} />
        //</div>
        //<div>
          //number: <input value={newNumber} onChange={handleNumberChange} />
        //</div>
        //<div>
          //<button type="submit">add</button>
        //</div>
      //</form>
    //</>
  //)
//}

const Search = (props) => {
  const persons = [...props.persons]
  const names = persons.map(person => person.name)
  const matches = persons.filter(person => person.name.toLowerCase().includes(props.searchName.toLowerCase()))
  return (
    <AllPersons persons={matches} />
  )
}

const Person = ({ person }) => {
  return (
    <p key={person.id}>{person.name} {person.number}</p>
  )
}

const AllPersons = ({ persons }) => {
  return (
    persons.map(person => <Person key={person.id} person={person} />)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {  id:1,
      name: 'Arto Hellas' ,
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      return (alert(`${newName} is already added to phonebook`))
    }
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <div>
          filter shown with <input value={searchName} onChange={handleSearchChange} />
        </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div>
          <Search persons={persons} searchName={searchName} />
        </div>
    </div>
  )
}

export default App;

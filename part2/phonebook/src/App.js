import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'

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
  const matches = persons
                    .filter(person => person.name
                                              .toLowerCase()
                                              .includes(props
                                              .searchName
                                              .toLowerCase()))
  return (
    <AllPersons persons={matches} />
  )
}

const HandleDelete = (event, person) => {
  if (window.confirm(`Delete ${person.name}?`)) {
    return (personsService.delete_(person.id))
  }
}

const Person = ({ person }) => {
  return (
    <p key={person.id}>
      {person.name} {person.number} 
      <button key={person.id} onClick={event => HandleDelete(event, person)}>
        delete
      </button>
    </p>
  )
}

const AllPersons = ({ persons }) => {
  return (
    persons.map(person => <Person key={person.id} person={person} />)
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService
      .getAll()
      .then(recievedPersons => {
        setPersons(recievedPersons)
      })
  }, [])

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
  //const handleDelete = (event, param) => {
    //console.log(event)
    //console.log(param)
  //}

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons
                        .filter(person => person.name === newName)
                        .map(person => person.id)
        console.log(id[0])
        const personObject = {
          //id: persons.length + 1,
          name: newName,
          number: newNumber
        }
        personsService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons
                        .map(person => 
                          person.id != id 
                          ? person : returnedPerson))
            console.log(returnedPerson.id)
            console.log(persons
                            .map(person => 
                              person.id != id 
                              ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })

      }
    }
    else {
      const personObject = {
        //id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
        })
    }
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

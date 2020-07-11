import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch))

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
      setNewSearch(event.target.value)
  }

  const addNumber = (event) => {
      event.preventDefault()
      const num = {name: newName, number: newNumber}
      const names = persons.map(person => person.name)

      if (names.includes(newName)) {
          window.alert(`${newName} is already added to phonebook`)
          return
      }

      setPersons(persons.concat(num))
      setNewName('')
      setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch = {newSearch} handleSearchChange = {handleSearchChange} />
      <h2>Add a new number</h2>
      <PersonForm addNumber = {addNumber} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons = {personsToShow} />
    </div>
  )

}

const PersonForm = (props) => {
    return (
        <form onSubmit = {props.addNumber}>
        <div>
          name: <input value = {props.newName} onChange = {props.handleNameChange} />
        </div>
        <div>
          number: <input value = {props.newNumber} onChange = {props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

const Filter = (props) => {
    return (
        <div>Filter shown with <input value = {props.newSearch} onChange = {props.handleSearchChange} /></div>
    )
}

const NumberLine = (props) => {
    return (
      <li>{props.person.name} {props.person.number}</li>
    )
}

const Persons = (props) => {
    return (
      <ul>
          {props.persons.map(person => <NumberLine key={person.name} person = {person} />)}
      </ul>
    )
}

export default App
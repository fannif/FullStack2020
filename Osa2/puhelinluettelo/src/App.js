import React, { useState, useEffect } from 'react'
import numberService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [message, setMessage] = useState({text:null, type:'notify'})

  useEffect(() => {
    numberService
      .getAll()
      .then(startPersons => {
        setPersons(startPersons)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

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
          const replace = window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)
          
          if (!replace) {
            return
          }

          const id = persons.find(p => p.name === newName).id
          numberService.update(id, num)
            .then(returnedNumber => {
              setPersons(persons.map(number => number.id !== id ? number : returnedNumber))
              setNewName('')
              setNewNumber('')
              setMessage({text:`Updated ${num.name}`, type:'notify'})
              setTimeout(() => {
              setMessage({text:null, type:'notify'})
              }, 5000)  
            })
            .catch(error => {
              setPersons(persons.filter(p => p.id !== id))
              setMessage({text:`Information of ${newName} has already been deleted from the server`, type:'error'})
              setTimeout(() => {
              setMessage({text:null, type:'notify'})
              }, 5000)  
            })
            return
      }

      numberService
        .create(num)
        .then(returnedNumber => {
          setPersons(persons.concat(returnedNumber))
          setNewName('')
          setNewNumber('')
          setMessage({text:`Added ${num.name}`, type:'notify'})
          setTimeout(() => {
            setMessage({text:null, type:'notify'})
          }, 5000)  
        }) 
  }

  const deleteNumber = (toDelete) => {
    if (window.confirm(`Delete ${toDelete.name}?`)) {
      numberService
        .remove(toDelete.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== toDelete.id))
          setMessage({text:`Deleted ${toDelete.name}`, type:'notify'})
          setTimeout(() => {
            setMessage({text:null, type:'notify'})
          }, 5000)  
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== toDelete.id))
          setMessage({text:`This number has already been deleted from the server`, type:'error'})
          setTimeout(() => {
            setMessage({text:null, type:'notify'})
          }, 5000)  
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message} />
      <Filter newSearch = {newSearch} handleSearchChange = {handleSearchChange} />
      <h2>Add a new number</h2>
      <PersonForm addNumber = {addNumber} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons = {personsToShow} remove = {deleteNumber} />
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
      <li>
        {props.person.name} {props.person.number} 
        <button onClick = {props.remove}>Delete</button>
      </li>
    )
}

const Persons = (props) => {
    return (
      <ul>
          {props.persons.map(person => <NumberLine key={person.name} person = {person} remove = {() => props.remove(person)} />)}
      </ul>
    )
}

const Notification = (props) => {
  if (props.message.text === null) {
    return null
  }
  return (
    <div className = {props.message.type}>{props.message.text}</div>
  )
}

export default App
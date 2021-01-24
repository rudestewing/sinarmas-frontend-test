import {createContext, useState} from 'react'


const Context = createContext()

const Provider = (props) => {
  const [errors, setErrors] = useState({})

  function clearErrors() {
    setErrors({})
  }

  function removeError(key) {
    if(errors[key])
      delete errors[key]
  }

  return (
    <Context.Provider value={{
      errors,
      clearErrors,
      setErrors,
      removeError
    }}>
      {props.children}
    </Context.Provider>
  )
}

export default {
  Context,
  Provider
}

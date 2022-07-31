import React, { useEffect, useState } from 'react'


const have18 = (init: string) => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const birthday = new Date(init)
  const birthdayInThisYear = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate())

  let age = today.getFullYear() - birthday.getFullYear()
  if (today < birthdayInThisYear) --age

  return age >= 18
}

export const useValidation = (value: any, validations: any) => {
  const [errors, setErrors] = useState<string[]>([])

  const [isEmpty, setIsEmpty] = useState<string>('')
  const [minLength, setMinLength] = useState<string>('')
  const [maxLength, setMaxLength] = useState<string>('')
  const [isEmail, setIsEmail] = useState<string>('')
  const [isUsername, setIsUsername] = useState<string>('')
  const [isAdult, setIsAdult] = useState<string>('')
  const [isPhone,setIsPhone] = useState<string>('')



  useEffect(() => {
    for (const validation in validations)
      switch (validation) {
        case 'isEmpty':
          setIsEmpty(value.trim() ? '' : 'Required field.')
          break
        case 'minLength':
          setMinLength(value.length < validations[validation] ? `Field must contain at least ${validations[validation]} characters.` : '')
          break
        case 'maxLength':
          setMaxLength(value.length > validations[validation] ? `Field must contain no more than ${validations[validation]} characters.` : '')
          break
        case 'isEmail':
          // eslint-disable-next-line
          const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          let checkIsEmail = regex.test(value.trim().toLowerCase())
          setIsEmail(checkIsEmail ? '' : 'Please, enter your email correctly.')
          break
        case 'isUsername':
          let checkIsUsername = value.split(' ').length === 2 && value.split(' ').every((word: string) => {
            return word.length >= 3 && word.length <= 30
          })
          setIsUsername(checkIsUsername ? '' : 'Please, enter in the format: firstname lastname.')
          break
        case 'isAdult':
          let checkIsAdult = value && have18(value)
          setIsAdult(checkIsAdult ? '' : 'Sorry, you must be over 18.')
          break
        case 'isPhone':
          let checkIsPhone = value.replace(/[0-9]/g, '').length === 7
          setIsPhone(checkIsPhone ? '' : 'Please, check the phone number is correct.')
          break
      }
  }, [value, validations])

  useEffect(() => {
    setErrors([isEmpty, minLength, maxLength, isEmail, isUsername, isAdult, isPhone].filter(Boolean))
  } , [isEmpty, minLength, maxLength, isEmail, isUsername, isAdult, isPhone])

  return errors
}

export const useInput = (init: any, validations: object) => {
  const [value, setValue] = useState<any>(init)
  const [touched, setTouched] = useState<boolean>(false)

  const errors = useValidation(value, validations)

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    let { value, name } = e.target
    if (value.startsWith(' ')) value = value.trim()

    if (name === 'username') {
      if (value.split(' ').length > 2) return
      value = value.toUpperCase()
    }

    // TODO сделать рефакторинг
    if (name === 'phone') {
      if (value.length === 19) return 
      if (value.length < 4) return value = '+7 ('
      value = value.replace(/[^0-9- +()]/g, '')
      if (value.length === 7) return setValue(value + ') ')
      if (value.length === 12) return setValue(value + '-')
      if (value.length === 15) return setValue(value + '-')
    }

    setValue(value)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Backspace') setValue('+7 (')
  }

  const onBlur = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setTouched(true)
  }

  const clear = (init: string) => {
    setValue(init)
    setTouched(false)
  }

  return {
    value,
    onKeyDown,
    touched,
    errors,
    clear,
    onChange,
    onBlur,
  }
}
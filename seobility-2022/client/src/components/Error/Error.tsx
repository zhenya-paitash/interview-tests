import { FC } from 'react'

interface IErrors {
  errors: string[]
}

const Error: FC<IErrors> = ({ errors }) => {
  return (
    <>
      {errors.map((err: string, idx: number) => (
          <p className='error' key={idx}>* {err}</p>
      ))}
    </>
  )
}

export default Error
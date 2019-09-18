import React from 'react'

export const EmployeesSearchForm = ({ filterEmployees, setFilterEmployees}) => {
  let dataFilter= filterEmployees;

  const onSubmit = (e) => {
    e.preventDefault()
    setFilterEmployees(dataFilter)
  }

  const onChange = (e) => {
      dataFilter = {
        ...dataFilter,
        [e.target.name]: e.target.value
      }
  }

  return(
    <form onSubmit={onSubmit}>
      <input type="text" className="form-control" name='name' placeholder="Name" onChange={onChange}/>
      <input type="number" className="form-control" name='salary' placeholder="Salary" onChange={onChange}/>
      <input type="number" className="form-control" name='age' placeholder="Age" onChange={onChange}/>
      <input type="submit" className='btn btn-primary btn-block' value="Filter Employees" />
    </form>
  )
}
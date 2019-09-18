import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { EmployeesList } from './EmployeesList'

export const Employees = () => {
  const [employees, setEmployess] = useState(JSON.parse(localStorage.getItem('employees')) || [])
  const [loading, setLoading] = useState(true)

  const [totalEmployees, setTotalEmployees] = useState(10)
  const [showEmployees, setShowEmployees] = useState([])
  const [filterEmployees, setFilterEmployees] = useState({
    name: '',
    salary: '',
    age: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://dummy.restapiexample.com/api/v1/employees`,);
      setEmployess(result.data);
      localStorage.setItem('employees', JSON.stringify(result.data));
      setLoading(false);
    };

    if (!employees.length) {
      fetchData();
    }else{
      setLoading(false)
    }
  }, [employees]);

  useEffect(() => {
    const getEmployees = async () =>{
      let dataEmployees = employees;

      if (filterEmployees.name || filterEmployees.salary || filterEmployees.age) {
        if (filterEmployees.name) {
          dataEmployees = await dataEmployees.filter(em => em.employee_name.toLowerCase().indexOf(filterEmployees.name.toLowerCase()) >= 0 ? true : false );
        }
        if (filterEmployees.age) {
          dataEmployees = await dataEmployees.filter(em => em.employee_age === filterEmployees.age);
        }
        if (filterEmployees.salary) {
          dataEmployees = await dataEmployees.filter(em => em.employee_salary === filterEmployees.salary);
        }
      }
      setShowEmployees(dataEmployees.slice(0,totalEmployees))
    }
      setLoading(true)
      getEmployees()
      setTimeout(() => {
        setLoading(false)
      }, 300);
  }, [employees, filterEmployees.age, filterEmployees.name, filterEmployees.salary, totalEmployees])

  const changeTotalEmployees = (e) => {
    if (e.target.value !== totalEmployees) {
      setLoading(true)
      setTotalEmployees(e.target.value)
    }
  }

  return (
    <Fragment>
      <div className="row">
        <h1 className='text-center'>Employees</h1>
      </div>

      <div className="row">
        {<EmployeesList
          loading={loading}
          employees={showEmployees}
          total={totalEmployees}
          changeTotalEmployees={changeTotalEmployees}
          filterEmployees={filterEmployees}
          setFilterEmployees={setFilterEmployees}
        />}
      </div>
    </Fragment>
  )
}
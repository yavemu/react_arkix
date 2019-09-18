import React, { Fragment } from 'react'
import { Loading } from './Loading'
import NumberFormat from 'react-number-format';
import { EmployeesSearchForm } from './EmployeesSearchForm';

export const EmployeesList = ({ loading, employees, totalEmployees, changeTotalEmployees, filterEmployees, setFilterEmployees})=> {
  return (
    <Fragment>
      <div className="col-12 col-sm-4">
        <div className="row justify-content-center">
          <EmployeesSearchForm filterEmployees={filterEmployees} setFilterEmployees={setFilterEmployees} />
        </div>
      </div>
      <div className="col-12 col-sm-8">
        <div className="row justify-content-end">
          <div className="form-group">
            <label htmlFor="total">Total:</label>
            <select className='form-control' id='total' defaultValue={totalEmployees} onChange={changeTotalEmployees}>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
              <option value="200">200</option>
            </select>
          </div>
        </div>
        <div className="row">
          <table className="table table-striped table-sm table-hover bg-white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Salary</th>
                <th scope="col">Age</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan={4} className='align-self-center justify-content-center'>
                  {loading && <Loading />}
                  {!loading && employees.length <= 0 && <p className='alert alert-danger text-center'>No se encontraron empleados.</p>}
                </th>
              </tr>
              {!loading && employees.map((emp, i) => {
                return (
                  <tr key={emp.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{emp.employee_name}</td>
                    <td> <NumberFormat value={emp.employee_salary} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$ '} /> </td>
                    <td>{emp.employee_age}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      
    </Fragment>
  )
}
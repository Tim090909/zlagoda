import React from 'react'
import EmployeeForm from './form';
import { getEmployeeById } from '@/actions/get_employee_by_id';

const EditEmployeePage = async ({params} : {params: { employeeId: string}}) => {
  const employee = await getEmployeeById(params.employeeId);
  return (
    <EmployeeForm employee={employee[0]}/>
  )
}

export default EditEmployeePage

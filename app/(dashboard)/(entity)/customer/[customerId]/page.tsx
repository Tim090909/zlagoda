import React from 'react'
import { getCustomerById } from '@/actions/get_customer_by_id';
import CustomerForm from './form';

const EditCustomerPage = async ({params} : {params: { customerId: string}}) => {
  const customer = await getCustomerById(params.customerId);
  return (
    <CustomerForm customer={customer[0]}/>
  )
}

export default EditCustomerPage

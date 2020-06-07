import { uuid } from 'uuidv4';

import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import ICustomersRepository from '../ICustomersRepository';

class AppointmentsRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const findCustomer = this.customers.find(
      customer => customer.email === email,
    );
    return findCustomer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const findCustomer = this.customers.find(customer => customer.id === id);
    return findCustomer;
  }

  public async create({ name, email }: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, { id: uuid(), name, email });

    this.customers.push(customer);

    return customer;
  }
}

export default AppointmentsRepository;

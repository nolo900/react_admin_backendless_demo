import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';
import CustomUrlField from './customUrlField';
console.log('hi')
export const UserList = props => (
  <List {...props}>
      <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <EmailField source="email" />
          <TextField source="address.street" />
          <TextField source="phone" />
          <CustomUrlField source="website"/>
          <TextField source="company.name" />
      </Datagrid>
  </List>
);

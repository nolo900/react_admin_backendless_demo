import React from 'react';
import { Admin, Resource } from 'react-admin';
import { UserList, UserEdit, UserCreate } from "./components/User";
import { SiteList, SiteEdit, SiteCreate } from './components/Site';

import jsonServerProvider from './services/backendlessServerProvider';
import authProvider from './services/authProvider';
import EventIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './components/dashboard';
import './App.css';
import { AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'ra-core';

const API_URL = `https://api.backendless.com/${process.env.REACT_APP_BE_APPLICATION_ID}/${process.env.REACT_APP_BE_REST_API_KEY}/data`;
const dataProvider = jsonServerProvider(API_URL);

function App() {
  
  return(
    <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider} >
      <Resource name="User" icon={UserIcon} list={UserList} edit={UserEdit} create={UserCreate} />
      <Resource name="Site" icon={EventIcon} list={SiteList} edit={SiteEdit} create={SiteCreate} />
      {/* {permissions => [
      <Resource name="contacts" icon={UserIcon} list={ContactList} edit={ContactEdit} create={ContactCreate} />,
      permissions === 'admin' ?
      <Resource name="events" icon={EventIcon} list={EventList} edit={EventEdit} create={EventCreate} />
      : null
      ]} */}
    </Admin>
  )
};

export default App;
import React from 'react';
import { Admin, Resource } from 'react-admin';
import { ContactList, ContactEdit, ContactCreate } from "./components/contacts";
import { EventList, EventEdit, EventCreate } from './components/events';

import jsonServerProvider from './services/backendlessServerProvider';
import authProvider from './services/authProvider';
import EventIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './components/dashboard';
import './App.css';

const API_URL = `https://api.backendless.com/${process.env.REACT_APP_BE_APPLICATION_ID}/${process.env.REACT_APP_BE_REST_API_KEY}/data`;
const dataProvider = jsonServerProvider(API_URL);

const App = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider} >
    <Resource name="contacts" icon={UserIcon} list={ContactList} edit={ContactEdit} create={ContactCreate} />
    <Resource name="events" icon={EventIcon} list={EventList} edit={EventEdit} create={EventCreate} />
  </Admin>
);

export default App;

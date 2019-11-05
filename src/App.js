import React from 'react';
import { Admin, Resource } from 'react-admin';
import { UserList, UserEdit, UserCreate } from "./components/User";
import { SiteList, SiteShow, SiteEdit, SiteCreate } from './components/Site';
import { LesseeList, LesseeEdit, LesseeCreate } from "./components/Lessee";
import { ServiceProviderEdit, ServiceProviderList, ServiceProviderCreate} from "./components/ServiceProvider";
import { ServiceLogList } from "./components/ServiceLog";

import jsonServerProvider from './services/backendlessServerProvider';
import authProvider from './services/authProvider';
import EventIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import WelcomeBanner from './components/WelcomeBanner';
import './App.css';
import { allow } from './helpers';

const API_URL = `https://api.backendless.com/${process.env.REACT_APP_BE_APPLICATION_ID}/${process.env.REACT_APP_BE_REST_API_KEY}/data`;
// const API_URL = `https://api.backendless.com/${process.env.REACT_APP_BE_APPLICATION_ID}/${process.env.REACT_APP_BE_REST_API_KEY}/services`;
const dataProvider = jsonServerProvider(API_URL);

function App() {
  
  return(
    <Admin
        title="Site Scan Solutions"
        dataProvider={dataProvider}
        authProvider={authProvider} >
      { permissions => [
          allow(permissions, 'SUPER_ADMIN') ? <Resource name="users"
                                                        icon={UserIcon}
                                                        list={UserList}
                                                        edit={UserEdit}
                                                        create={UserCreate} /> : null,
          allow(permissions, 'SUPER_ADMIN') ? <Resource name="site"
                                                        options={{ label: 'Sites' }}
                                                        icon={EventIcon}
                                                        list={SiteList}
                                                        edit={SiteEdit}
                                                        create={SiteCreate}
                                                        show={SiteShow} /> : null,
          allow(permissions, 'SUPER_ADMIN') ? <Resource name="Lessee"
                                                        icon={EventIcon}
                                                        list={LesseeList}
                                                        edit={LesseeEdit}
                                                        create={LesseeCreate} /> : null,
          allow(permissions, 'SUPER_ADMIN') ? <Resource name="ServiceProvider"
                                                        options={{label:'Service Providers'}}
                                                        icon={EventIcon}
                                                        list={ServiceProviderList}
                                                        edit={ServiceProviderEdit}
                                                        create={ServiceProviderCreate}/> : null,
          allow(permissions, 'SUPER_ADMIN') ? <Resource name="ServiceLog"
                                                        options={{label:'Service Log'}}
                                                        icon={EventIcon}
                                                        list={ServiceLogList} /> : null,
      ]}
    </Admin>
  )
};

export default App;

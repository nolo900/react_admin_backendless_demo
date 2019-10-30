import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import UserIcon from "../App";
import {UserCreate, UserEdit, UserList} from "./User";

export default ({permissions}) => (
    <Card>
        { console.log('permissions from here: ', permissions)}
        <CardHeader title="Backendless Demo" />
        <CardContent>This prototype application offers a restful interface for the Backendless data store.</CardContent>
    </Card>
);

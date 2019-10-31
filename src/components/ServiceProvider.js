import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    Edit,
    SimpleForm,
    DisabledInput,
    Create,
    EditButton,
    Filter,
    TextInput,
} from 'react-admin';

const ServiceProviderTitle = ({record}) => {
    return <span>Service Provider{record ? `: ${record.name}` : ''}</span>;
};

const ServiceProviderFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn />
    </Filter>
);

export const ServiceProviderList = props => (
    <List filters={<ServiceProviderFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const ServiceProviderEdit = props => (
    <Edit title={<ServiceProviderTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const ServiceProviderCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

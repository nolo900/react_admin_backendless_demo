import React from 'react';
import {
    List,
    Create,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    DisabledInput,
    SimpleForm,
    Filter,
    TextInput,
} from 'react-admin';

const LesseeTitle = ({record}) => {
    return <span>Lessee{ record ? `: ${record.companyName}` : ''}</span>
};

const LesseeFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="companyName" alwaysOn />
    </Filter>
);

export const LesseeList = props => (
    <List filters={<LesseeFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="companyName" />
            <EditButton/>
        </Datagrid>
    </List>
);

export const LesseeEdit = props => (
    <Edit title={<LesseeTitle/>} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="companyName" />
        </SimpleForm>
    </Edit>
);

export const LesseeCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="companyName" />
        </SimpleForm>
    </Create>
);

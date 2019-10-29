import React from 'react';
import {
    List,
    Filter,
    Datagrid,
    TextField,
    TextInput,
    DateField,
    DateInput,
    LongTextInput,
    SelectInput,
    ReferenceInput,
    ReferenceField,
    DisabledInput,
    SimpleForm,
    Edit,
    Create,
    EditButton } from 'react-admin';

export const LeaseeTitle = ({record}) => {
    return <span>Leasee{record ? `: ${record.title}` : ''}</span>;
};

const LeaseeFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="companyName" alwaysOn />
    </Filter>
);

export const LeaseeList = props => (
    <List filters={<LeaseeFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <ReferenceField source="admin" reference='Leasee'>
                <TextField source="email"/>
            </ReferenceField>
            <ReferenceManyField label="Comments by" reference="comments" target="post_id">
                <SingleFieldList>
                    <ChipField source="author.name" />
                </SingleFieldList>
            </ReferenceMany

            <TextField source="companyName" />
            <DateField source="start"/>
            <DateField source="end"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const LeaseeEdit = props => (
    <Edit title={<LeaseeTitle/>} {...props}>
        <SimpleForm>
            <TextInput source="companyName" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Edit>
);

export const LeaseeCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="companyName" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Create>
);
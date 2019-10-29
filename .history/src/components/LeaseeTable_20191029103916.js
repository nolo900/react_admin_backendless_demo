import React, {useState} from 'react';
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
    ReferenceManyField,
    SingleFieldList,
    ChipField,
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
const AdminField = ({record = {}}) => {
    const[showDetails, setShowDetails] = useState(false)
    let details;
    if (showDetails) {
        details = 
        <div>
            <span>{record.admin.email}</span>
            <br
            <span>{record.admin.phone}</span>
        </div>
    }
    return(
        <div onMouseEnter={() => setShowDetails(true)} onMouseLeave={() => setShowDetails(false)}>
            <span >{record.admin.firstName} {record.admin.lastName}</span>
            {details}
        </div>
       
    )
}
AdminField.defaultProps = {label: 'Admin'}

export const LeaseeList = props => (
    <List filters={<LeaseeFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <AdminField source="Leasee" />
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

// export const LeaseeShow = props => (
//     <Edit title={<LeaseeTitle/>} {...props}>
//         <SimpleShowLayout>
//             <TextField source="companyName" />
//             <DateField source="start" />
//             <DateInput source="end" />
//         </SimpleShowLayout>
//     </Edit>
// );

export const LeaseeCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="companyName" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Create>
);
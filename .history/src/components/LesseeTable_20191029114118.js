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

export const LesseeTitle = ({record}) => {
    return <span>Lessee{record ? `: ${record.title}` : ''}</span>
};

const LesseeFilter = (props) => (
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
            <br></br>
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

export const LesseeList = props => (
    <List filters={<LesseeFilter/>} {...props}>
        <Datagrid rowClick="edit">
            <AdminField source="Lessee" />
            <TextField source="companyName" />
            <DateField source="start"/>
            <DateField source="end"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const LesseeEdit = props => (
    <Edit title={<LesseeTitle/>} {...props}>
        <SimpleForm>
            <TextInput source="companyName" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Edit>
);

// export const LesseeShow = props => (
//     <Edit title={<LesseeTitle/>} {...props}>
//         <SimpleShowLayout>
//             <TextField source="companyName" />
//             <DateField source="start" />
//             <DateInput source="end" />
//         </SimpleShowLayout>
//     </Edit>
// );

export const LesseeCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="companyName" />
            <DateInput source="start" />
            <DateInput source="end" />
        </SimpleForm>
    </Create>
);
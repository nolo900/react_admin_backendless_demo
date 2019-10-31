import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { allow } from '../helpers';

export default ({permissions, ...props }) => {
    return <h3 style={{margin: '100px 50px'}}>Welcome {props.role}</h3>;
}

        {/*<Card>*/}
        {/*    <CardHeader title="Site Scan Admin" />*/}
        {/*    <CardContent>*/}
        {/*        <p>Welcome { props.role }</p>*/}
        {/*    </CardContent>*/}
        {/*</Card>*/}

// );

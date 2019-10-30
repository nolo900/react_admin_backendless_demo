import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { allow } from '../helpers';

export default ({permissions }) => (
    <div>
        { console.log('permissions from dashboard: ', permissions)}

        { allow(permissions,'SUPER_ADMIN') &&
        <Card>
            <CardHeader title="Site Scan Admin" />
            <CardContent>
                <p>Welcome Site Scan Admin</p>
            </CardContent>
        </Card>}
    </div>
);

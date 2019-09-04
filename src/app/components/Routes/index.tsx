import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Panel from '../Panel';
import Settings from '../Settings';


export default () => (
    <Switch>
        <Route exact path='/' component={Panel} />
        <Route exact path='/settings' component={Settings} />
    </Switch>
);

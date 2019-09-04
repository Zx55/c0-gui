import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Panel from '../Panel';
import Settings from '../Settings';


export default () => (
    <Switch>
        <Route exact path='/compile' component={Panel} />
        <Route exact path='/settings' component={Settings} />
    </Switch>
);

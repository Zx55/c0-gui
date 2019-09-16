import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Panel from '../Panel';
import Settings from '../Settings';
import Manual from '../Manual';
import About from '../About';


export default () => (
    <Switch>
        <Route exact path='/compile' component={Panel} />
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/manual' component={Manual} />
        <Route exact path='/about' component={About} />
    </Switch>
);

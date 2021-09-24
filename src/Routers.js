import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from "react-router";
import Home from './Home';

import Details from './Details';

function Routers() {


    return (


        <Switch>

            <Route exact path="/home"><Home /></Route>
            <Route exact path="/:id"><Details /></Route>


        </Switch>


    );


}
export default Routers;
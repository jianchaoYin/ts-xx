import React from 'react'
import { observer } from 'mobx-react'
import { Route, RouteProps } from 'react-router-dom'


function PrivateRoute( { component:Component, ...rest }: RouteProps ){
    
    return (
        <Route { ...rest} ></Route>
    )
}
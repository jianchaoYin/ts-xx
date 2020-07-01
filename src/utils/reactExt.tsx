import React, { Component } from 'react'
import { message, notification } from 'antd'

export class ComponentExt<P = {},S = {}> extends Component<P,S> {
    readonly $message = message
    readonly $notification = notification
}  

export class StoreExt {
    readonly $message = message 
    readonly $notification = notification
}
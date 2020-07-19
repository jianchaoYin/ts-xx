import React, { Component } from 'react'
import { message, notification } from 'antd'

import * as api from '@/http/api'

export class ComponentExt<P = {},S = {}> extends Component<P,S> {
    readonly api = api
    readonly $message = message
    readonly $notification = notification
}  

export class StoreExt {
    readonly api = api
    readonly $message = message 
    readonly $notification = notification
}
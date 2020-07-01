This is a simple test with ts and react

## setup

> If you do not need the taobao registry, you can change it in `.npmrc`

```bash
$ npm i
```

## build for development

```bash
$ npm run dev
```

## build for production

```bash
$ npm run build:(qa/prod)
```

## characteristics

-   use [ant design](https://ant.design/index-cn) as UI framework
-   import .(s)css auto generate .(s)css.d.ts by [typed-css-modules-webpack-plugin](https://github.com/dropbox/typed-css-modules-webpack-plugin)
-   use ServiceWorker by [workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)
-   import svg icon as a component by `@svgr/webpack`, [there is an example in the doc of steamer-react-redux-ts](https://github.com/YDJ-FE/steamer-react-ts/blob/master/docs/svg.md)
-   create component folder by `customaddcomponents` which is added to npm script `npm run add`


## component example

```jsx
import * as React from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'

import useRootStore from '@store/useRootStore'

function Test() {
    const { routerStore } = useRootStore()

    const gotoHome = () => {
        routerStore.push('/')
    }
    return (
        <Button type="primary" onClick={gotoHome}>
            go to page index directly
        </Button>
    )
}

export default observer(Test)
```

[live example](https://github.com/YDJ-FE/ts-react-webpack4/blob/master/src/containers/views/Login/index.tsx?1532570619900)

## necessary extensions (on vscode)

-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

-   [stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)

-   [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## how to upload file to server

```bash
#!/bin/bash

TIMESPAN=$(date '+%s')
DEPLOYNAME=ts-react-webpack.qa.${TIMESPAN}
DEPLOYFILES=${DEPLOYNAME}.tar.gz
SERVER=0.0.0.0

# make compression
cd dist/qa
tar -zcvf ${DEPLOYFILES} ./*

# upload
scp -P 22 -o StrictHostKeyChecking=no ${DEPLOYFILES} node@${SERVER}:/home/pages/ts-react-webpack/tarfiles

# make decompression
ssh -p 22 -o StrictHostKeyChecking=no node@${SERVER} tar xzf /home/pages/ts-react-webpack/tarfiles/${DEPLOYFILES} -C /home/pages/ts-react-webpack

if [ $? -ne 0 ]; then
    echo "success"
else
    echo "fail"
fi
```

## how to deploy with nginx

```nginx
server {
       listen       9993;
       server_name  localhost:9993;

       location / {
             root   ~/Documents/react/ts-react-webpack/dist/qa/;
             index  index.html index.htm;
       }
 }
```

## the scaffold

[steamer-react-redux-ts](https://github.com/YDJ-FE/steamer-react-redux-ts)
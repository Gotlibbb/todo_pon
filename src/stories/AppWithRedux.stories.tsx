import React from 'react'
import {action} from '@storybook/addon-actions'
import AppWithRedux from '../components/AppWithRedux'
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator'

export default {
    title: 'AppWithRedux Stories',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = (props: any) => {
    return (<AppWithRedux />)
}


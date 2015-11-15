/**
 * Created by Bruno Grieder.
 * This file is not part of the original UIExplorer
 */

import React from 'react-native'

interface RNTSExample extends React.ComponentClass<any> {

    title: string
    description: string
    render: () => React.ReactElement<any>
}

export default RNTSExample
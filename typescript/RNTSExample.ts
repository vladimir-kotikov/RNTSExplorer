/**
 * Created by Bruno Grieder.
 * This file is not part of the original UIExplorer
 */

import * as React from 'react';

interface RNTSExample extends React.ComponentClass<any> {

    title: string
    description: string
    render: () => React.ReactElement<any>
}

export default RNTSExample
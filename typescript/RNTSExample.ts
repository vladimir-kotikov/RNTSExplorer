/**
 * Created by Bruno Grieder.
 * This file is not part of the original UIExplorer
 */


interface RNTSExample extends React.ComponentClass<any> {

    title: string
    description: string
    displayName?: string

    render: () => React.ReactElement<any>
}

export default RNTSExample
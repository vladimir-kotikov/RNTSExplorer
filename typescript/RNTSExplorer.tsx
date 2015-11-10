/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Typescript rewrite by Bruno Grieder
 *
 */

'use strict'

import React from 'react-native'
const { NavigatorIOS } = React;

import RNTSExplorerList from './RNTSExplorerList'


const styles = React.StyleSheet.create(
    {
        container: {
                       flex: 1
                   } as React.ViewStyle,

        itemWrapper: {
                         backgroundColor: '#eaeaea'
                     } as React.ViewStyle
    }
)

module RNTSExplorerApp {

    export interface State {
        openExternalExample: any //FIXME type
    }

}

class RNTSExplorerApp extends React.Component<any, RNTSExplorerApp.State> {


    componentWillMount() {
        this.setState( { openExternalExample: null } )
    }


    render() {
        if ( this.state.openExternalExample ) {
            const Example = this.state.openExternalExample
            return (
                <Example
                    onExampleExit={() => this.setState({ openExternalExample: null }) }
                />
            )
        }
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                      title: 'RNTSExplorer',
                      component: RNTSExplorerList,
                      passProps: {
                            onExternalExampleRequested: (example: any) => this.setState({ openExternalExample: example })
                            }
                }}
                itemWrapperStyle={styles.itemWrapper}
                tintColor='#008888'
            />
        )
    }
}

export default RNTSExplorerApp

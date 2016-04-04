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
 */

'use strict'

import * as React from 'react-native';
import RNTSExample from '../RNTSExample'
import RNTSExampleModule from '../RNTSExampleModule'

const {
          AppStateIOS,
          Text,
          View
          } = React

export interface State {
    appState: string
    previousAppStates: string[]

}

class AppStateSubscription extends React.Component<any,State> {
    componentWillMount() {
        this.setState(
            {
                appState:          AppStateIOS.currentState,
                previousAppStates: []
            }
        )
    }

    componentDidMount() {
        AppStateIOS.addEventListener( 'change', this._handleAppStateChange )
    }

    componentWillUnmount() {
        AppStateIOS.removeEventListener( 'change', this._handleAppStateChange )
    }

    private _handleAppStateChange = ( appState: string ): void => {
        var previousAppStates = this.state.previousAppStates.slice()
        previousAppStates.push( this.state.appState )
        this.setState(
            {
                appState,
                previousAppStates
            }
        )
    }

    render() {
        if ( this.props.showCurrentOnly ) {
            return (
                <View>
                    <Text>{this.state.appState}</Text>
                </View>
            )
        }
        return (
            <View>
                <Text>{JSON.stringify(this.state.previousAppStates)}</Text>
            </View>
        )
    }
}


export default {
    title:       'AppStateIOS',
    description: 'iOS app background status',
    examples:    [
        {
            title:       'AppStateIOS.currentState',
            description: 'Can be null on app initialization',
            render() { return <Text>{AppStateIOS.currentState}</Text> }
        } as RNTSExample,
        {
            title:       'Subscribed AppStateIOS:',
            description: 'This changes according to the current state, so you can only ever see it rendered as "active"',
            render:      (): React.ReactElement<any>  => {
                return <AppStateSubscription showCurrentOnly={true}/>
            }
        } as RNTSExample,
        {
            title:  'Previous states:',
            render: (): React.ReactElement<any>  => {
                return <AppStateSubscription showCurrentOnly={false}/>
            }
        } as RNTSExample
    ]
} as RNTSExampleModule

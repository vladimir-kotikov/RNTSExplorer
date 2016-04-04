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
          ActionSheetIOS,
          StyleSheet,
          Text,
          View
          } = React

const BUTTONS = [
    'Button Index: 0',
    'Button Index: 1',
    'Button Index: 2',
    'Destruct',
    'Cancel',
]
const DESTRUCTIVE_INDEX = 3
const CANCEL_INDEX = 4

const style = StyleSheet.create(
    {
        button: {
            marginBottom: 10,
            fontWeight:   '500'
        }
    }
)


export interface ActionSheetState {
    clicked: string
}

class ActionSheetExample extends React.Component<any,ActionSheetState> {

    componentWillMount() {
        this.setState( { clicked: 'none' } )
    }

    render() {
        return (
            <View>
                <Text onPress={this.showActionSheet} style={style.button}>
                    Click to show the ActionSheet
                </Text>
                <Text>
                    Clicked button at index: \"{this.state.clicked}\"
                </Text>
            </View>
        )
    }

    private showActionSheet = (): void => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options:                BUTTONS,
                cancelButtonIndex:      CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
            },
            ( buttonIndex ) => {
                this.setState( { clicked: BUTTONS[ buttonIndex ] } )
            }
        )
    }
}

interface ShareActionSheetState {
    text: string
}

class ShareActionSheetExample extends React.Component<any,ShareActionSheetState> {
    componentWillMount() {
        this.setState( { text: '' } )
    }

    render() {
        return (
            <View>
                <Text onPress={this.showShareActionSheet} style={style.button}>
                    Click to show the Share ActionSheet
                </Text>
                <Text>
                    {this.state.text}
                </Text>
            </View>
        )
    }

    private showShareActionSheet = (): void => {
        ActionSheetIOS.showShareActionSheetWithOptions(
            {
                url: 'https://code.facebook.com',
            },
            ( error ) => {
                console.error( error )
            },
            ( success, method ) => {
                let text = success ? `Shared via ${method}` : 'You didn\'t share'
                this.setState( { text } )
            }
        )
    }
}

export default {

    title:       'ActionSheetIOS',
    description: 'Interface to show iOS\' action sheets',
    examples:    [
        {
            title:  'Show Action Sheet',
            render: (): React.ReactElement<any> => { return (<ActionSheetExample />) }
        } as RNTSExample,
        {
            title:  'Show Share Action Sheet',
            render: (): React.ReactElement<any> => { return (<ShareActionSheetExample />) }
        } as RNTSExample
    ]
} as RNTSExampleModule

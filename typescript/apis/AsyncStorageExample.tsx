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

import * as React from 'react';
import RNTSExample from '../RNTSExample'
import RNTSExampleModule from '../RNTSExampleModule'

import {
          AsyncStorage,
          PickerIOS,
          Text,
          View
} from 'react-native';
const PickerItemIOS = PickerIOS.Item

const STORAGE_KEY = '@AsyncStorageExample:key'
const COLORS = [ 'red', 'orange', 'yellow', 'green', 'blue' ]

interface State {
    selectedValue?: string
    messages?: string[]
}

class BasicStorageExample extends React.Component<any, State> {

    componentWillMount() {
        this.setState(
            {
                selectedValue: COLORS[ 0 ],
                messages:      []
            }
        )
    }

    componentDidMount() {
        AsyncStorage.getItem( STORAGE_KEY )
            .then( ( value ) => {
                if ( value !== null ) {
                    this.setState( { selectedValue: value } )
                    this._appendMessage( 'Recovered selection from disk: ' + value )
                }
                else {
                    this._appendMessage( 'Initialized with no selection on disk.' )
                }
            } )
            .catch( ( error ) => this._appendMessage( 'AsyncStorage error: ' + error.message ) )
            .done()
    }


    render() {
        var color = this.state.selectedValue
        return (
            <View>
                <PickerIOS
                    selectedValue={color}
                    onValueChange={this._onValueChange}>
                    {COLORS.map((value) => (
                    <PickerItemIOS
                        key={value}
                        value={value}
                        label={value}
                    />
                        ))}
                </PickerIOS>
                <Text>
                    {'Selected: '}
                    <Text style={{color}}>
                        {this.state.selectedValue}
                    </Text>
                </Text>
                <Text>{' '}</Text>
                <Text onPress={this._removeStorage}>
                    Press here to remove from storage.
                </Text>
                <Text>{' '}</Text>
                <Text>Messages:</Text>
                {this.state.messages.map((m) => <Text>{m}</Text>)}
            </View>
        )
    }

    private _onValueChange = ( selectedValue: string ): void => {
        this.setState( { selectedValue } )
        AsyncStorage.setItem( STORAGE_KEY, selectedValue )
            .then( () => this._appendMessage( 'Saved selection to disk: ' + selectedValue ) )
            .catch( ( error ) => this._appendMessage( 'AsyncStorage error: ' + error.message ) )
            .done()
    }

    private _removeStorage = (): void => {
        AsyncStorage.removeItem( STORAGE_KEY )
            .then( () => this._appendMessage( 'Selection removed from disk.' ) )
            .catch( ( error ) => { this._appendMessage( 'AsyncStorage error: ' + error.message ) } )
            .done()
    }

    private _appendMessage = ( message: string ): void => {
        this.setState( { messages: this.state.messages.concat( message ) } )
    }
}

export default {

    title:       'AsyncStorage',
    description: 'Asynchronous local disk storage.',
    examples:    [
        {
            title:  'Basics - getItem, setItem, removeItem',
            render: (): React.ReactElement<any>  => { return <BasicStorageExample /> }
        } as RNTSExample
    ]
} as RNTSExampleModule

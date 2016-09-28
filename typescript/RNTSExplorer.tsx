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

import * as React from 'react';
import { Component } from 'react';
import {
  NavigatorIOS,
  StyleSheet,
  ViewStyle,
  Text,
  View
} from 'react-native';

import RNTSExplorerList from './RNTSExplorerList'

const styles = StyleSheet.create(
    {
        itemWrapper: {
                         backgroundColor: '#eaeaea'
                     } as ViewStyle,
        container: {
            flex: 1,
            justifyContent: 'center',
            //alignItems: 'center',
            backgroundColor: '#F5FCFF',
        } as ViewStyle,
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        } as ViewStyle,
        instructions: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
        } as ViewStyle,
    }
)

module RNTSExplorerApp {

    export interface State {
        openExternalExample: any //FIXME type
    }

}

class RNTSExplorerApp extends Component<any, RNTSExplorerApp.State> {


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

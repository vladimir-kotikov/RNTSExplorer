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
          StyleSheet,
          TabBarIOS,
          Text,
          View,
} from 'react-native';

const styles = StyleSheet.create(
    {
        tabContent: {
            flex:       1,
            alignItems: 'center',
        },
        tabText:    {
            color:  'white',
            margin: 50
        }
    }
)

interface State {
    selectedTab: string
    notifCount?: number
    presses?: number
}

class TabBarExample extends React.Component<any,State> {
    static get title() { return '<TabBarIOS>' }

    static get description() { return 'Tab-based navigation.' }

    componentWillMount() {
        this.setState(
            {
                selectedTab: 'redTab',
                notifCount:  0,
                presses:     0,
            }
        )
    }

    private _renderContent = ( color: string, pageText: string ): JSX.Element => {
        return (
            <View style={[styles.tabContent, {backgroundColor: color}]}>
                <Text style={styles.tabText}>{pageText}</Text>
                <Text style={styles.tabText}>{this.state.presses} re-renders of the More tab</Text>
            </View>
        )
    }

    render() {
        return (
            <TabBarIOS>
                <TabBarIOS.Item
                    title="Blue Tab"
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => {
                        this.setState({ selectedTab: 'blueTab',})
                    }}>
                    {this._renderContent('#414A8C', 'Blue Tab')}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    systemIcon="history"
                    badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'redTab',
                            notifCount: this.state.notifCount + 1,
                        })
                    }}>
                    {this._renderContent('#783E33', 'Red Tab')}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    systemIcon="more"
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'greenTab',
                            presses: this.state.presses + 1
                        })
                    }}>
                    {this._renderContent('#21551C', 'Green Tab')}
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }

}


export default TabBarExample

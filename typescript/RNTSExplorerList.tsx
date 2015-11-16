import RNTSExampleModule from "./RNTSExampleModule";
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

import React from 'react-native'
const {
          AppRegistry,
          ListView,
          PixelRatio,
          StyleSheet,
          Text,
          TextInput,
          TouchableHighlight,
          View
          } = React
const { TestModule } = React.addons

import createExamplePage from './createExamplePage'
//import createExamplePage from '../js/createExamplePage'

import RNTSExample from './RNTSExample'
import NavigatorIOSExample from './components/NavigatorIOSExample'
import NavigatorExample from './components/navigator/NavigatorExample'
import ViewExample from './components/ViewExample'
import ActivityIndicatorIOSExample from './components/ActivityIndicatorIOSExample'
import DatePickerIOSExample from './components/DatePickerIOSExample'
import ImageExample from './components/ImageExample'
import ListViewExample from './components/ListViewExample'
import ListViewPagingExample from './components/ListViewPagingExample'
import MapViewExample from './components/MapViewExample'
import PickerIOSExample from './components/PickerIOSExample'
import ScrollViewExample from './components/ScrollViewExample'
import SliderIOSExample from './components/SliderIOSExample'
import SwitchIOSExample from './components/SwitchIOSExample'
import TabBarIOSExample from './components/TabBarIOSExample'
import TextExample from './components/TextExample.ios'
import TextInputExample from './components/TextInputExample'
import TouchableExample from './components/TouchableExample'
import WebViewExample from './components/WebViewExample'


const COMPONENTS: RNTSExampleModule[] = [
    ActivityIndicatorIOSExample,
    DatePickerIOSExample,
    ImageExample,
    ListViewExample,
    ListViewPagingExample,
    MapViewExample,
    NavigatorExample,
    NavigatorIOSExample,
    PickerIOSExample,
    ScrollViewExample,
    SliderIOSExample,
    SwitchIOSExample,
    TabBarIOSExample,
    TextExample,
    TextInputExample,
    TouchableExample,
    ViewExample,
    WebViewExample
]

import ActionSheetIOSExample from './apis/ActionSheetIOSExample'
import AdSupportIOSExample  from './apis/AdSupportIOSExample'
import AlertIOSExample from './apis/AlertIOSExample'
import AppStateIOSExample from './apis/AppStateIOSExample'
import AsyncStorageExample from './apis/AsyncStorageExample'
import BorderExample from './apis/BorderExample'
import CameraRollExample from './apis/CameraRollExample.ios'
import GeolocationExample from './apis/GeolocationExample'
import LayoutExample from './apis/LayoutExample'

const NetInfoExample  = require('../js/NetInfoExample')
const PanResponderExample  = require('../js/PanResponderExample')
const PointerEventsExample  = require('../js/PointerEventsExample')
const PushNotificationIOSExample  = require('../js/PushNotificationIOSExample')
const StatusBarIOSExample  = require('../js/StatusBarIOSExample')
const TimerExample  = require('../js/TimerExample')
const VibrationIOSExample  = require('../js/VibrationIOSExample')

const APIS: RNTSExampleModule[] = [
    ActionSheetIOSExample,
    AdSupportIOSExample,
    AlertIOSExample,
    AppStateIOSExample,
    AsyncStorageExample,
    BorderExample,
    CameraRollExample,
    GeolocationExample,
    LayoutExample,
    NetInfoExample,
    PanResponderExample,
    PointerEventsExample,
    PushNotificationIOSExample,
    StatusBarIOSExample,
    TimerExample,
    VibrationIOSExample
]

const ds = new ListView.DataSource( {
    rowHasChanged:           ( r1, r2 ) => r1 !== r2,
    sectionHeaderHasChanged: ( h1, h2 ) => h1 !== h2
} )

const makeRenderable = ( example: any ): RNTSExample  => {
    return example.examples ? createExamplePage( null, example ) : example
}

// Register suitable examples for snapshot tests
COMPONENTS.concat( APIS ).forEach( ( Example: RNTSExampleModule ) => {

    if ( Example.displayName ) {
        const Snapshotter = React.createClass(
            {
                componentDidMount: () => {
                    // View is still blank after first RAF :\
                    global.requestAnimationFrame(
                        () => global.requestAnimationFrame(
                            () => TestModule.verifySnapshot( TestModule.markTestCompleted )
                        )
                    )
                },
                render:            () => {
                    const Renderable: React.ComponentClass<any> = makeRenderable( Example )
                    return (<Renderable />)
                }
            }
        )
        AppRegistry.registerComponent( Example.displayName, () => Snapshotter )
    }
} )

const styles = StyleSheet.create(
    {
        listContainer: {
            flex: 1,
        },

        list: {
                  backgroundColor: '#eeeeee'
              } as React.ScrollViewStyle,

        sectionHeader: {
            padding: 5
        },

        group:              {
            backgroundColor: 'white',
        },
        sectionHeaderTitle: {
            fontWeight: '500',
            fontSize:   11
        },
        row:                {
            backgroundColor:   'white',
            justifyContent:    'center',
            paddingHorizontal: 15,
            paddingVertical:   8
        },
        separator:          {
            height:          1 / PixelRatio.get(),
            backgroundColor: '#bbbbbb',
            marginLeft:      15
        },
        rowTitleText:       {
            fontSize:   17,
            fontWeight: '500',
        },
        rowDetailText:      {
            fontSize:   15,
            color:      '#888888',
            lineHeight: 20
        },
        searchRow:          {
            backgroundColor: '#eeeeee',
            paddingTop:      75,
            paddingLeft:     10,
            paddingRight:    10,
            paddingBottom:   10
        },
        searchTextInput:    {
            backgroundColor: 'white',
            borderColor:     '#cccccc',
            borderRadius:    3,
            borderWidth:     1,
            height:          30,
            paddingLeft:     8
        }
    }
)

class RNTSExplorerList extends React.Component<any,any> {

    constructor( props: any ) {
        super( props )
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(
                {
                    components: COMPONENTS,
                    apis:       APIS
                }
            )
        }
    }

    render() {
        return (
            <View style={styles.listContainer}>
                <View style={styles.searchRow}>
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="always"
                        onChangeText={this._search}
                        placeholder="Search..."
                        style={styles.searchTextInput}
                    />
                </View>
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderSectionHeader={this._renderSectionHeader}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        )
    }

    private _renderSectionHeader = ( data: any, section: string ): JSX.Element => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderTitle}>
                    {section.toUpperCase()}
                </Text>
            </View>
        )
    }

    private _renderRow = ( example: any, i: string ): JSX.Element => {
        return (
            <View key={i}>
                <TouchableHighlight onPress={() => this._onPressRow(example)}>
                    <View style={styles.row}>
                        <Text style={styles.rowTitleText}>
                            {example.title}
                        </Text>
                        <Text style={styles.rowDetailText}>
                            {example.description}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator}/>
            </View>
        )
    }

    private _search = ( text: string ): void => {
        var regex = new RegExp( text, 'i' )
        var filter = ( component: any ) => regex.test( component.title )

        this.setState(
            {
                dataSource: ds.cloneWithRowsAndSections(
                    {
                        components: COMPONENTS.filter( filter ),
                        apis:       APIS.filter( filter )
                    }
                )
            }
        )
    }

    private _onPressRow = ( example: any ): void => {
        if ( example === NavigatorExample ) {
            this.props.onExternalExampleRequested(
                NavigatorExample
            )
            return
        }
        var Component = makeRenderable( example )
        this.props.navigator.push(
            {
                title:     Component.title,
                component: Component
            }
        )
    }
}

export default RNTSExplorerList

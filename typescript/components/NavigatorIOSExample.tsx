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
import createExamplePage from '../createExamplePage'

import ViewExample from './ViewExample'

const {
          PixelRatio,
          ScrollView,
          StyleSheet,
          Text,
          TouchableHighlight,
          View,
          } = React

interface Style { 
  customWrapperStyle: React.ViewStyle,
  emptyPage: React.ViewStyle,
  emptyPageText: React.TextStyle,
  list: React.TextStyle,
  group: React.TextStyle,
  groupSpace: React.TextStyle,
  line: React.TextStyle,
  row: React.TextStyle,
  separator: React.ViewStyle,
  rowNote: React.TextStyle,
  rowText: React.TextStyle,
}

const styles = StyleSheet.create<Style>(
    {
        customWrapperStyle: {
            backgroundColor: '#bbdddd',
        },
        emptyPage:          {
            flex:       1,
            paddingTop: 64
        },
        emptyPageText:      {
            margin: 10
        },
        list:               {
            backgroundColor: '#eeeeee',
            marginTop:       10
        },
        group:              {
            backgroundColor: 'white',
        },
        groupSpace:         {
            height: 15
        },
        line:               {
            backgroundColor: '#bbbbbb',
            height:          1 / PixelRatio.get(),
        },
        row:                {
            backgroundColor:   'white',
            justifyContent:    'center',
            paddingHorizontal: 15,
            paddingVertical:   15
        },
        separator:          {
            height:          1 / PixelRatio.get(),
            backgroundColor: '#bbbbbb',
            marginLeft:      15
        },
        rowNote:            {
            fontSize: 17
        },
        rowText:            {
            fontSize:   17,
            fontWeight: '500'
        }
    }
)

class EmptyPage extends React.Component<any,any> {

    render() {
        return (
            <View style={styles.emptyPage}>
                <Text style={styles.emptyPageText}>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

module NavigatorIOSExample {

    export interface Props {
        navigator: React.NavigationIOS
        route: React.Route
        topExampleRoute?: React.Route
    }
}

class NavigatorIOSExample extends React.Component<NavigatorIOSExample.Props,any> {

    public static get title() { return '<NavigatorIOS>' }

    public static get description() { return 'iOS navigation capabilities' }

    render() {
        let recurseTitle = 'Recurse Navigation';
        if ( !this.props.topExampleRoute ) {
            recurseTitle += ' - more examples here';
        }
        return (

            <ScrollView style={styles.list}>
                <View style={styles.line}/>
                <View style={styles.group}>
                    <View style={styles.row}>
                        <Text style={styles.rowNote}>
                            See RNTSExplorerApp.tsx for top-level usage.
                        </Text>
                    </View>
                </View>
                <View style={styles.line}/>
                <View style={styles.groupSpace}/>
                <View style={styles.line}/>
                <View style={styles.group}>
                    {this._renderRow(recurseTitle, () => {
                        this.props.navigator.push({
                            title: NavigatorIOSExample.title,
                            component: NavigatorIOSExample,
                            backButtonTitle: 'Custom Back',
                            passProps: {topExampleRoute: this.props.topExampleRoute || this.props.route},
                            });
                        })}
                    {this._renderRow('Push View Example', () => {
                        this.props.navigator.push({
                            title: 'Very Long Custom View Example Title',
                            component: createExamplePage(null, ViewExample),
                            });
                        })}
                    {this._renderRow('Custom Right Button', () => {
                        this.props.navigator.push({
                            title: NavigatorIOSExample.title,
                            component: EmptyPage,
                            rightButtonTitle: 'Cancel',
                            onRightButtonPress: () => this.props.navigator.pop(),
                            passProps: {
                                text: 'This page has a right button in the nav bar',
                                }
                            });
                        })}
                    {this._renderRow('Pop', () => {
                        this.props.navigator.pop();
                        })}
                    {this._renderRow('Pop to top', () => {
                        this.props.navigator.popToTop();
                        })}
                    {this._renderRow('Replace here', () => {
                        var prevRoute = this.props.route;
                        this.props.navigator.replace({
                            title: 'New Navigation',
                            component: EmptyPage,
                            rightButtonTitle: 'Undo',
                            onRightButtonPress: () => this.props.navigator.replace(prevRoute),
                            passProps: {
                                text: 'The component is replaced, but there is currently no ' +
                                    'way to change the right button or title of the current route',
                                }
                            });
                        })}
                    {this._renderReplacePrevious()}
                    {this._renderReplacePreviousAndPop()}
                    {this._renderPopToTopNavExample()}
                </View>
                <View style={styles.line}/>
            </ScrollView>
        )
    }


    private _renderPopToTopNavExample = (): JSX.Element => {
        if ( !this.props.topExampleRoute ) {
            return null;
        }
        return this._renderRow( 'Pop to top NavigatorIOSExample', () => {
            this.props.navigator.popToRoute( this.props.topExampleRoute );
        } )
    }

    private _renderReplacePrevious = (): JSX.Element => {
        if ( !this.props.topExampleRoute ) {
            // this is to avoid replacing the UIExplorerList at the top of the stack
            return null;
        }
        return this._renderRow( 'Replace previous', () => {
            this.props.navigator.replacePrevious(
                {
                    title:        'Replaced',
                    component:    EmptyPage,
                    passProps:    {
                        text: 'This is a replaced "previous" page',
                    },
                    wrapperStyle: styles.customWrapperStyle,
                }
            )
        } )
    }

    private _renderReplacePreviousAndPop = (): JSX.Element => {

        if ( !this.props.topExampleRoute ) {
            // this is to avoid replacing the UIExplorerList at the top of the stack
            return null;
        }
        return this._renderRow( 'Replace previous and pop', () => {
            this.props.navigator.replacePreviousAndPop(
                {
                    title:        'Replaced and Popped',
                    component:    EmptyPage,
                    passProps:    {
                        text: 'This is a replaced "previous" page'
                    },
                    wrapperStyle: styles.customWrapperStyle,
                }
            )
        } )
    }

    private _renderRow = ( title: string, onPress: () => void ): JSX.Element => {
        return (
            <View>
                <TouchableHighlight onPress={onPress}>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>
                            {title}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator}/>
            </View>
        )
    }


}


export default NavigatorIOSExample

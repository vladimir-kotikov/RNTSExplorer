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
import {
          Navigator,
          PixelRatio,
          StyleSheet,
          ScrollView,
          TabBarIOS,
          Text,
          TouchableHighlight,
          View,
          } from 'react-native';

interface Style {
  button: React.ViewStyle,
  buttonText: React.TextStyle,
  appContainer: React.ViewStyle,
  messageText: React.TextStyle,
  scene: React.ViewStyle,
  tabs: React.ViewStyle,
}

const styles = StyleSheet.create<Style>(
    {
        button:       {
            backgroundColor:   'white',
            padding:           15,
            borderBottomWidth: 1 / PixelRatio.get(),
            borderBottomColor: '#CDCDCD',
        },
        buttonText: {
            fontSize:   17,
            fontWeight: '500',
        },
        appContainer: {
            overflow:        'hidden',
            backgroundColor: '#dddddd',
            flex:            1,
        },
        messageText:  {
            fontSize:   17,
            fontWeight: '500',
            padding:    15,
            marginTop:  50,
            marginLeft: 15,
        },
        scene:        {
            flex:            1,
            paddingTop:      20,
            backgroundColor: '#EAEAEA',
        },
        tabs:         {
            height: 50,
        }
    }
)

interface RandomRoute extends React.Route {
    randNumber: number
}


const _getRandomRoute = (): RandomRoute => {
    return {
        randNumber: Math.ceil( Math.random() * 1000 )
    }
}

class NavButton extends React.Component<any,any> {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#B5B5B5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }
}

const ROUTE_STACK: RandomRoute[] = [
    _getRandomRoute(),
    _getRandomRoute(),
    _getRandomRoute(),
]
const INIT_ROUTE_INDEX = 1


module JumpingNavBar {
    export interface Props extends React.NavigatorStatic.NavigationBarProperties {
        initTabIndex: number
        onTabIndex: ( index: number ) => void
        routeStack: RandomRoute[]
    }
}


class JumpingNavBar extends React.Component<JumpingNavBar.Props,any> {

    constructor( props: JumpingNavBar.Props ) {
        super( props )
        this.state = {
            tabIndex: props.initTabIndex,
        }
    }

    handleWillFocus( route: RandomRoute ) {
        const tabIndex = ROUTE_STACK.indexOf( route )
        this.setState( { tabIndex, } )
    }

    render() {

        return (
            <View style={styles.tabs}>
                <TabBarIOS>
                    <TabBarIOS.Item
                        icon={require('../../../images/tabnav_notification.png')}
                        selected={this.state.tabIndex === 0}
                        onPress={() => {
                          this.props.onTabIndex(0)
                          this.setState({ tabIndex: 0, })
                        }}>
                        <View />
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                        icon={require('../../../images/tabnav_list.png')}
                        selected={this.state.tabIndex === 1}
                        onPress={() => {
                          this.props.onTabIndex(1)
                          this.setState({ tabIndex: 1, })
                        }}>
                        <View />
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                        icon={require('../../../images/tabnav_settings.png')}
                        selected={this.state.tabIndex === 2}
                        onPress={() => {
                          this.props.onTabIndex(2)
                          this.setState({ tabIndex: 2, })
                        }}>
                        <View />
                    </TabBarIOS.Item>
                </TabBarIOS>
            </View>
        )
    }
}

class JumpingNavSample extends React.Component<any,any> {


    private _navigator: React.Navigator
    private _navBar: React.NavigatorStatic.NavigationBar

    render() {
        return (
            <Navigator
                // TODO: double-check debugOverlay existence on Navigator
                // debugOverlay={false}
                //TODO: Fix this use case
                ref={(navigator: any) => this._navigator = navigator}
                initialRoute={ROUTE_STACK[INIT_ROUTE_INDEX]}
                initialRouteStack={ROUTE_STACK}
                renderScene={this.renderScene}
                configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
                navigationBar={
                    <JumpingNavBar
                        ref={(navBar: any) => this._navBar = navBar }
                        initTabIndex={INIT_ROUTE_INDEX}
                        routeStack={ROUTE_STACK}
                        onTabIndex={(index) => {
                          this._navigator.jumpTo(ROUTE_STACK[index])
                        }}
                    />
                }
            />
        )
    }


    private renderScene = ( route: RandomRoute, navigator: React.Navigator ): JSX.Element => {

        var backBtn: JSX.Element
        var forwardBtn: JSX.Element

        if ( ROUTE_STACK.indexOf( route ) !== 0 ) {
            backBtn = (
                <NavButton
                    onPress={() => navigator.jumpBack()}
                    text="jumpBack"
                />
            )
        }

        if ( ROUTE_STACK.indexOf( route ) !== ROUTE_STACK.length - 1 ) {
            forwardBtn = (
                <NavButton
                    onPress={() => navigator.jumpForward()}
                    text="jumpForward"
                />
            )
        }

        return (
            <ScrollView style={styles.scene}>
                <Text style={styles.messageText}>#{route.randNumber}</Text>
                {backBtn}
                {forwardBtn}
                <NavButton
                    onPress={() => navigator.jumpTo(ROUTE_STACK[1])}
                    text="jumpTo middle route"
                />
                <NavButton
                    onPress={() => this.props.navigator.pop()}
                    text="Exit Navigation Example"
                />
                <NavButton
                    onPress={() => this.props.navigator.push({
                        message: 'Came from jumping example'
                    })}
                    text="Nav Menu"
                />
            </ScrollView>
        )
    }
}


export default JumpingNavSample

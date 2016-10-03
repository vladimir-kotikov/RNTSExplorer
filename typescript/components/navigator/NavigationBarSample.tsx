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

import * as React from 'react';
import {
          PixelRatio,
          Navigator,
          ScrollView,
          StyleSheet,
          Text,
          TouchableHighlight,
          TouchableOpacity,
          View
          } from 'react-native';

interface Style {
  messageText: React.TextStyle,
  button: React.ViewStyle,
  buttonText: React.TextStyle,
  navBar: React.ViewStyle,
  navBarText: React.TextStyle,
  navBarTitleText: React.TextStyle,
  navBarLeftButton: React.ViewStyle,
  navBarRightButton: React.ViewStyle,
  navBarButtonText: React.TextStyle,
  scene: React.ViewStyle,
}

const styles = StyleSheet.create<Style>(
    {
        messageText:       {
            fontSize:   17,
            fontWeight: '500',
            padding:    15,
            marginTop:  50,
            marginLeft: 15,
        },
        button:      {
            backgroundColor:   'white',
            padding:           15,
            borderBottomWidth: 1 / PixelRatio.get(),
            borderBottomColor: '#CDCDCD',
        },
        buttonText:  {
            fontSize:   17,
            fontWeight: '500',
        },
        navBar:      {
            backgroundColor: 'white',
        },
        navBarText:  {
            fontSize:       16,
            marginVertical: 10,
        },
        navBarTitleText: {
            color:          '#373e4d',
            fontWeight:     '500',
            marginVertical: 9,
        },
        navBarLeftButton: {
            paddingLeft: 10,
        },
        navBarRightButton: {
            paddingRight: 10,
        },
        navBarButtonText:  {
            color: '#5890ff',
        },
        scene:             {
            flex:            1,
            paddingTop:      20,
            backgroundColor: '#EAEAEA',
        },
    }
)


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

const NavigationBarRouteMapper = {

    LeftButton: function ( route: React.Route, nav: React.Navigator, index: number, navState: React.NavigatorStatic.NavState ) {
        if ( index === 0 ) {
            return null
        }

        var previousRoute = navState.routeStack[ index - 1 ]
        return (
            <TouchableOpacity
                onPress={() => nav.pop()}>
                <View style={styles.navBarLeftButton}>
                    <Text style={[styles.navBarText, styles.navBarButtonText]}>
                        {previousRoute.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    },

    RightButton: function ( route: React.Route, navigator: React.Navigator, index: number, navState: React.NavigatorStatic.NavState ) {
        return (
            <TouchableOpacity
                onPress={() => navigator.push(newRandomRoute())}>
                <View style={styles.navBarRightButton}>
                    <Text style={[styles.navBarText, styles.navBarButtonText]}>
                        Next
                    </Text>
                </View>
            </TouchableOpacity>
        )
    },

    Title: function ( route: React.Route, navigator: React.Navigator, index: number, navState: React.NavigatorStatic.NavState ) {
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title} [{index}]
            </Text>
        )
    }

}

function newRandomRoute() {
    return {
        title: '#' + Math.ceil( Math.random() * 1000 )
    }
}

class NavigationBarSample extends React.Component<any,any> {

    render() {
        return (
            <Navigator
                // TODO: double-check if debugOverlay property still exists
                // from looking at the code of Navigator component it does not anymore
                // debugOverlay={false}
                initialRoute={newRandomRoute()}
                renderScene={(route: React.Route, navigator: React.Navigator) => (
                  <ScrollView style={styles.scene}>
                    <Text style={styles.messageText}>{route.content}</Text>
                    <NavButton
                      onPress={() => {
                        navigator.immediatelyResetRouteStack([
                          newRandomRoute(),
                          newRandomRoute(),
                          newRandomRoute(),
                        ])
                      }}
                      text="Reset w/ 3 scenes"
                    />
                    <NavButton
                      onPress={() => {
                        this.props.navigator.pop()
                      }}
                      text="Exit NavigationBar Example"
                    />
                  </ScrollView>
                )}
                navigationBar={
                  <Navigator.NavigationBar
                    routeMapper={NavigationBarRouteMapper}
                    style={styles.navBar}
                  />
                }
            />
        )
    }

}


export default NavigationBarSample

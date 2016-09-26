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
          AlertIOS,
          PushNotificationIOS,
          StyleSheet,
          Text,
          TouchableHighlight,
          View,
          } = React

interface Style { 
  button: React.ViewStyle,
  buttonLabel: React.TextStyle,
}

const styles = StyleSheet.create<Style>(
    {
        button:      {
            padding:        10,
            alignItems:     'center',
            justifyContent: 'center'
        },
        buttonLabel: {
            color: 'blue'
        }
    }
)

class Button extends React.Component<any,any> {

    render() {
        return (
            <TouchableHighlight
                underlayColor={'white'}
                style={styles.button}
                onPress={this.props.onPress}>
                <Text style={styles.buttonLabel}>
                    {this.props.label}
                </Text>
            </TouchableHighlight>
        )
    }
}

class NotificationExample extends React.Component<any,any> {
    componentWillMount() {
        PushNotificationIOS.addEventListener( 'notification', this._onNotification )
    }

    componentWillUnmount() {
        PushNotificationIOS.removeEventListener( 'notification', this._onNotification )
    }

    render() {
        return (
            <View>
                <Button
                    onPress={this._sendNotification}
                    label="Send fake notification"
                />
            </View>
        )
    }

    private _sendNotification = (): void => {
        require( 'RCTDeviceEventEmitter' ).emit( 'remoteNotificationReceived', {
            aps: {
                alert:    'Sample notification',
                badge:    '+1',
                sound:    'default',
                category: 'REACT_NATIVE'
            },
        } )
    }

    private _onNotification = ( notification: React.PushNotification ): void => {
        AlertIOS.alert(
            'Notification Received',
            'Alert message: ' + notification.getMessage(),
            [ {
                text:    'Dismiss',
                onPress: null,
            } ]
        )
    }
}

export interface NotificationPermissionExampleState {
    permissions: React.PushNotificationPermissions
}

class NotificationPermissionExample extends React.Component<any, NotificationPermissionExampleState> {

    constructor( props: any ) {
        super( props )
        this.state = { permissions: null }
    }

    render() {
        return (
            <View>
                <Button
                    onPress={this._showPermissions.bind(this)}
                    label="Show enabled permissions"
                />
                <Text>
                    {JSON.stringify(this.state.permissions)}
                </Text>
            </View>
        )
    }

    private _showPermissions = (): void => {
        PushNotificationIOS.checkPermissions( ( permissions ) => {
            this.setState( { permissions } )
        } )
    }
}


export default {
    title:       'PushNotificationIOS',
    description: 'Apple PushNotification and badge value',
    examples:    [
        {
            title:  'Badge Number',
            render: (): React.ReactElement<any> => {
                PushNotificationIOS.requestPermissions()

                return (
                    <View>
                        <Button
                            onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(42)}
                            label="Set app's icon badge to 42"
                        />
                        <Button
                            onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(0)}
                            label="Clear app's icon badge"
                        />
                    </View>
                )
            }
        } as RNTSExample,
        {
            title:  'Push Notifications',
            render: (): React.ReactElement<any> => {
                return <NotificationExample />
            }
        } as RNTSExample,
        {
            title:  'Notifications Permissions',
            render: (): React.ReactElement<any> => {
                return <NotificationPermissionExample />
            }
        } as RNTSExample
    ]
} as RNTSExampleModule

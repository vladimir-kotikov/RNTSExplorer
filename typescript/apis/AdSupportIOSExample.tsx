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
          AdSupportIOS,
          StyleSheet,
          Text,
          View,
          } = React

const styles = StyleSheet.create(
    {
        title: {
            fontWeight: '500'
        }
    }
)

interface AddSupportState {
    deviceID?: string
    hasAdvertiserTracking?: string
}

class AdSupportIOSExample extends React.Component<any,AddSupportState> {
    componentWillMount() {
        this.setState(
            {
                deviceID:              'No IDFA yet',
                hasAdvertiserTracking: 'unset',
            }
        )
    }

    componentDidMount() {
        AdSupportIOS.getAdvertisingId(
            this._onDeviceIDSuccess,
            this._onDeviceIDFailure
        )

        AdSupportIOS.getAdvertisingTrackingEnabled(
            this._onHasTrackingSuccess,
            this._onHasTrackingFailure
        )
    }

    private _onHasTrackingSuccess = ( hasTracking: boolean ): void => {
        this.setState( { 'hasAdvertiserTracking': hasTracking ? 'true': 'false' } )
    }

    private _onHasTrackingFailure = ( e: Error ): void => {
        this.setState( { 'hasAdvertiserTracking': 'Error!' } )
    }

    private _onDeviceIDSuccess = ( deviceID: string ): void => {
        this.setState( { 'deviceID': deviceID } )
    }

    private _onDeviceIDFailure = ( e: Error ): void => {
        this.setState( { 'deviceID': 'Error!' } )
    }

    render() {
        return (
            <View>
                <Text>
                    <Text style={styles.title}>Advertising ID:</Text>
                    {JSON.stringify(this.state.deviceID)}
                </Text>
                <Text>
                    <Text style={styles.title}>Has Advertiser Tracking:</Text>
                    {JSON.stringify(this.state.hasAdvertiserTracking)}
                </Text>
            </View>
        )
    }
}



export default {
    framework:   'React',
    title:       'Advertising ID',
    description: 'Example of using the ad support API.',
    examples:    [
        {
            title:  'Ad Support IOS',
            render: (): React.ReactElement<any> => {
                return <AdSupportIOSExample />
            }
        } as RNTSExample
    ]
} as RNTSExampleModule
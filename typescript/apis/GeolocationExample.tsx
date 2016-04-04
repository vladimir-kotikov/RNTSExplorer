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
          StyleSheet,
          Text,
          View,
          } = React

const styles = StyleSheet.create(
    {
        title: {
            fontWeight: '500',
        },
    }
)

interface State {
    initialPosition?: Position
    lastPosition?: Position

}

class GeolocationExample extends React.Component<any, State> {
    private watchID: number

    componentWillMount() {
        this.setState(
            {
                initialPosition: null,
                lastPosition:    null
            }
        )
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ( initialPosition ) => this.setState( { initialPosition } ),
            ( error ) => console.error( error )
        )
        this.watchID = navigator.geolocation.watchPosition( ( lastPosition: Position ) => {
            this.setState( { lastPosition } )
        } )
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch( this.watchID )
    }

    render() {
        return (
            <View>
                <Text>
                    <Text style={styles.title}>Initial position:</Text>
                    {JSON.stringify(this.state.initialPosition)}
                </Text>
                <Text>
                    <Text style={styles.title}>Current position:</Text>
                    {JSON.stringify(this.state.lastPosition)}
                </Text>
            </View>
        )
    }
}

export default {

    framework:   'React',
    title:       'Geolocation',
    description: 'Examples of using the Geolocation API.',
    examples:    [
        {
            title:  'navigator.geolocation',
            render: (): React.ReactElement<any> => {
                return <GeolocationExample />
            },
        } as RNTSExample
    ]
} as RNTSExampleModule





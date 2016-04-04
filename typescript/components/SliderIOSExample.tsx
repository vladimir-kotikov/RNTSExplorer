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
          SliderIOS,
          Text,
          StyleSheet,
          View,
          } = React

const styles = StyleSheet.create(
    {
        slider: {
            height: 10,
            margin: 10,
        },
        text:   {
            fontSize:   14,
            textAlign:  'center',
            fontWeight: '500',
            margin:     10,
        },
    }
)

interface State {
    value: number
}

class SliderExample extends React.Component<any,State> {
    componentWillMount() {
        this.setState(
            {
                value: 0
            }
        )
    }

    render() {
        return (
            <View>
                <Text style={styles.text}>
                    {this.state.value}
                </Text>
                <SliderIOS
                    style={styles.slider}
                    onValueChange={(value) => this.setState({value: value})}/>
            </View>
        )
    }
}

export default {
    title:       '<SliderIOS>',
    displayName: 'SliderExample',
    description: 'Slider input for numeric values',
    examples:    [
                     {
                         title: 'SliderIOS',
                         render: (): React.ReactElement<any> => {
                             return <SliderExample />
                         }
                     }
                 ] as RNTSExample[]
} as RNTSExampleModule

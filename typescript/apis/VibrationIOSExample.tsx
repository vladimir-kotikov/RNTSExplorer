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
          View,
          Text,
          TouchableHighlight,
          VibrationIOS
} from 'react-native';

const styles = StyleSheet.create(
    {
        wrapper: {
            borderRadius: 5,
            marginBottom: 5,
        },
        button:  {
            backgroundColor: '#eeeeee',
            padding:         10
        }
    }
)

export default {
    framework:   'React',
    title:       'VibrationIOS',
    description: 'Vibration API for iOS',
    examples:    [
        {
            title: 'VibrationIOS.vibrate()',
            render() {
                return (
                    <TouchableHighlight
                        style={styles.wrapper}
                        onPress={() => VibrationIOS.vibrate()}>
                        <View style={styles.button}>
                            <Text>Vibrate</Text>
                        </View>
                    </TouchableHighlight>
                )
            }
        } as RNTSExample
    ]

} as RNTSExampleModule
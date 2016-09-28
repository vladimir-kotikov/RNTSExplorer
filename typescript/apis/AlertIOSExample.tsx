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
          AlertIOS,
          } from 'react-native';

interface Style { 
  wrapper: React.ViewStyle,
  button: React.ViewStyle,
}

const styles = StyleSheet.create(
    {
        wrapper: {
            borderRadius: 5,
            marginBottom: 5,
        },
        button:  {
            backgroundColor: '#eeeeee',
            padding:         10,
        }
    }
)

export default {
    framework:   'React',
    title:       'AlertIOS',
    description: 'iOS alerts and action sheets',
    examples:    [
        {
            title: 'Alerts',
            render() {
                return (
                    <View>
                        <TouchableHighlight
                            style={styles.wrapper}
                            onPress={() => AlertIOS.alert(
                                'Foo Title',
                                'My Alert Msg'
                            )}
                        >
                            <View style={styles.button}>
                                <Text>Alert with message and default button</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.wrapper}
                            onPress={() => AlertIOS.alert(
                                null,
                                null,
                                [
                                    {text: 'Button', onPress: () => console.log('Button Pressed!')},
                                ]
                            )}
                        >
                            <View style={styles.button}>
                                <Text>Alert with only one button</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.wrapper}
                            onPress={() => AlertIOS.alert(
                                'Foo Title',
                                'My Alert Msg',
                                [
                                    {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
                                    {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
                                ]
                            )}
                        >
                            <View style={styles.button}>
                                <Text>Alert with two buttons</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.wrapper}
                            onPress={() => AlertIOS.alert(
                                'Foo Title',
                                null,
                                [
                                    {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
                                    {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
                                    {text: 'Baz', onPress: () => console.log('Baz Pressed!')},
                                ]
                            )}
                        >
                            <View style={styles.button}>
                                <Text>Alert with 3 buttons</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.wrapper}
                            onPress={() => AlertIOS.alert(
                                'Foo Title',
                                'My Alert Msg',
                                '..............'.split('').map((dot, index) => ({
                                    text: 'Button ' + index,
                                    onPress: () => console.log('Pressed ' + index)
                                }))
                            )}
                        >
                            <View style={styles.button}>
                                <Text>Alert with too many buttons</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                )
            }
        } as RNTSExample
    ]
} as RNTSExampleModule


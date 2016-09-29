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
 * NOTE: Significantly rewritten to just make it work
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
          StatusBarIOS
} from 'react-native';


const styles = StyleSheet.create(
    {
        wrapper: {
            borderRadius: 5,
            marginBottom: 5
        },
        button:  {
            backgroundColor: '#eeeeee',
            padding:         10
        }
    }
)

const styleTouchables: JSX.Element[] = [ 'default', 'light-content' ].map(
    ( style: React.StatusBarStyle ) =>
        <TouchableHighlight
            style={styles.wrapper}
            onPress={() => StatusBarIOS.setStyle(style)}
        >
            <View style={styles.button}>
                <Text>setStyle({style})</Text>
            </View>
        </TouchableHighlight>
)

const styleAnimatedTouchables: JSX.Element[] = [ 'default', 'light-content' ].map(
    ( style: React.StatusBarStyle ) =>
        <TouchableHighlight style={styles.wrapper}
                            onPress={() => StatusBarIOS.setStyle(style, true)}>
            <View style={styles.button}>
                <Text>setStyle({style}, true)</Text>
            </View>
        </TouchableHighlight>
)

const hiddenTouchables: JSX.Element[] = [ 'none', 'fade', 'slide' ].map(
    ( anim: React.StatusBarAnimation ) =>
        <View>
            <TouchableHighlight
                style={styles.wrapper}
                onPress={() => StatusBarIOS.setHidden(true, anim)}
            >
                <View style={styles.button}>
                    <Text>setHidden(true, {anim})</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.wrapper}
                onPress={() => StatusBarIOS.setHidden(false, anim)}
            >
                <View style={styles.button}>
                    <Text>setHidden(false, {anim})</Text>
                </View>
            </TouchableHighlight>
        </View>
)


export default {

    framework:   'React',
    title:       'StatusBarIOS',
    description: 'Module for controlling iOS status bar',
    examples:    [
        {
            title:  'Status Bar Style',
            render: (): React.ReactElement<any> => ( <View>{styleTouchables}</View>)
        } as RNTSExample,
        {
            title:  'Status Bar Style Animated',
            render: (): React.ReactElement<any> => ( <View>{styleAnimatedTouchables}</View>)
        } as RNTSExample,
        {
            title: 'Status Bar Hidden',
            render: (): React.ReactElement<any> => ( <View>{hiddenTouchables}</View>)
        }  as RNTSExample
    ]

} as RNTSExampleModule
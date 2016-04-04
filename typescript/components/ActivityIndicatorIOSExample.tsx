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
import * as reactMixin from 'react-mixin'
import RNTSExample from '../RNTSExample'
import RNTSExampleModule from '../RNTSExampleModule'
import TimerMixin from 'react-timer-mixin'

const {
          ActivityIndicatorIOS,
          StyleSheet,
          View,
          } = React


const styles = StyleSheet.create(
    {
        centering:  {
            alignItems:     'center',
            justifyContent: 'center',
        },
        gray:      {
            backgroundColor: '#cccccc',
        },
        horizontal: {
            flexDirection:  'row',
            justifyContent: 'space-around',
        },
    }
)

namespace ToggleAnimatingActivityIndicator {
    export interface Props extends React.Props<ToggleAnimatingActivityIndicator> {

    }

    export interface State {
        animating: boolean
    }
}

@reactMixin.decorate(TimerMixin)
class ToggleAnimatingActivityIndicator extends React.Component<ToggleAnimatingActivityIndicator.Props,ToggleAnimatingActivityIndicator.State> {

    componentWillMount() {
        this.setState(
            {
                animating: true,
            }
        )
    }

    //Timer Mixin
    private setTimeout : (fn: () => void, millis: number) => void

    private setToggleTimeout = (): void => {
        //timer mixin
        this.setTimeout(
            () => {
                this.setState( { animating: !this.state.animating } )
                this.setToggleTimeout()
            },
            1200
        )
    }

    componentDidMount() {
        this.setToggleTimeout()
    }

    render() {
        return (
            <ActivityIndicatorIOS
                animating={this.state.animating}
                style={[styles.centering, {height: 80}]}
                size="large"
            />
        )
    }
}

export default {
    framework:   'React',
    title:       '<ActivityIndicatorIOS>',
    description: 'Animated loading indicators.',
    examples:    [
                     {
                         title:  'Default (small, white)',
                         render: function () {
                             return (
                                 <ActivityIndicatorIOS
                                     style={[styles.centering, styles.gray, {height: 40}]}
                                     color="white"
                                 />
                             )
                         }
                     },
                     {
                         title:  'Gray',
                         render: function () {
                             return (
                                 <View>
                                     <ActivityIndicatorIOS
                                         style={[styles.centering, {height: 40}]}
                                     />
                                     <ActivityIndicatorIOS
                                         style={[styles.centering, {backgroundColor: '#eeeeee', height: 40}]}
                                     />
                                 </View>
                             )
                         }
                     },
                     {
                         title:  'Custom colors',
                         render: function () {
                             return (
                                 <View style={styles.horizontal}>
                                     <ActivityIndicatorIOS color="#0000ff"/>
                                     <ActivityIndicatorIOS color="#aa00aa"/>
                                     <ActivityIndicatorIOS color="#aa3300"/>
                                     <ActivityIndicatorIOS color="#00aa00"/>
                                 </View>
                             )
                         }
                     },
                     {
                         title:  'Large',
                         render: function () {
                             return (
                                 <ActivityIndicatorIOS
                                     style={[styles.centering, styles.gray, {height: 80}]}
                                     color="white"
                                     size="large"
                                 />
                             )
                         }
                     },
                     {
                         title:  'Large, custom colors',
                         render: function () {
                             return (
                                 <View style={styles.horizontal}>
                                     <ActivityIndicatorIOS
                                         size="large"
                                         color="#0000ff"
                                     />
                                     <ActivityIndicatorIOS
                                         size="large"
                                         color="#aa00aa"
                                     />
                                     <ActivityIndicatorIOS
                                         size="large"
                                         color="#aa3300"
                                     />
                                     <ActivityIndicatorIOS
                                         size="large"
                                         color="#00aa00"
                                     />
                                 </View>
                             )
                         }
                     },
                     {
                         title:  'Start/stop',
                         render: function () {
                             return <ToggleAnimatingActivityIndicator />
                         }
                     }
                 ] as RNTSExample[]
} as RNTSExampleModule


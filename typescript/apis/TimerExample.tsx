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

import React from 'react-native'
import * as reactMixin from 'react-mixin'
import RNTSExample from '../RNTSExample'
import RNTSExampleModule from '../RNTSExampleModule'
import TimerMixin from 'react-timer-mixin'

const {
          AlertIOS,
          StyleSheet,
          Text,
          TouchableHighlight,
          View,
          } = React

const styles = StyleSheet.create(
    {
        button: {
            borderColor:    'gray',
            borderRadius:   8,
            borderWidth:    1,
            padding:        10,
            margin:         5,
            alignItems:     'center',
            justifyContent: 'center'
        }
    }
)

class Button extends React.Component<any,any> {
    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                style={styles.button}
                underlayColor="#eeeeee">
                <Text>
                    {this.props.children}
                </Text>
            </TouchableHighlight>
        )
    }
}


namespace TimerTester {

    export interface Props extends React.Props<TimerTester> {
        type: string
        dt?: number
    }
}

@reactMixin.decorate( TimerMixin )
class TimerTester extends React.Component<TimerTester.Props,any> {


    private _ii: number = 0
    private _iterations: number = 0
    private _start: number = 0
    private _timerFn: () => any
    private _handle: number

    render() {
        var args = 'fn' + (this.props.dt !== undefined ? ', ' + this.props.dt : '')
        return (
            <Button onPress={this._run}>
                Measure: {this.props.type}({args}) - {this._ii || 0}
            </Button>
        )
    }

    private _run = (): void => {
        if ( !this._start ) {
            var d = new Date()
            this._start = d.getTime()
            this._iterations = 100
            this._ii = 0
            if ( this.props.type === 'setTimeout' ) {
                if ( this.props.dt < 1 ) {
                    this._iterations = 5000
                }
                else if ( this.props.dt > 20 ) {
                    this._iterations = 10
                }
                this._timerFn = () => setTimeout( this._run, this.props.dt )
            }
            else if ( this.props.type === 'requestAnimationFrame' ) {
                this._timerFn = () => global.requestAnimationFrame( this._run )
            }
            else if ( this.props.type === 'setImmediate' ) {
                this._iterations = 5000
                this._timerFn = () => setImmediate( this._run )
            }
            else if ( this.props.type === 'setInterval' ) {
                this._iterations = 30 // Only used for forceUpdate periodicity
                this._timerFn = null
                this._handle = setInterval( this._run, this.props.dt )
            }
        }
        if ( this._ii >= this._iterations && !this._handle ) {
            var d = new Date()
            var e = (d.getTime() - this._start)
            var msg = 'Finished ' + this._ii + ' ' + this.props.type + ' calls.\n' +
                      'Elapsed time: ' + e + ' ms\n' + (e / this._ii) + ' ms / iteration'
            console.log( msg )
            AlertIOS.alert( msg )
            this._start = 0
            this.forceUpdate( () => { this._ii = 0 } )
            return
        }
        this._ii++
        // Only re-render occasionally so we don't slow down timers.
        if ( this._ii % (this._iterations / 5) === 0 ) {
            this.forceUpdate()
        }
        this._timerFn && this._timerFn()
    }

    public clear = (): void => {
        clearInterval( this._handle ) // invalid handles are ignored
        if ( this._handle ) {
            // Configure things so we can do a final run to update UI and reset state.
            this._handle = null
            this._iterations = this._ii
            this._run()
        }
    }
}

export default {

    framework:   'React',
    title:       'Timers, TimerMixin',
    description: 'The TimerMixin provides timer functions for executing ' +
                 'code in the future that are safely cleaned up when the component un-mounts.',

    examples: [
        {
            title:       'this.setTimeout(fn, t)',
            description: 'Execute function fn t milliseconds in the future.  If ' +
                         't === 0, it will be enqueued immediately in the next event loop.  ' +
                         'Larger values will fire on the closest frame.',
            render:      (): React.ReactElement<any> => {
                return (
                    <View>
                        <TimerTester type="setTimeout" dt={0}/>
                        <TimerTester type="setTimeout" dt={1}/>
                        <TimerTester type="setTimeout" dt={100}/>
                    </View>
                )
            },
        } as RNTSExample,
        {
            title:       'this.requestAnimationFrame(fn)',
            description: 'Execute function fn on the next frame.',
            render:      (): React.ReactElement<any> => {
                return (
                    <View>
                        <TimerTester type="requestAnimationFrame"/>
                    </View>
                )
            },
        } as RNTSExample,
        {
            title:       'this.setImmediate(fn)',
            description: 'Execute function fn at the end of the current JS event loop.',
            render:      (): React.ReactElement<any> => {
                return (
                    <View>
                        <TimerTester type="setImmediate"/>
                    </View>
                )
            },
        } as RNTSExample,
        {
            title:       'this.setInterval(fn, t)',
            description: 'Execute function fn every t milliseconds until cancelled ' +
                         'or component is unmounted.',
            render:      (): React.ReactElement<any> => {
                var IntervalExample = React.createClass(
                    {
                        getInitialState: function () {
                            return {
                                showTimer: true,
                            }
                        },

                        render: function () {
                            var timerTester: TimerTester
                            var timer: JSX.Element
                            if ( this.state.showTimer ) {
                                timer = <TimerTester ref={(c: TimerTester) => timerTester = c} dt={25} type="setInterval"/>
                                var toggleText = 'Unmount timer'
                            }
                            else {
                                timer = null
                                var toggleText = 'Mount new timer'
                            }
                            return (
                                <View>
                                    {timer}
                                    <Button onPress={() => timerTester.clear() }>
                                        Clear interval
                                    </Button>
                                    <Button onPress={this._toggleTimer}>
                                        {toggleText}
                                    </Button>
                                </View>
                            )
                        },

                        _toggleTimer: function () {
                            this.setState( { showTimer: !this.state.showTimer } )
                        },
                    }
                )
                return <IntervalExample />
            },
        } as RNTSExample
    ]
}as RNTSExampleModule

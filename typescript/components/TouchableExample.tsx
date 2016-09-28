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
          PixelRatio,
          Image,
          StyleSheet,
          Text,
          TouchableHighlight,
          TouchableOpacity,
          View,
} from 'react-native';

interface Style { 
  row: React.ViewStyle,
  icon: React.ViewStyle,
  image: React.ViewStyle,
  text: React.TextStyle,
  button: React.TextStyle,
  wrapper: React.ViewStyle,
  wrapperCustom: React.ViewStyle,
  logBox: React.ViewStyle,
  eventLogBox: React.ViewStyle,
  textBlock: React.TextStyle,
}

const styles = StyleSheet.create<Style>(
    {
        row:           {
            justifyContent: 'center',
            flexDirection:  'row',
        },
        icon: {
            width:  24,
            height: 24,
        },
        image: {
            width:  50,
            height: 50,
        },
        text:  {
            fontSize: 16,
        },
        button: {
            color: '#007AFF',
        },
        wrapper: {
            borderRadius: 8,
        },
        wrapperCustom: {
            borderRadius: 8,
            padding:      6,
        },
        logBox:        {
            padding:         20,
            margin:          10,
            borderWidth:     1 / PixelRatio.get(),
            borderColor:     '#f0f0f0',
            backgroundColor: '#f9f9f9',
        },
        eventLogBox:   {
            padding:         10,
            margin:          10,
            height:          120,
            borderWidth:     1 / PixelRatio.get(),
            borderColor:     '#f0f0f0',
            backgroundColor: '#f9f9f9',
        },
        textBlock:     {
            fontWeight: '500',
            color:      'blue',
        },
    }
)

const heartImage = { uri: 'https://pbs.twimg.com/media/BlXBfT3CQAA6cVZ.png:small' }


interface TextOnPressState {
    timesPressed: number
}

class TextOnPressBox extends React.Component<any,TextOnPressState> {
    componentWillMount() {
        this.setState( { timesPressed: 0 } )
    }

    private textOnPress = (): void => {
        this.setState( { timesPressed: this.state.timesPressed + 1 } )
    }

    render() {
        var textLog = ''
        if ( this.state.timesPressed > 1 ) {
            textLog = this.state.timesPressed + 'x text onPress'
        }
        else if ( this.state.timesPressed > 0 ) {
            textLog = 'text onPress'
        }

        return (
            <View>
                <Text
                    style={styles.textBlock}
                    onPress={this.textOnPress}>
                    Text has built-in onPress handling
                </Text>
                <View style={styles.logBox}>
                    <Text>
                        {textLog}
                    </Text>
                </View>
            </View>
        )
    }
}

interface TouchableState {
    eventLog: string[]
}

class TouchableFeedbackEvents extends React.Component<any, TouchableState> {
    componentWillMount() {
        this.setState( { eventLog: [] } )
    }

    render() {
        return (
            <View>
                <View style={[styles.row, {justifyContent: 'center'}]}>
                    <TouchableOpacity
                        style={styles.wrapper}
                        onPress={() => this._appendEvent('press')}
                        onPressIn={() => this._appendEvent('pressIn')}
                        onPressOut={() => this._appendEvent('pressOut')}
                        onLongPress={() => this._appendEvent('longPress')}>
                        <Text style={styles.button}>
                            Press Me
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.eventLogBox}>
                    {this.state.eventLog.map((e, ii) => <Text key={ii}>{e}</Text>)}
                </View>
            </View>
        )
    }

    private _appendEvent = ( eventName: string ): void => {
        var limit = 6
        var eventLog = this.state.eventLog.slice( 0, limit - 1 )
        eventLog.unshift( eventName )
        this.setState( { eventLog } )
    }
}


//noinspection HtmlUnknownAttribute
export default {
    title:    '<Touchable*> and onPress',
    examples: [
        {
            title:       '<TouchableHighlight>',
            description: 'TouchableHighlight works by adding an extra view with a ' +
                         'black background under the single child view.  This works best when the ' +
                         'child view is fully opaque, although it can be made to work as a simple ' +
                         'background color change as well with the activeOpacity and ' +
                         'underlayColor props.',
            render:      (): React.ReactElement<any> => {
                return (
                    <View>
                        <View style={styles.row}>
                            <TouchableHighlight
                                style={styles.wrapper}
                                onPress={() => console.log('stock THW image - highlight')}>
                                <Image
                                    source={heartImage}
                                    style={styles.image}
                                />
                            </TouchableHighlight>

                            {/* Removed by BGR - not in docs or code: animationVelocity={0} */}
                            <TouchableHighlight
                                style={styles.wrapper}
                                activeOpacity={1}
                                underlayColor="rgb(210, 230, 255)"
                                onPress={() => console.log('custom THW text - hightlight')}>
                                <View style={styles.wrapperCustom}>
                                    <Text style={styles.text}>
                                        Tap Here For Custom Highlight!
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                )
            },
        }, {
            title:  '<Text onPress={fn}> with highlight',
            render: (): React.ReactElement<any> => {
                return <TextOnPressBox />
            },
        }, {
            title:       'Touchable feedback events',
            description: '<Touchable*> components accept onPress, onPressIn, ' +
                         'onPressOut, and onLongPress as props.',
            render:      (): React.ReactElement<any> => {
                return <TouchableFeedbackEvents />
            }
        } ] as RNTSExample[]
} as RNTSExampleModule




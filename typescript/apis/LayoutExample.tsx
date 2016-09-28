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
          Text,
          View,
} from 'react-native';


const styles = StyleSheet.create(
    {
        overlay: {
            backgroundColor: '#aaccff',
            borderRadius:    10,
            borderWidth:     0.5,
            opacity:         0.5,
            padding:         5,
        },
    }
)

import RNTSExplorerBlock from '../RNTSExplorerBlock'
import RNTSExplorerPage from '../RNTSExplorerPage'

class Circle extends React.Component<any,any> {
    render() {
        const size = this.props.size || 20
        return (
            <View
                style={{
          borderRadius: size / 2,
          backgroundColor: '#527fe4',
          width: size,
          height: size,
          margin: 1,
        }}
            />
        )
    }
}

class CircleBlock extends React.Component<any,any> {
    render() {
        const circleStyle = {
            flexDirection:   'row',
            backgroundColor: '#f6f7f8',
            borderWidth:     0.5,
            borderColor:     '#d6d7da',
            marginBottom:    2,
        }
        return (
            <View style={[circleStyle, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

class LayoutExample extends React.Component<any,any> {

    static get title() { return 'Layout - Flexbox' }

    static get description() { return 'Examples of using the flexbox API to layout views.' }

    render() {
        return (
            <RNTSExplorerPage title={this.props.navigator ? null : 'Layout'}>
                <RNTSExplorerBlock title="Flex Direction">
                    <Text>row</Text>
                    <CircleBlock style={{flexDirection: 'row'}}>
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                    </CircleBlock>
                    <Text>column</Text>
                    <CircleBlock style={{flexDirection: 'column'}}>
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                    </CircleBlock>
                    <View style={[styles.overlay, {position: 'absolute', top: 15, left: 160}]}>
                        <Text>{'top: 15, left: 160'}</Text>
                    </View>
                </RNTSExplorerBlock>

                <RNTSExplorerBlock title="Justify Content - Main Direction">
                    <Text>flex-start</Text>
                    <CircleBlock style={{justifyContent: 'flex-start'}}>
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                    </CircleBlock>
                    <Text>center</Text>
                    <CircleBlock style={{justifyContent: 'center'}}>
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                    </CircleBlock>
                    <Text>flex-end</Text>
                    <CircleBlock style={{justifyContent: 'flex-end'}}>
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                    </CircleBlock>
                    <Text>space-between</Text>
                    <CircleBlock style={{justifyContent: 'space-between'}}>
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                    </CircleBlock>
                    <Text>space-around</Text>
                    <CircleBlock style={{justifyContent: 'space-around'}}>
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                        <Circle />
                    </CircleBlock>
                </RNTSExplorerBlock>
                <RNTSExplorerBlock title="Align Items - Other Direction">
                    <Text>flex-start</Text>
                    <CircleBlock style={{alignItems: 'flex-start', height: 30}}>
                        <Circle size={15}/>
                        <Circle size={10}/>
                        <Circle size={20}/>
                        <Circle size={17}/>
                        <Circle size={12}/>
                        <Circle size={15}/>
                        <Circle size={10}/>
                        <Circle size={20}/>
                        <Circle size={17}/>
                        <Circle size={12}/>
                        <Circle size={15}/>
                        <Circle size={10}/>
                        <Circle size={20}/>
                        <Circle size={17}/>
                        <Circle size={12}/>
                        <Circle size={15}/>
                        <Circle size={8}/>
                    </CircleBlock>
                    <Text>center</Text>
                    <CircleBlock style={{alignItems: 'center', height: 30}}>
                        <Circle size={15}/>
                        <Circle size={10}/>
                        <Circle size={20}/>
                        <Circle size={17}/>
                        <Circle size={12}/>
                        <Circle size={15}/>
                        <Circle size={10}/>
                        <Circle size={20}/>
                        <Circle size={17}/>
                        <Circle size={12}/>
                        <Circle size={15}/>
                        <Circle size={10}/>
                        <Circle size={20}/>
                        <Circle size={17}/>
                        <Circle size={12}/>
                        <Circle size={15}/>
                        <Circle size={8}/>
                    </CircleBlock>
                    <Text>flex-end</Text>
                    <CircleBlock style={{alignItems: 'flex-end', height: 30}}>
                        <Circle size={15}/>
                        <Circle size={10}/>
                        <Circle size={20}/>
                        <Circle size={17}/>
                        <Circle size={12}/>
                        <Circle size={15}/>
                        <Circle size={10}/>
                        <Circle size={20}/>
                        <Circle size={17}/>
                        <Circle size={12}/>
                        <Circle size={15}/>
                        <Circle size={10}/>
                        <Circle size={20}/>
                        <Circle size={17}/>
                        <Circle size={12}/>
                        <Circle size={15}/>
                        <Circle size={8}/>
                    </CircleBlock>
                </RNTSExplorerBlock>
                <RNTSExplorerBlock title="Flex Wrap">
                    <CircleBlock style={{flexWrap: 'wrap'}}>
                        {'oooooooooooooooo'.split('').map((char, i) => <Circle key={i}/>)}
                    </CircleBlock>
                </RNTSExplorerBlock>
            </RNTSExplorerPage>
        )
    }
}


export default LayoutExample

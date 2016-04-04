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
        text:              {
            fontSize: 10,
            color:    '#5577cc',
        },
        textPassedThrough: {
            color: '#88aadd',
        },
        box:               {
            backgroundColor: '#aaccff',
            borderWidth:     1,
            borderColor:     '#7799cc',
            padding:         10,
            margin:          5,
        },
        boxPassedThrough:  {
            borderColor: '#99bbee',
        },
        logText:           {
            fontSize: 9,
        },
        logBox:            {
            padding:         20,
            margin:          10,
            borderWidth:     0.5,
            borderColor:     '#f0f0f0',
            backgroundColor: '#f9f9f9',
        },
        bottomSpacer:      {
            marginBottom: 100,
        }
    }
)

interface ExampleBoxState {
    log: string[]
}

namespace ExampleBox {
    export interface Props extends React.Props<ExampleBox> {
        Component: React.ComponentClass<any>
    }
}

class ExampleBox extends React.Component<ExampleBox.Props,ExampleBoxState> {
    componentWillMount() {
        this.setState({ log: [] } )
    }

    private handleLog = ( msg: string ): void => {
        this.state.log = this.state.log.concat( [ msg ] )
    }

    private flushReactChanges = () => {
        this.forceUpdate()
    }

    /**
     * Capture phase of bubbling to append separator before any of the bubbling
     * happens.
     */
    private handleTouchCapture = (): void => {
        this.state.log = this.state.log.concat( [ '---' ] )
    }

    render() {

        const Comp = this.props.Component

        return (
            <View>
                <View
                    onTouchEndCapture={this.handleTouchCapture}
                    onTouchStart={this.flushReactChanges}>
                    <Comp onLog={this.handleLog}/>
                </View>
                <View
                    style={styles.logBox}>
                    <DemoText style={styles.logText}>
                        {this.state.log.join('\n')}
                    </DemoText>
                </View>
            </View>
        )
    }
}


class NoneExample extends React.Component<any,any> {
    render() {
        return (
            <View
                onTouchStart={(e: React.GestureResponderEvent) => this.props.onLog(`A (unspecified) touched at ${Math.floor(e.nativeEvent.locationX)}:${Math.floor(e.nativeEvent.locationY)}`)}
                style={styles.box}>
                <DemoText style={styles.text}>
                    A: unspecified
                </DemoText>
                <View
                    pointerEvents="none"
                    onTouchStart={() => this.props.onLog('B none touched')}
                    style={[styles.box, styles.boxPassedThrough]}>
                    <DemoText style={[styles.text, styles.textPassedThrough]}>
                        B: none
                    </DemoText>
                    <View
                        onTouchStart={() => this.props.onLog('C unspecified touched')}
                        style={[styles.box, styles.boxPassedThrough]}>
                        <DemoText style={[styles.text, styles.textPassedThrough]}>
                            C: unspecified
                        </DemoText>
                    </View>
                </View>
            </View>
        )
    }
}

/**
 * Special demo text that makes itself untouchable so that it doesn't destroy
 * the experiment and confuse the output.
 */
class DemoText extends React.Component<any,any> {
    render() {
        return (
            <View pointerEvents="none">
                <Text
                    style={this.props.style}>
                    {this.props.children}
                </Text>
            </View>
        )
    }
}

class BoxNoneExample extends React.Component<any,any> {
    render() {
        return (
            <View
                onTouchStart={() => this.props.onLog('A unspecified touched')}
                style={styles.box}>
                <DemoText style={styles.text}>
                    A: unspecified
                </DemoText>
                <View
                    pointerEvents="box-none"
                    onTouchStart={() => this.props.onLog('B box-none touched')}
                    style={[styles.box, styles.boxPassedThrough]}>
                    <DemoText style={[styles.text, styles.textPassedThrough]}>
                        B: box-none
                    </DemoText>
                    <View
                        onTouchStart={() => this.props.onLog('C unspecified touched')}
                        style={styles.box}>
                        <DemoText style={styles.text}>
                            C: unspecified
                        </DemoText>
                    </View>
                    <View
                        pointerEvents="auto"
                        onTouchStart={() => this.props.onLog('C explicitly unspecified touched')}
                        style={[styles.box]}>
                        <DemoText style={[styles.text]}>
                            C: explicitly unspecified
                        </DemoText>
                    </View>
                </View>
            </View>
        )
    }
}

class BoxOnlyExample extends React.Component<any,any> {
    render() {
        return (
            <View
                onTouchStart={() => this.props.onLog('A unspecified touched')}
                style={styles.box}>
                <DemoText style={styles.text}>
                    A: unspecified
                </DemoText>
                <View
                    pointerEvents="box-only"
                    onTouchStart={() => this.props.onLog('B box-only touched')}
                    style={styles.box}>
                    <DemoText style={styles.text}>
                        B: box-only
                    </DemoText>
                    <View
                        onTouchStart={() => this.props.onLog('C unspecified touched')}
                        style={[styles.box, styles.boxPassedThrough]}>
                        <DemoText style={[styles.text, styles.textPassedThrough]}>
                            C: unspecified
                        </DemoText>
                    </View>
                    <View
                        pointerEvents="auto"
                        onTouchStart={() => this.props.onLog('C explicitly unspecified touched')}
                        style={[styles.box, styles.boxPassedThrough]}>
                        <DemoText style={[styles.text, styles.textPassedThrough]}>
                            C: explicitly unspecified
                        </DemoText>
                    </View>
                </View>
            </View>
        )
    }
}

interface ExampleClass {
    Component: React.ComponentClass<any>
    title: string
    description: string
}

const exampleClasses: ExampleClass[] = [
    {
        Component:   NoneExample,
        title:       '`none`',
        description: '`none` causes touch events on the container and its child components to pass through to the parent container.',
    },
    {
        Component:   BoxNoneExample,
        title:       '`box-none`',
        description: '`box-none` causes touch events on the container to pass through and will only detect touch events on its child components.',
    },
    {
        Component:   BoxOnlyExample,
        title:       '`box-only`',
        description: '`box-only` causes touch events on the container\'s child components to pass through and will only detect touch events on the container itself.',
    }
]

const infoToExample = ( info: ExampleClass ): RNTSExample => {
    return {
        title:       info.title,
        description: info.description,
        render:  (): React.ReactElement<any> => {
            return <ExampleBox key={info.title} Component={info.Component}/>
        }
    } as RNTSExample
}




export default {
    framework:   'React',
    title:       'Pointer Events',
    description: '`pointerEvents` is a prop of View that gives control ' +
                 'of how touches should be handled.',
    examples:    exampleClasses.map( infoToExample )
} as RNTSExampleModule
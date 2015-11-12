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
import RNTSExample from '../RNTSExample'
import RNTSExampleModule from '../RNTSExampleModule'

const {
          SwitchIOS,
          Text,
          View
          } = React

interface BasicSwitchState {
    trueSwitchIsOn?: boolean
    falseSwitchIsOn?: boolean
}

class BasicSwitchExample extends React.Component<any,BasicSwitchState> {
    componentWillMount() {
        this.setState(
            {
                trueSwitchIsOn:  true,
                falseSwitchIsOn: false,
            }
        )
    }

    render() {
        return (
            <View>
                <SwitchIOS
                    onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                    style={{marginBottom: 10}}
                    value={this.state.falseSwitchIsOn}/>
                <SwitchIOS
                    onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
                    value={this.state.trueSwitchIsOn}/>
            </View>
        )
    }
}

class DisabledSwitchExample extends React.Component<any,any> {
    render() {
        return (
            <View>
                <SwitchIOS
                    disabled={true}
                    style={{marginBottom: 10}}
                    value={true}/>
                <SwitchIOS
                    disabled={true}
                    value={false}/>
            </View>
        )
    }
}

interface ColorSwitchState {
    colorTrueSwitchIsOn?: boolean
    colorFalseSwitchIsOn?: boolean
}

class ColorSwitchExample extends React.Component<any,ColorSwitchState> {
    componentWillMount() {
        this.setState(
            {
                colorTrueSwitchIsOn:  true,
                colorFalseSwitchIsOn: false,
            }
        )
    }

    render() {
        return (
            <View>
                <SwitchIOS
                    onValueChange={(value) => this.setState({colorFalseSwitchIsOn: value})}
                    onTintColor="#00ff00"
                    style={{marginBottom: 10}}
                    thumbTintColor="#0000ff"
                    tintColor="#ff0000"
                    value={this.state.colorFalseSwitchIsOn}/>
                <SwitchIOS
                    onValueChange={(value) => this.setState({colorTrueSwitchIsOn: value})}
                    onTintColor="#00ff00"
                    thumbTintColor="#0000ff"
                    tintColor="#ff0000"
                    value={this.state.colorTrueSwitchIsOn}/>
            </View>
        )
    }
}

interface EventSwitchState {
    eventSwitchIsOn?: boolean
    eventSwitchRegressionIsOn?: boolean
}

class EventSwitchExample extends React.Component<any,EventSwitchState> {
    componentWillMount() {
        this.setState(
            {
                eventSwitchIsOn:           false,
                eventSwitchRegressionIsOn: true,
            }
        )
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View>
                    <SwitchIOS
                        onValueChange={(value) => this.setState({eventSwitchIsOn: value})}
                        style={{marginBottom: 10}}
                        value={this.state.eventSwitchIsOn}/>
                    <SwitchIOS
                        onValueChange={(value) => this.setState({eventSwitchIsOn: value})}
                        style={{marginBottom: 10}}
                        value={this.state.eventSwitchIsOn}/>
                    <Text>{this.state.eventSwitchIsOn ? "On" : "Off"}</Text>
                </View>
                <View>
                    <SwitchIOS
                        onValueChange={(value) => this.setState({eventSwitchRegressionIsOn: value})}
                        style={{marginBottom: 10}}
                        value={this.state.eventSwitchRegressionIsOn}/>
                    <SwitchIOS
                        onValueChange={(value) => this.setState({eventSwitchRegressionIsOn: value})}
                        style={{marginBottom: 10}}
                        value={this.state.eventSwitchRegressionIsOn}/>
                    <Text>{this.state.eventSwitchRegressionIsOn ? "On" : "Off"}</Text>
                </View>
            </View>
        )
    }
}

export default {

    title:       '<SwitchIOS>',
    displayName: 'SwitchExample',
    description: 'Native boolean input',
    examples:    [
                     {
                         title:  'Switches can be set to true or false',
                         render: (): React.ReactElement<any> => { return <BasicSwitchExample /> }
                     },
                     {
                         title:  'Switches can be disabled',
                         render: (): React.ReactElement<any> => { return <DisabledSwitchExample /> }
                     },
                     {
                         title:  'Custom colors can be provided',
                         render: (): React.ReactElement<any> => { return <ColorSwitchExample /> }
                     },
                     {
                         title:  'Change events can be detected',
                         render: (): React.ReactElement<any> => { return <EventSwitchExample /> }
                     },
                     {
                         title:  'Switches are controlled components',
                         render: (): React.ReactElement<any> => { return <SwitchIOS /> }
                     }
                 ] as RNTSExample[]
} as RNTSExampleModule

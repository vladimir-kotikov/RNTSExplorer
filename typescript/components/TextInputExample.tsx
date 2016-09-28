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
          Text,
          TextInput,
          View,
          StyleSheet,
} from 'react-native';

interface Style { 
  page: React.ViewStyle,
  default: React.TextStyle,
  multiline: React.TextStyle,
  eventLabel: React.TextStyle,
  labelContainer: React.ViewStyle,
  label: React.ViewStyle,
}

const styles = StyleSheet.create<Style>(
    {
        page:           {
            paddingBottom: 300,
        },
        default: {
            height:      26,
            borderWidth: 0.5,
            borderColor: '#0f0f0f',
            padding:     4,
            flex:        1,
            fontSize:    13,
        },
        multiline: {
            borderWidth: 0.5,
            borderColor: '#0f0f0f',
            flex:        1,
            fontSize:    13,
            height:      50,
        },
        eventLabel: {
            margin:   3,
            fontSize: 12,
        },
        labelContainer: {
            flexDirection:  'row',
            marginVertical: 2,
            flex:           1,
        },
        label:          {
            width:          120,
            justifyContent: 'flex-end',
            flexDirection:  'row',
            marginRight:    10,
            paddingTop:     2,
        },
    }
)

class WithLabel extends React.Component<any,any> {
    render() {
        return (
            <View style={styles.labelContainer}>
                <View style={styles.label}>
                    <Text>{this.props.label}</Text>
                </View>
                {this.props.children}
            </View>
        )
    }
}

interface TextEventsState {
    curText?: string
    prevText?: string

}

class TextEventsExample extends React.Component<any,TextEventsState> {
    componentWillMount() {
        this.setState(
            {
                curText:  '<No Event>',
                prevText: '<No Event>',
            }
        )
    }

    private updateText = ( text: string ): void => {
        this.setState(
            {
                curText:  text,
                prevText: this.state.curText,
            }
        )
    }

    render() {
        return (
            <View>
                <TextInput
                    autoCapitalize="none"
                    placeholder="Enter text to see events"
                    autoCorrect={false}
                    onFocus={() => this.updateText('onFocus')}
                    onBlur={() => this.updateText('onBlur')}
                    onChange={(event) => this.updateText('onChange text: ' + event.nativeEvent.text)}
                    onEndEditing={(event) => this.updateText('onEndEditing text: ' + event.nativeEvent.text)}
                    onSubmitEditing={(event) => this.updateText('onSubmitEditing text: ' + event.nativeEvent.text)}
                    style={styles.default}
                />
                <Text style={styles.eventLabel}>
                    {this.state.curText}{'\n'}
                    (prev: {this.state.prevText})
                </Text>
            </View>
        )
    }
}

export default {

    title:       '<TextInput>',
    description: 'Single-line text inputs.',
    examples:    [
                     {
                         title:  'Auto-focus',
                         render: function () {
                             return <TextInput autoFocus={true} style={styles.default}/>
                         }
                     },
                     {
                         title:  'Auto-capitalize',
                         render: function () {
                             return (
                                 <View>
                                     <WithLabel label="none">
                                         <TextInput
                                             autoCapitalize="none"
                                             style={styles.default}
                                         />
                                     </WithLabel>
                                     <WithLabel label="sentences">
                                         <TextInput
                                             autoCapitalize="sentences"
                                             style={styles.default}
                                         />
                                     </WithLabel>
                                     <WithLabel label="words">
                                         <TextInput
                                             autoCapitalize="words"
                                             style={styles.default}
                                         />
                                     </WithLabel>
                                     <WithLabel label="characters">
                                         <TextInput
                                             autoCapitalize="characters"
                                             style={styles.default}
                                         />
                                     </WithLabel>
                                 </View>
                             )
                         }
                     },
                     {
                         title:  'Auto-correct',
                         render: function () {
                             return (
                                 <View>
                                     <WithLabel label="true">
                                         <TextInput autoCorrect={true} style={styles.default}/>
                                     </WithLabel>
                                     <WithLabel label="false">
                                         <TextInput autoCorrect={false} style={styles.default}/>
                                     </WithLabel>
                                 </View>
                             )
                         }
                     },
                     {
                         title:  'Keyboard types',
                         render: function () {
                             var keyboardTypes = [
                                 'default',
                                 'ascii-capable',
                                 'numbers-and-punctuation',
                                 'url',
                                 'number-pad',
                                 'phone-pad',
                                 'name-phone-pad',
                                 'email-address',
                                 'decimal-pad',
                                 'twitter',
                                 'web-search',
                                 'numeric',
                             ]
                             var examples = keyboardTypes.map( ( type ) => {
                                 return (
                                     <WithLabel key={type} label={type}>
                                         <TextInput
                                             keyboardType={type as React.KeyboardType}
                                             style={styles.default}
                                         />
                                     </WithLabel>
                                 )
                             } )
                             return <View>{examples}</View>
                         }
                     },
                     {
                         title:  'Return key types',
                         render: function () {
                             var returnKeyTypes = [
                                 'default',
                                 'go',
                                 'google',
                                 'join',
                                 'next',
                                 'route',
                                 'search',
                                 'send',
                                 'yahoo',
                                 'done',
                                 'emergency-call',
                             ]
                             var examples = returnKeyTypes.map( ( type ) => {
                                 return (
                                     <WithLabel key={type} label={type}>
                                         <TextInput
                                             returnKeyType={type as React.ReturnKeyType}
                                             style={styles.default}
                                         />
                                     </WithLabel>
                                 )
                             } )
                             return <View>{examples}</View>
                         }
                     },
                     {
                         title:  'Enable return key automatically',
                         render: function () {
                             return (
                                 <View>
                                     <WithLabel label="true">
                                         <TextInput enablesReturnKeyAutomatically={true} style={styles.default}/>
                                     </WithLabel>
                                 </View>
                             )
                         }
                     },
                     {
                         title:  'Secure text entry',
                         render: function () {
                             return (
                                 <View>
                                     <WithLabel label="true">
                                         <TextInput password={true} style={styles.default} value="abc"/>
                                     </WithLabel>
                                 </View>
                             )
                         }
                     },
                     {
                         title:  'Event handling',
                         render: function (): React.ReactElement<any> { return <TextEventsExample /> },
                     },
                     {
                         title:  'Colored input text',
                         render: function () {
                             return (
                                 <View>
                                     <TextInput
                                         style={[styles.default, {color: 'blue'}]}
                                         value="Blue"
                                     />
                                     <TextInput
                                         style={[styles.default, {color: 'green'}]}
                                         value="Green"
                                     />
                                 </View>
                             )
                         }
                     },
                     {
                         title:  'Clear button mode',
                         render: function () {
                             return (
                                 <View>
                                     <WithLabel label="never">
                                         <TextInput
                                             style={styles.default}
                                             clearButtonMode="never"
                                         />
                                     </WithLabel>
                                     <WithLabel label="while editing">
                                         <TextInput
                                             style={styles.default}
                                             clearButtonMode="while-editing"
                                         />
                                     </WithLabel>
                                     <WithLabel label="unless editing">
                                         <TextInput
                                             style={styles.default}
                                             clearButtonMode="unless-editing"
                                         />
                                     </WithLabel>
                                     <WithLabel label="always">
                                         <TextInput
                                             style={styles.default}
                                             clearButtonMode="always"
                                         />
                                     </WithLabel>
                                 </View>
                             )
                         }
                     },
                     {
                         title:  'Clear and select',
                         render: function () {
                             return (
                                 <View>
                                     <WithLabel label="clearTextOnFocus">
                                         <TextInput
                                             placeholder="text is cleared on focus"
                                             value="text is cleared on focus"
                                             style={styles.default}
                                             clearTextOnFocus={true}
                                         />
                                     </WithLabel>
                                     <WithLabel label="selectTextOnFocus">
                                         <TextInput
                                             placeholder="text is selected on focus"
                                             value="text is selected on focus"
                                             style={styles.default}
                                             selectTextOnFocus={true}
                                         />
                                     </WithLabel>
                                 </View>
                             )
                         }
                     }
                 ] as RNTSExample[]
} as RNTSExampleModule

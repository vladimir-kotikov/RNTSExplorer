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
          DatePickerIOS,
          StyleSheet,
          Text,
          TextInput,
          View
       } from 'react-native';

interface Style { 
  textinput: React.TextStyle,
  labelContainer: React.ViewStyle,
  labelView: React.ViewStyle,
  label: React.TextStyle,
  headingContainer: React.ViewStyle,
  heading: React.TextStyle,
}

const styles = StyleSheet.create<Style>(
    {
        textinput:        {
            height:      26,
            width:       50,
            borderWidth: 0.5,
            borderColor: '#0f0f0f',
            padding:     4,
            fontSize:    13,
        },
        labelContainer: {
            flexDirection:  'row',
            alignItems:     'center',
            marginVertical: 2,
        },
        labelView:      {
            marginRight:     10,
            paddingVertical: 2,
        },
        label:          {
            fontWeight: '500',
        },
        headingContainer: {
            padding:         4,
            backgroundColor: '#f6f7f8',
        },
        heading:          {
            fontWeight: '500',
            fontSize:   14,
        }
    }
)

namespace DatePickerExample {
    export interface Props {
        date?: Date
        timeZoneOffsetInHours?: number
    }

    export interface State {
        date?: Date
        timeZoneOffsetInHours?: number
    }
}

class DatePickerExample extends React.Component<DatePickerExample.Props,DatePickerExample.State> {
    static defaultProps: DatePickerExample.Props = {
        date:                  new Date(),
        timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    }

    componentWillMount() {
        this.setState(
            {
                date:                  this.props.date,
                timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
            }
        )
    }

    private onDateChange = ( date: Date ): void => {
        this.setState( { date: date } )
    }

    private onTimezoneChange = ( event: {nativeEvent: {text: string}} ) => {
        var offset = parseInt( event.nativeEvent.text, 10 )
        if ( isNaN( offset ) ) {
            return
        }
        this.setState( { timeZoneOffsetInHours: offset } )
    }

    render() {
        // Ideally, the timezone input would be a picker rather than a
        // text input, but we don't have any pickers yet :(
        return (
            <View>
                <WithLabel label="Value:">
                    <Text>{
                        this.state.date.toLocaleDateString() +
                            ' ' +
                            this.state.date.toLocaleTimeString()
                        }</Text>
                </WithLabel>
                <WithLabel label="Timezone:">
                    <TextInput
                        onChange={this.onTimezoneChange}
                        style={styles.textinput}
                        value={this.state.timeZoneOffsetInHours.toString()}
                    />
                    <Text>hours from UTC</Text>
                </WithLabel>
                <Heading label="Date + time picker"/>
                <DatePickerIOS
                    date={this.state.date}
                    mode="datetime"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={this.onDateChange}
                />
                <Heading label="Date picker"/>
                <DatePickerIOS
                    date={this.state.date}
                    mode="date"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={this.onDateChange}
                />
                <Heading label="Time picker, 10-minute interval"/>
                <DatePickerIOS
                    date={this.state.date}
                    mode="time"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={this.onDateChange}
                    minuteInterval={10}
                />
            </View>
        )
    }
}

class WithLabel extends React.Component<any,any> {
    render() {
        return (
            <View style={styles.labelContainer}>
                <View style={styles.labelView}>
                    <Text style={styles.label}>
                        {this.props.label}
                    </Text>
                </View>
                {this.props.children}
            </View>
        )
    }
}

class Heading extends React.Component<any,any> {
    render() {
        return (
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>
                    {this.props.label}
                </Text>
            </View>
        )
    }
}

export default {

    title:       '<DatePickerIOS>',
    description: 'Select dates and times using the native UIDatePicker.',
    examples:    [
                     {
                         title:  '<DatePickerIOS>',
                         render: (): React.ReactElement<any> => {
                             return <DatePickerExample />
                         }
                     }
                 ] as RNTSExample[]
} as RNTSExampleModule



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
          StyleSheet,
          MapView,
          Text,
          TextInput,
          View,
          } = React

const styles = StyleSheet.create(
    {
        map:          {
            height:      150,
            margin:      10,
            borderWidth: 1,
            borderColor: '#000000',
        },
        row: {
            flexDirection:  'row',
            justifyContent: 'space-between',
        },
        textInput: {
            width:       150,
            height:      20,
            borderWidth: 0.5,
            borderColor: '#aaaaaa',
            fontSize:    13,
            padding:     4,
        },
        changeButton: {
            alignSelf:   'center',
            marginTop:   5,
            padding:     3,
            borderWidth: 0.5,
            borderColor: '#777777',
        }
    }
)

//interface Region {
//    latitude:       number
//    longitude:      number
//    latitudeDelta:  number
//    longitudeDelta: number
//}

let regionText = {
    latitude:       '0',
    longitude:      '0',
    latitudeDelta:  '0',
    longitudeDelta: '0',
}

const initialState = {
    region: {
        latitude:       0,
        longitude:      0,
        latitudeDelta:  0,
        longitudeDelta: 0
    }
}

namespace MapRegionInput {
    export interface Props extends React.Props<MapRegionInput> {
        region: React.MapViewRegion
        onChange: ( region: React.MapViewRegion ) => void
    }
    export interface State {
        region: React.MapViewRegion
    }
}

class MapRegionInput extends React.Component<MapRegionInput.Props,MapRegionInput.State> {

    static propTypes: React.ValidationMap<any> = {
        region:   React.PropTypes.shape(
            {
                latitude:       React.PropTypes.number.isRequired,
                longitude:      React.PropTypes.number.isRequired,
                latitudeDelta:  React.PropTypes.number.isRequired,
                longitudeDelta: React.PropTypes.number.isRequired,
            }
        ),
        onChange: React.PropTypes.func.isRequired
    }

    componentWillMount() {
        this.setState( initialState )
    }

    componentWillReceiveProps( nextProps: MapRegionInput.Props ) {
        this.setState(
            {
                region: nextProps.region || initialState.region
            }
        )
    }

    render() {
        const region = this.state.region || initialState.region
        return (
            <View>
                <View style={styles.row}>
                    <Text>
                        {'Latitude'}
                    </Text>
                    <TextInput
                        value={'' + region.latitude}
                        style={styles.textInput}
                        onChange={this._onChangeLatitude}
                        selectTextOnFocus={true}
                    />
                </View>
                <View style={styles.row}>
                    <Text>
                        {'Longitude'}
                    </Text>
                    <TextInput
                        value={'' + region.longitude}
                        style={styles.textInput}
                        onChange={this._onChangeLongitude}
                        selectTextOnFocus={true}
                    />
                </View>
                <View style={styles.row}>
                    <Text>
                        {'Latitude delta'}
                    </Text>
                    <TextInput
                        value={'' + region.latitudeDelta}
                        style={styles.textInput}
                        onChange={this._onChangeLatitudeDelta}
                        selectTextOnFocus={true}
                    />
                </View>
                <View style={styles.row}>
                    <Text>
                        {'Longitude delta'}
                    </Text>
                    <TextInput
                        value={'' + region.longitudeDelta}
                        style={styles.textInput}
                        onChange={this._onChangeLongitudeDelta}
                        selectTextOnFocus={true}
                    />
                </View>
                <View style={styles.changeButton}>
                    <Text onPress={this._change}>
                        {'Change'}
                    </Text>
                </View>
            </View>
        )
    }

    private _onChangeLatitude = ( e: {nativeEvent: { text: string }} ): void => {
        regionText.latitude = e.nativeEvent.text
    }

    private _onChangeLongitude = ( e: {nativeEvent: { text: string }} ): void => {
        regionText.longitude = e.nativeEvent.text
    }

    private _onChangeLatitudeDelta = ( e: {nativeEvent: { text: string }} ): void => {
        regionText.latitudeDelta = e.nativeEvent.text
    }

    private _onChangeLongitudeDelta = ( e: {nativeEvent: { text: string }} ): void => {
        regionText.longitudeDelta = e.nativeEvent.text
    }

    private _change = (): void => {
        this.setState(
            {
                region: {
                    latitude:       parseFloat( regionText.latitude ),
                    longitude:      parseFloat( regionText.longitude ),
                    latitudeDelta:  parseFloat( regionText.latitudeDelta ),
                    longitudeDelta: parseFloat( regionText.longitudeDelta ),
                }
            }
        )
        this.props.onChange( this.state.region )
    }

}
namespace MapViewExample {
    export interface State {
        mapRegion?:      React.MapViewRegion
        mapRegionInput?: React.MapViewRegion
        annotations?:    React.MapViewAnnotation[]
        isFirstLoad?:    boolean

    }
}

class MapViewExample extends React.Component<any,MapViewExample.State> {

    componentWillMount() {
        this.setState(
            {
                mapRegion:      null,
                mapRegionInput: null,
                annotations:    null,
                isFirstLoad:    true
            }
        )
    }

    render() {
        return (
            <View>
                <MapView
                    style={styles.map}
                    onRegionChange={this._onRegionChange}
                    onRegionChangeComplete={this._onRegionChangeComplete}
                    region={this.state.mapRegion}
                    annotations={this.state.annotations}
                />
                <MapRegionInput
                    onChange={this._onRegionInputChanged}
                    region={this.state.mapRegionInput}
                />
            </View>
        )
    }

    private _getAnnotations = ( region: React.MapViewRegion ): React.MapViewAnnotation[] => {
        return [ {
            longitude: region.longitude,
            latitude:  region.latitude,
            title:     'You Are Here',
        } ]
    }

    private _onRegionChange = ( region: React.MapViewRegion ): void => {
        this.setState(
            {
                mapRegionInput: region,
            }
        )
    }

    private _onRegionChangeComplete = ( region: React.MapViewRegion ): void => {
        if ( this.state.isFirstLoad ) {
            this.setState(
                {
                    mapRegionInput: region,
                    annotations:    this._getAnnotations( region ),
                    isFirstLoad:    false,
                }
            )
        }
    }

    private _onRegionInputChanged = ( region: React.MapViewRegion ): void => {
        this.setState(
            {
                mapRegion:      region,
                mapRegionInput: region,
                annotations:    this._getAnnotations( region ),
            }
        )
    }
}


export default {
    title:       '<MapView>',
    description: 'Base component to display maps',
    examples:    [
                     {
                         title: 'Map',
                         render(): React.ReactElement<any> {
                             return <MapViewExample />
                         }
                     },
                     {
                         title: 'Map shows user location',
                         render() {
                             return  <MapView style={styles.map} showsUserLocation={true}/>
                         }
                     }
                 ] as RNTSExample[]
} as RNTSExampleModule

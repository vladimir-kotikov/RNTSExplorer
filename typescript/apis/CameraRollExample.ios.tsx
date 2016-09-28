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
          CameraRoll,
          Image,
          SliderIOS,
          StyleSheet,
          SwitchIOS,
          Text,
          View,
} from 'react-native';

import CameraRollView from './CameraRollView.ios'

const CAMERA_ROLL_VIEW = 'camera_roll_view'

interface Style { 
  row: React.ViewStyle,
  url: React.TextStyle,
  image: React.ViewStyle,
  info: React.ViewStyle,
}

const styles = StyleSheet.create<Style>(
    {
        row:   {
            flexDirection: 'row',
            flex:          1,
        },
        url: {
            fontSize:     9,
            marginBottom: 14,
        },
        image: {
            margin: 4,
        },
        info:  {
            flex: 1,
        },
    }
)

interface State {
    groupTypes?:  React.CameraRollGroupType
    sliderValue?: number
    bigImages?:   boolean

}

class CameraRollExample extends React.Component<any,State> {

    private _cameraRollView: CameraRollView

    componentWillMount() {
        this.setState(
            {
                groupTypes:  'SavedPhotos',
                sliderValue: 1,
                bigImages:   true
            }
        )
    }

    render() {
        return (
            <View>
                <SwitchIOS
                    onValueChange={this._onSwitchChange}
                    value={this.state.bigImages}/>
                <Text>{(this.state.bigImages ? 'Big' : 'Small') + ' Images'}</Text>
                <SliderIOS
                    value={this.state.sliderValue}
                    onValueChange={this._onSliderChange}
                />
                <Text>{'Group Type: ' + this.state.groupTypes}</Text>
                <CameraRollView
                    ref={(c: CameraRollView) => { this._cameraRollView = c}}
                    batchSize={5}
                    groupTypes={this.state.groupTypes}
                    renderImage={this._renderImage}
                />
            </View>
        )
    }


    private _renderImage = ( asset: React.CameraRollEdgeInfo ): React.ReactElement<any> => {
        const imageSize = this.state.bigImages ? 150 : 75
        const imageStyle = [ styles.image, { width: imageSize, height: imageSize } ]
        const location = asset.node.location.longitude ?
                       JSON.stringify( asset.node.location ) : 'Unknown location'
        const key = asset.node.image.uri
        return (
            <View key={key} style={styles.row}>
                <Image
                    source={asset.node.image}
                    style={imageStyle}
                />
                <View style={styles.info}>
                    <Text style={styles.url}>{asset.node.image.uri}</Text>
                    <Text>{location}</Text>
                    <Text>{asset.node.group_name}</Text>
                    <Text>{new Date(asset.node.timestamp).toString()}</Text>
                </View>
            </View>
        )
    }

    private _onSliderChange = ( value: number ): void => {
        var options = CameraRoll.GroupTypesOptions
        var index = Math.floor( value * options.length * 0.99 )
        var groupTypes = options[ index ]
        if ( groupTypes !== this.state.groupTypes ) {
            this.setState( { groupTypes: groupTypes } )
        }
    }

    private _onSwitchChange = ( value: boolean ): void => {
        this._cameraRollView.rendererChanged()
        this.setState( { bigImages: value } )
    }
}

export default {
    title:       '<CameraRollView>',
    description: 'Example component that uses CameraRoll to list user\'s photos',
    examples:    [
        {
            title:  'Photos',
            render: (): React.ReactElement<any> => { return <CameraRollExample /> }
        }as RNTSExample
    ]
} as RNTSExampleModule

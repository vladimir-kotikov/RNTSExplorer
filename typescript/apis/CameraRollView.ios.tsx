import ValidationMap = __React.ValidationMap;
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
          ActivityIndicatorIOS,
          CameraRoll,
          Image,
          ListView,
          StyleSheet,
          View,
          } = React

const groupByEveryN = require( 'groupByEveryN' )
const logError = require( 'logError' )

const styles = StyleSheet.create(
    {
        row:       {
            flexDirection: 'row',
            flex:          1
        },
        url: {
            fontSize:     9,
            marginBottom: 14
        },
        image: {
            margin: 4
        },
        info:  {
            flex: 1
        },
        container: {
            flex: 1
        },
        spinner:   { //Added by BGR
            width:       20,
            marginRight: 6
        }
    }
)


namespace  CameraRollView {

    export interface Props extends React.Props<CameraRollView> {
        groupTypes: string
        batchSize: number
        renderImage: ( image: React.CameraRollEdgeInfo ) => void
        imagesPerRow?: number
    }
}

interface State {
    assets?: React.CameraRollEdgeInfo[]
    groupTypes?: string
    lastCursor?: string
    noMore?: boolean
    loadingMore?: boolean
    dataSource?: React.ListViewDataSource
}


class CameraRollView extends React.Component<CameraRollView.Props,State> {
    static propTypes: React.ValidationMap<any> = {
        /**
         * The group where the photos will be fetched from. Possible
         * values are 'Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream'
         * and SavedPhotos.
         */
        groupTypes: React.PropTypes.oneOf( [
                                               'Album',
                                               'All',
                                               'Event',
                                               'Faces',
                                               'Library',
                                               'PhotoStream',
                                               'SavedPhotos'
                                           ] ),

        /**
         * Number of images that will be fetched in one page.
         */
        batchSize: React.PropTypes.number,

        /**
         * A function that takes a single image as a parameter and renders it.
         */
        renderImage: React.PropTypes.func,

        /**
         * imagesPerRow: Number of images to be shown in each row.
         */
        imagesPerRow: React.PropTypes.number
    }


    static defaultProps: CameraRollView.Props = {
        groupTypes:   'SavedPhotos',
        batchSize:    5,
        imagesPerRow: 1,
        renderImage:  function ( asset: React.CameraRollEdgeInfo ) {
            var imageSize = 150
            var imageStyle = [ styles.image, { width: imageSize, height: imageSize } ]
            return (
                <Image
                    source={asset.node.image}
                    style={imageStyle}
                />
            )
        }
    }

    private initialState = (): State => {

        const ds = new ListView.DataSource( { rowHasChanged: this._rowHasChanged } )

        return {
            assets:      [],
            groupTypes:  this.props.groupTypes,
            lastCursor:  null,
            noMore:      false,
            loadingMore: false,
            dataSource:  ds
        }
    }

    componentWillMount() {
        this.setState( this.initialState() )
    }

    /**
     * This should be called when the image renderer is changed to tell the
     * component to re-render its assets.
     */
    public rendererChanged = (): void => {
        var ds = new ListView.DataSource( { rowHasChanged: this._rowHasChanged } )
        this.state.dataSource = ds.cloneWithRows(
            groupByEveryN( this.state.assets, this.props.imagesPerRow )
        )
    }

    componentDidMount() {
        this.fetch()
    }

    componentWillReceiveProps( nextProps: CameraRollView.Props ) {
        if ( this.props.groupTypes !== nextProps.groupTypes ) {
            this.fetch( true )
        }
    }

    private _fetch = ( clear?: boolean ): void => {
        if ( clear ) {
            this.setState( this.initialState(), this.fetch )
            return
        }

        const fetchParams: React.CameraRollFetchParams = {
            first:      this.props.batchSize,
            groupTypes: this.props.groupTypes
        }
        if ( this.state.lastCursor ) {
            fetchParams.after = this.state.lastCursor
        }

        CameraRoll.getPhotos( fetchParams, this._appendAssets, logError )
    }

    /**
     * Fetches more images from the camera roll. If clear is set to true, it will
     * set the component to its initial state and re-fetch the images.
     */
    public fetch = ( clear?: boolean ): void => {
        if ( !this.state.loadingMore ) {
            this.setState( { loadingMore: true }, () => { this._fetch( clear ) } )
        }
    }

    render() {
        return (
            <ListView
                renderRow={this._renderRow}
                renderFooter={this._renderFooterSpinner}
                onEndReached={this._onEndReached}
                style={styles.container}
                dataSource={this.state.dataSource}
            />
        )
    }

    private _rowHasChanged = ( r1: React.Image[], r2: React.Image[] ): boolean => {
        if ( r1.length !== r2.length ) {
            return true
        }

        for ( var i = 0; i < r1.length; i++ ) {
            if ( r1[ i ] !== r2[ i ] ) {
                return true
            }
        }

        return false
    }

    private _renderFooterSpinner = (): JSX.Element => {
        if ( !this.state.noMore ) {
            return <ActivityIndicatorIOS style={styles.spinner}/>
        }
        return null
    }

    // rowData is an array of images
    private _renderRow = ( rowData: React.CameraRollEdgeInfo[], sectionID: string, rowID: string ): JSX.Element => {
        var images = rowData.map( ( image ) => {
            if ( image === null ) {
                return null
            }
            return this.props.renderImage( image )
        } )

        return (
            <View style={styles.row}>
                {images}
            </View>
        )
    }

    private _appendAssets = ( data: React.CameraRollAssetInfo ): void => {
        var assets = data.edges
        var newState: State = { loadingMore: false }

        if ( !data.page_info.has_next_page ) {
            newState.noMore = true
        }

        if ( assets.length > 0 ) {
            newState.lastCursor = data.page_info.end_cursor
            newState.assets = this.state.assets.concat( assets )
            newState.dataSource = this.state.dataSource.cloneWithRows(
                groupByEveryN( newState.assets, this.props.imagesPerRow )
            )
        }

        this.setState( newState )
    }

    private _onEndReached = (): void => {
        if ( !this.state.noMore ) {
            this.fetch()
        }
    }
}


export default CameraRollView

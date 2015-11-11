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
          Image,
          LayoutAnimation,
          ListView,
          StyleSheet,
          Text,
          TouchableOpacity,
          View,
          } = React

const PAGE_SIZE = 4
const THUMB_URLS = [ 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851561_767334496626293_1958532586_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851579_767334503292959_179092627_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851589_767334513292958_1747022277_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851593_767334566626286_1953955109_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png' ]
const NUM_SECTIONS = 100
const NUM_ROWS_PER_SECTION = 10

const styles = StyleSheet.create(
    {
        listview:       {
            backgroundColor: '#B0C4DE',
        },
        header:   {
            height:          40,
            justifyContent:  'center',
            alignItems:      'center',
            backgroundColor: '#3B5998',
            flexDirection:   'row',
        },
        text:     {
            color:             'white',
            paddingHorizontal: 8,
        },
        rowText:  {
            color: '#888888',
        },
        thumbText: {
            fontSize: 20,
            color:    '#888888',
        },
        buttonContents: {
            flexDirection:    'row',
            justifyContent:   'center',
            alignItems:       'center',
            marginHorizontal: 5,
            marginVertical:   3,
            padding:          5,
            backgroundColor:  '#EAEAEA',
            borderRadius:     3,
            paddingVertical:  10,
        },
        img:            {
            width:            64,
            height:           64,
            marginHorizontal: 10,
        },
        section:        {
            flexDirection:   'column',
            justifyContent:  'center',
            alignItems:      'flex-start',
            padding:         6,
            backgroundColor: '#5890ff',
        }
    }
)

const animations = {
    layout: {
        spring:        {
            duration: 750,
            create:   {
                duration: 300,
                type:     LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            },
            update:   {
                type:          LayoutAnimation.Types.spring,
                springDamping: 0.4,
            },
        },
        easeInEaseOut: {
            duration: 300,
            create:   {
                type:     LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update:   {
                delay: 100,
                type:  LayoutAnimation.Types.easeInEaseOut,
            }
        }
    }
}

const layoutAnimationConfigs = [
    animations.layout.spring,
    animations.layout.easeInEaseOut,
]

class Thumb extends React.Component<any,any> {
    componentWillMount() {
        this.setState( { thumbIndex: this._getThumbIdx(), dir: 'row' } )
    }

    private _getThumbIdx = (): number => {
        return Math.floor( Math.random() * THUMB_URLS.length )
    }
    private _onPressThumb = (): void => {
        var config = layoutAnimationConfigs[ this.state.thumbIndex % layoutAnimationConfigs.length ]
        LayoutAnimation.configureNext( config )
        this.setState( {
                           thumbIndex: this._getThumbIdx(),
                           dir:        this.state.dir === 'row' ? 'column' : 'row',
                       } )
    }

    render() {
        return (
            <TouchableOpacity onPress={this._onPressThumb}>
                <View style={[styles.buttonContents, {flexDirection: this.state.dir}]}>
                    <Image style={styles.img} source={{uri: THUMB_URLS[this.state.thumbIndex]}}/>
                    <Image style={styles.img} source={{uri: THUMB_URLS[this.state.thumbIndex]}}/>
                    <Image style={styles.img} source={{uri: THUMB_URLS[this.state.thumbIndex]}}/>
                    {this.state.dir === 'column' ?
                    <Text>
                        Oooo, look at this new text!  So awesome it may just be crazy.
                        Let me keep typing here so it wraps at least one line.
                    </Text> :
                    <Text />
                        }
                </View>
            </TouchableOpacity>
        )
    }
}

class ListViewPagingExample extends React.Component<any,any> {

    static get title() {return '<ListView> - Paging' }

    static get description() { return 'Floating headers & layout animations.' }


    componentWillMount() {
        var getSectionData = ( dataBlob: any, sectionID: string ) => {
            return dataBlob[ sectionID ]
        }
        var getRowData = ( dataBlob: any, sectionID: string, rowID: string ) => {
            return dataBlob[ rowID ]
        }

        var dataSource = new ListView.DataSource( {
            getRowData:              getRowData,
            getSectionHeaderData:    getSectionData,
            rowHasChanged:           ( row1, row2 ) => row1 !== row2,
            sectionHeaderHasChanged: ( s1, s2 ) => s1 !== s2,
        } )

        var dataBlob: any = {}
        var sectionIDs: string[] = []
        var rowIDs: string[][] = []
        for ( var ii = 0; ii < NUM_SECTIONS; ii++ ) {
            var sectionName = 'Section ' + ii
            sectionIDs.push( sectionName )
            dataBlob[ sectionName ] = sectionName
            rowIDs[ ii ] = []

            for ( var jj = 0; jj < NUM_ROWS_PER_SECTION; jj++ ) {
                var rowName = 'S' + ii + ', R' + jj
                rowIDs[ ii ].push( rowName )
                dataBlob[ rowName ] = rowName
            }
        }
        this.setState(
            {
                dataSource:       dataSource.cloneWithRowsAndSections( dataBlob, sectionIDs, rowIDs ),
                headerPressCount: 0,
            }
        )
    }

    private renderRow = ( rowData: string, sectionID: string, rowID: string ): React.ReactElement<any>  => {
        return (<Thumb text={rowData}/>)
    }

    private renderSectionHeader = ( sectionData: string, sectionID: string ): React.ReactElement<any>  => {
        return (
            <View style={styles.section}>
                <Text style={styles.text}>
                    {sectionData}
                </Text>
            </View>
        )
    }

    private renderHeader = (): React.ReactElement<any>  => {
        var headerLikeText = this.state.headerPressCount % 2 ?
                             <View>
                                 <Text style={styles.text}>1 Like</Text>
                             </View> :
                             null
        return (
            <TouchableOpacity onPress={this._onPressHeader}>
                <View style={styles.header}>
                    {headerLikeText}
                    <View>
                        <Text style={styles.text}>
                            Table Header (click me)
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    private renderFooter = (): React.ReactElement<any>  => {
        return (
            <View style={styles.header}>
                <Text onPress={() => console.log('Footer!')} style={styles.text}>
                    Table Footer
                </Text>
            </View>
        )
    }

    render() {
        return (
            <ListView
                style={styles.listview}
                dataSource={this.state.dataSource}
                onChangeVisibleRows={(visibleRows, changedRows) => console.log({visibleRows, changedRows})}
                renderHeader={this.renderHeader}
                renderFooter={this.renderFooter}
                renderSectionHeader={this.renderSectionHeader}
                renderRow={this.renderRow}
                initialListSize={10}
                pageSize={PAGE_SIZE}
                scrollRenderAheadDistance={2000}
            />
        )
    }

    private _onPressHeader = (): void => {
        var config = layoutAnimationConfigs[ Math.floor( this.state.headerPressCount / 2 ) % layoutAnimationConfigs.length ]
        LayoutAnimation.configureNext( config )
        this.setState( { headerPressCount: this.state.headerPressCount + 1 } )
    }

}


export default ListViewPagingExample

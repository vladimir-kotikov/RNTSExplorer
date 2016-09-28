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
          ScrollView,
          StyleSheet,
          View,
          Image
       } from 'react-native';


let THUMBS = [ 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851561_767334496626293_1958532586_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851579_767334503292959_179092627_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851589_767334513292958_1747022277_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851593_767334566626286_1953955109_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png' ]
THUMBS = THUMBS.concat( THUMBS ) // double length of THUMBS
const createThumbRow = ( uri: string, i: number ) => <Thumb key={i} uri={uri}/>

interface Style { 
  scrollView: React.ViewStyle,
  horizontalScrollView: React.ViewStyle,
  containerPage: React.ViewStyle,
  text: React.TextStyle,
  button: React.ViewStyle,
  buttonContents: React.ViewStyle,
  img: React.ViewStyle,
}

const styles = StyleSheet.create<Style>(
    {
        scrollView:           {
            backgroundColor: '#6A85B1',
            height:          300,
        },
        horizontalScrollView: {
            height: 120,
        },
        containerPage:        {
            height:          50,
            width:           50,
            backgroundColor: '#527FE4',
            padding:         5,
        },
        text:                 {
            fontSize: 20,
            color:    '#888888',
            left:     80,
            top:      20,
            height:   40,
        },
        button:               {
            margin:          7,
            padding:         5,
            alignItems:      'center',
            backgroundColor: '#eaeaea',
            borderRadius:    3,
        },
        buttonContents:       {
            flexDirection: 'row',
            width:         64,
            height:        64,
        },
        img:                  {
            width:  64,
            height: 64,
        }
    }
)

namespace Thumb {

    export interface Props extends React.Props<Thumb> {
        uri: string
    }
}

class Thumb extends React.Component<Thumb.Props,any> {
    shouldComponentUpdate( nextProps: Thumb.Props, nextState: any ) {
        return false
    }

    render() {
        return (
            <View style={styles.button}>
                <Image style={styles.img} source={{uri:this.props.uri}}/>
            </View>
        )
    }
}


export default {
    title:       '<ScrollView>',
    description: 'Component that enables scrolling through child components',
    examples:    [
                     {
                         title:       '<ScrollView>',
                         description: 'To make content scrollable, wrap it within a <ScrollView> component',
                         render:      (): React.ReactElement<any> => {
                             return (
                                 <ScrollView
                                     onScroll={() => { console.log('onScroll!') }}
                                     scrollEventThrottle={200}
                                     contentInset={{top: -50}}
                                     style={styles.scrollView}>
                                     {THUMBS.map(createThumbRow)}
                                 </ScrollView>
                             )
                         }
                     } as RNTSExample,
                     {
                         title:       "<ScrollView> (horizontal = true)",
                         description: "You can display <ScrollView>\'s child components horizontally rather than vertically",
                         render:      (): React.ReactElement<any> => {
                             return (
                                 <ScrollView
                                     horizontal={true}
                                     contentInset={{top: -50}}
                                     style={[styles.scrollView, styles.horizontalScrollView]}>
                                     {THUMBS.map(createThumbRow)}
                                 </ScrollView>
                             )
                         }
                     } as RNTSExample
                 ] as RNTSExample[]

} as RNTSExampleModule



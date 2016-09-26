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
const {
          StyleSheet,
          Text,
          View,
          } = React

interface Style { 
  container: React.ViewStyle,
  text: React.TextStyle,
}

const styles = StyleSheet.create<Style>(
    {
        container: {
            borderRadius:    4,
            borderWidth:     0.5,
            borderColor:     '#d6d7da',
            margin:          10,
            height:          45,
            padding:         10,
            backgroundColor: 'white',
        },
        text:      {
            fontSize:   19,
            fontWeight: '500',
        },
    }
)

namespace RNTSExplorerTitle {
    export interface Props extends React.Props<RNTSExplorerTitle> {
        title: string
    }
}

class RNTSExplorerTitle extends React.Component<RNTSExplorerTitle.Props,any> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.props.title}
                </Text>
            </View>
        )
    }
}



export default RNTSExplorerTitle

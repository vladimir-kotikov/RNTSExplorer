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

import React from 'react-native'
const {
          StyleSheet,
          Text,
          View,
          } = React

const styles = StyleSheet.create(
    {
        container:       {
            borderRadius:    3,
            borderWidth:     0.5,
            borderColor:     '#d6d7da',
            backgroundColor: '#ffffff',
            margin:          10,
            marginVertical:  5,
            overflow:        'hidden',
        },
        titleContainer: {
            borderWidth:       0.5,
            borderColor:       '#d6d7da',
            backgroundColor:   '#f6f7f8',
            paddingHorizontal: 10,
            paddingVertical:   5,
        },
        titleRow:       {
            flexDirection:  'row',
            justifyContent: 'space-between',
        },
        titleText:      {
            fontSize:   14,
            fontWeight: '500',
        },
        descriptionText: {
            fontSize: 14,
        },
        disclosure:      {
            position: 'absolute',
            top:      0,
            right:    0,
            padding:  10,
        },
        disclosureIcon:  {
            width:  12,
            height: 8,
        },
        children:        {
            padding: 10,
        }
    }
)

namespace RNTSExplorerBlock {
    export interface Props extends React.Props<RNTSExplorerBlock>{
        title: string
        description: string
    }

    export interface State {
        description: string
    }
}

class RNTSExplorerBlock extends React.Component<RNTSExplorerBlock.Props, RNTSExplorerBlock.State> {

    static propTypes: ValidationMap<any> = {
        title:       React.PropTypes.string,
        description: React.PropTypes.string
    }


    componentWillMount() {
        this.setState({ description: null})
    }

    render() {
        var description: JSX.Element;
        if ( this.props.description ) {
            description =
                <Text style={styles.descriptionText}>
                    {this.props.description}
                </Text>;
        }

        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {this.props.title}
                    </Text>
                    {description}
                </View>
                <View style={styles.children}>
                    {this.props.children}
                </View>
            </View>
        )
    }
}


export default RNTSExplorerBlock

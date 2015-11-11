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
          ScrollView,
          StyleSheet,
          View,
          } = React

import RNTSExplorerTitle from './RNTSExplorerTitle'

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: '#e9eaed',
            paddingTop:      15,
            flex:            1,
        },
        spacer:    {
            height: 270,
        },
        wrapper:   {
            flex: 1,
        },
    }
)

namespace RNTSExplorerPage {
    export interface Props extends React.Props<RNTSExplorerPage> {
        keyboardShouldPersistTaps?: boolean,
        noScroll?:                  boolean,
        noSpacer?:                  boolean,
        title?:                    string
    }
}

class RNTSExplorerPage extends React.Component<RNTSExplorerPage.Props,any> {

    static propTypes: React.ValidationMap<any> = {
        keyboardShouldPersistTaps: React.PropTypes.bool,
        noScroll:                  React.PropTypes.bool,
        noSpacer:                  React.PropTypes.bool
    }

    render() {
        var ContentWrapper: React.ComponentClass<any>
        var wrapperProps: {
            keyboardShouldPersistTaps?:boolean;
            keyboardDismissMode? : string
        } = {}
        if ( this.props.noScroll ) {
            ContentWrapper = View
        }
        else {
            ContentWrapper = ScrollView
            wrapperProps.keyboardShouldPersistTaps = true
            wrapperProps.keyboardDismissMode = 'interactive'
        }
        const title = this.props.title ?
                      <RNTSExplorerTitle title={this.props.title}/> :
                      null
        const spacer = this.props.noSpacer ? null : <View style={styles.spacer}/>
        return (
            <View style={styles.container}>
                {title}
                <ContentWrapper
                    style={styles.wrapper}
                    {...wrapperProps}>
                    {this.props.children}
                    {spacer}
                </ContentWrapper>
            </View>
        )
    }
}


export default RNTSExplorerPage

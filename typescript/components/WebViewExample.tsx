import TextInputStatic = ReactNative.TextInputStatic;
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
          Text,
          TextInput,
          TouchableOpacity,
          View,
          WebView
          } = React

const HEADER = '#3b5998'
const BGWASH = 'rgba(255,255,255,0.8)'
const DISABLED_WASH = 'rgba(255,255,255,0.25)'

const TEXT_INPUT_REF = 'urlInput'
const WEBVIEW_REF = 'webview'
const DEFAULT_URL = 'https://m.facebook.com'

const styles = StyleSheet.create(
    {
        container:           {
            flex:            1,
            backgroundColor: HEADER,
        },
        addressBarRow: {
            flexDirection: 'row',
            padding:       8,
        },
        webView:       {
            backgroundColor: BGWASH,
            height:          350,
        },
        addressBarTextInput: {
            backgroundColor: BGWASH,
            borderColor:     'transparent',
            borderRadius:    3,
            borderWidth:     1,
            height:          24,
            paddingLeft:     10,
            paddingTop:      3,
            paddingBottom:   3,
            flex:            1,
            fontSize:        14,
        },
        navButton:           {
            width:           20,
            padding:         3,
            marginRight:     3,
            alignItems:      'center',
            justifyContent:  'center',
            backgroundColor: BGWASH,
            borderColor:     'transparent',
            borderRadius:    3,
        },
        disabledButton:      {
            width:           20,
            padding:         3,
            marginRight:     3,
            alignItems:      'center',
            justifyContent:  'center',
            backgroundColor: DISABLED_WASH,
            borderColor:     'transparent',
            borderRadius:    3,
        },
        goButton:            {
            height:          24,
            padding:         3,
            marginLeft:      8,
            alignItems:      'center',
            backgroundColor: BGWASH,
            borderColor:     'transparent',
            borderRadius:    3,
            alignSelf:       'stretch',
        },
        statusBar:           {
            flexDirection: 'row',
            alignItems:    'center',
            paddingLeft:   5,
            height:        22,
        },
        statusBarText:       {
            color:    'white',
            fontSize: 13,
        },
        spinner:             {
            width:       20,
            marginRight: 6,
        },
    }
)


interface WebViewState {

    url: string
    status?: string
    backButtonEnabled?: boolean
    forwardButtonEnabled?: boolean
    loading?: boolean
}

class WebViewExample extends React.Component<any, WebViewState> {

    private _input: React.TextInput
    private _webView: React.WebView

    componentWillMount() {
        this.setState(
            {
                url:                  DEFAULT_URL,
                status:               'No Page Loaded',
                backButtonEnabled:    false,
                forwardButtonEnabled: false,
                loading:              true,
            }
        )
    }

    private inputText = ''

    private handleTextInputChange = ( event: {nativeEvent: {text: string}} ): void => {
        this.inputText = event.nativeEvent.text
    }

    render() {
        this.inputText = this.state.url

        return (
            <View style={[styles.container]}>
                <View style={[styles.addressBarRow]}>
                    <TouchableOpacity onPress={this.goBack}>
                        <View style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
                            <Text>
                                {'<'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.goForward}>
                        <View style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
                            <Text>
                                {'>'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        ref={(c) => { this._input = c}}
                        autoCapitalize="none"
                        value={this.state.url}
                        onSubmitEditing={this.onSubmitEditing}
                        onChange={this.handleTextInputChange}
                        clearButtonMode="while-editing"
                        style={styles.addressBarTextInput}
                    />
                    <TouchableOpacity onPress={this.pressGoButton}>
                        <View style={styles.goButton}>
                            <Text>
                                Go!
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <WebView
                    ref={(c) => { this._webView = c}}
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    url={this.state.url}
                    onNavigationStateChange={this.onNavigationStateChange}
                    startInLoadingState={true}
                />
                <View style={styles.statusBar}>
                    <Text style={styles.statusBarText}>{this.state.status}</Text>
                </View>
            </View>
        )
    }

    private goBack = (): void => {
        this._webView.goBack()
    }

    private goForward = (): void => {
        this._webView.goForward()
    }

    private reload = (): void => {
        this._webView.reload()
    }

    private onNavigationStateChange = ( navState: React.NavState ): void => {
        this.setState(
            {
                backButtonEnabled:    navState.canGoBack,
                forwardButtonEnabled: navState.canGoForward,
                url:                  navState.url,
                status:               navState.title,
                loading:              navState.loading,
            }
        )
    }

    private onSubmitEditing = ( /*event*/ ): any => {
        this.pressGoButton()
    }

    private pressGoButton = (): void => {
        var url = this.inputText.toLowerCase()
        if ( url === this.state.url ) {
            this.reload()
        }
        else {
            this.setState( {url: url} )
        }
        // dismiss keyoard
        this._input.blur()
    }

}


export default {

    title:       '<WebView>',
    description: 'Base component to display web content',
    examples:    [
        {
            title: 'WebView',
            render: (): React.ReactElement<any> => {
                return (<WebViewExample />)
            }
        } as RNTSExample
    ]
} as RNTSExampleModule

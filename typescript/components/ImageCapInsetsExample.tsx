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
          Image,
          StyleSheet,
          Text,
          View,
          } = React

const styles = StyleSheet.create(
    {
        background:      {
            backgroundColor: '#F6F6F6',
            justifyContent:  'center',
            alignItems:      'center',
        },
        horizontal: {
            flexDirection: 'row',
        },
        storyBackground: {
            width:       250,
            height:      150,
            borderWidth: 1,
            resizeMode:  Image.resizeMode.stretch,
        },
        text:            {
            fontSize: 13.5,
        }
    }
)


class ImageCapInsetsExample extends React.Component<any,any> {

    render() {
        return (
            <View>
                <View style={styles.background}>
                    <Text>
                        capInsets: none
                    </Text>
                    <Image
                        source={require('../../images/story-background.png')}
                        style={styles.storyBackground}
                        capInsets={{left: 0, right: 0, bottom: 0, top: 0}}
                    />
                </View>
                <View style={[styles.background, {paddingTop: 10}]}>
                    <Text>
                        capInsets: 15
                    </Text>
                    <Image
                        source={require('../../images/story-background.png')}
                        style={styles.storyBackground}
                        capInsets={{left: 15, right: 15, bottom: 15, top: 15}}
                    />
                </View>
            </View>
        )
    }
}

export default ImageCapInsetsExample

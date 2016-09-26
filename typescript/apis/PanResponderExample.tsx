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
 *
 * NOTE: BGR: Fixed to correctly call setNativeProps
 */

'use strict'

import * as React from 'react-native';
import RNTSExample from '../RNTSExample'
import RNTSExampleModule from '../RNTSExampleModule'

const {
          StyleSheet,
          PanResponder,
          View
          } = React

const CIRCLE_SIZE = 80
const CIRCLE_COLOR = 'blue'
const CIRCLE_HIGHLIGHT_COLOR = 'green'
const PAN_RESPONDER_REF = 'panResponder'

interface Style { 
  circle: React.ViewStyle,
  container: React.ViewStyle,
}

const styles = StyleSheet.create<Style>(
    {
        circle:    {
            width:           CIRCLE_SIZE,
            height:          CIRCLE_SIZE,
            borderRadius:    CIRCLE_SIZE / 2,
            backgroundColor: CIRCLE_COLOR,
            position:        'absolute',
            left:            0,
            top:             0,
        },
        container: {
            flex:       1,
            paddingTop: 64,
        }
    }
)


class NavigatorIOSExample extends React.Component<any,any> {


    static get title() { return 'PanResponder Sample'}

    static get description() { return 'Basic gesture handling example' }

    private _panResponder: React.PanResponderInstance = null
    private _previousLeft = 0
    private _previousTop = 0
    private _circleStyles: { left: number; top: number } = { left: 0, top: 0 }
    private circle: React.View = null

    componentWillMount() {
        this._panResponder = PanResponder.create(
            {
                onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
                onMoveShouldSetPanResponder:  this._handleMoveShouldSetPanResponder,
                onPanResponderGrant:          this._handlePanResponderGrant,
                onPanResponderMove:           this._handlePanResponderMove,
                onPanResponderRelease:        this._handlePanResponderEnd,
                onPanResponderTerminate:      this._handlePanResponderEnd
            }
        )

        console.log( 'PAN HANDLERS', this._panResponder.panHandlers )

        this._previousLeft = 20
        this._previousTop = 84
        this._circleStyles = {
            left: this._previousLeft,
            top:  this._previousTop
        }
    }

    componentDidMount() {
        this._updatePosition()
    }

// TODO: Fix this error:
// [ts] Type '(circle: ViewStatic) => void' is not assignable to type '(string | ((instance: Component<ViewProperties, {} | void>) => any)) & (string | ((instance: View...'.
//   Type '(circle: ViewStatic) => void' is not assignable to type 'string | ((instance: Component<ViewProperties, {} | void>) => any)'.
//     Type '(circle: ViewStatic) => void' is not assignable to type '(instance: Component<ViewProperties, {} | void>) => any'.
//       Types of parameters 'circle' and 'instance' are incompatible.
//         Type 'Component<ViewProperties, {} | void>' is not assignable to type 'ViewStatic'.
//           Property 'measure' is missing in type 'Component<ViewProperties, {} | void>'.
// (parameter) circle: React.ViewStatic

    // type CElement<P, T extends Component<P, ComponentState>> = ComponentElement<P, T>;
    // ComponentState = {} | void
    // instance: Component<ViewProperties, {} | void>

    // export interface ViewProperties extends ViewPropertiesAndroid, ViewPropertiesIOS, GestureResponderHandlers, Touchable, React.Props<ViewStatic> {

    // export interface ViewStatic extends NativeComponent, React.ComponentClass<ViewProperties> {

    render() {
        return (
            <View
                style={styles.container}>
                <View
                    //ref={(circle: React.View) => {this.circle = circle}}
                    ref={PAN_RESPONDER_REF}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}
                />
            </View>
        )
    }

    private _highlight = (): void => {
        this.circle && this.circle.setNativeProps( { style: { backgroundColor: CIRCLE_HIGHLIGHT_COLOR } } )
    }

    private _unHighlight = (): void => {
        this.circle && this.circle.setNativeProps( { style: { backgroundColor: CIRCLE_COLOR } } )
    }

    private _updatePosition = (): void => {
        this.circle && this.circle.setNativeProps( { style: this._circleStyles } )
    }

    private _handleStartShouldSetPanResponder = ( e: React.GestureResponderEvent, gestureState: React.PanResponderGestureState ): boolean => {
        // Should we become active when the user presses down on the circle?
        return true
    }

    private _handleMoveShouldSetPanResponder = ( e: React.GestureResponderEvent, gestureState: React.PanResponderGestureState ): boolean => {
        // Should we become active when the user moves a touch over the circle?
        return true
    }

    private _handlePanResponderGrant = ( e: React.GestureResponderEvent, gestureState: React.PanResponderGestureState ): void => {
        this._highlight()
    }

    private _handlePanResponderMove = ( e: React.GestureResponderEvent, gestureState: React.PanResponderGestureState ): void => {
        this._circleStyles.left = this._previousLeft + gestureState.dx
        this._circleStyles.top = this._previousTop + gestureState.dy
        this._updatePosition()
    }

    private _handlePanResponderEnd = ( e: React.GestureResponderEvent, gestureState: React.PanResponderGestureState ): void => {
        this._unHighlight()
        this._previousLeft += gestureState.dx
        this._previousTop += gestureState.dy
    }
}


export default NavigatorIOSExample

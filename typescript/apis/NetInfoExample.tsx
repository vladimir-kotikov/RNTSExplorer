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
 * NOTE: The API seems to have changed and this was completely rewritten
 * to take it into account. The old API is commented out
 */

'use strict'

import * as React from 'react';
import RNTSExample from '../RNTSExample'
import RNTSExampleModule from '../RNTSExampleModule'

import {
          NetInfo,
          Text,
          View
} from 'react-native';

interface ReachabilitySubscriptionState {
    reachabilityHistory: string[]
}

class ReachabilitySubscription extends React.Component<any, ReachabilitySubscriptionState> {

    componentWillMount() {
        this.setState( { reachabilityHistory: [] } )
    }

    componentDidMount() {
        //NetInfo.reachabilityIOS.addEventListener(
        //    'change',
        //    this._handleReachabilityChange
        //)
        NetInfo.addEventListener(
            'change',
            this._handleReachabilityChange
        )

    }

    componentWillUnmount() {
        //NetInfo.reachabilityIOS.removeEventListener(
        //    'change',
        //    this._handleReachabilityChange
        //)
        NetInfo.removeEventListener(
            'change',
            this._handleReachabilityChange
        )

    }

    private _handleReachabilityChange = ( reachability: string ): void => {
        const reachabilityHistory = this.state.reachabilityHistory.slice()
        reachabilityHistory.push( reachability )
        this.setState( { reachabilityHistory } )
    }

    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.state.reachabilityHistory)}</Text>
            </View>
        )
    }
}

interface ReachabilityCurrentState {
    reachability: string
}

class ReachabilityCurrent extends React.Component<any,ReachabilityCurrentState> {

    componentWillMount() {
        this.setState( { reachability: null } )
    }

    componentDidMount() {

        //NetInfo.reachabilityIOS.addEventListener(
        //    'change',
        //    this._handleReachabilityChange
        //)
        //NetInfo.reachabilityIOS.fetch().done(
        //    ( reachability: string ) => { this.setState( { reachability } ) }
        //)

        NetInfo.addEventListener(
            'change',
            this._handleReachabilityChange
        )
        NetInfo.fetch().done(
            ( reachability: string ) => { this.setState( { reachability } ) }
        )

    }

    componentWillUnmount() {
        //NetInfo.reachabilityIOS.removeEventListener(
        //    'change',
        //    this._handleReachabilityChange
        //)
        NetInfo.removeEventListener(
            'change',
            this._handleReachabilityChange
        )

    }

    private _handleReachabilityChange = ( reachability: string ): void => {
        this.setState( { reachability } )
    }

    render() {
        return (
            <View>
                <Text>{this.state.reachability}</Text>
            </View>
        )
    }
}

interface IsConnectedState {
    isConnected: boolean
}

class IsConnected extends React.Component<any,IsConnectedState> {
    componentWillMount() {
        this.setState({ isConnected: false })
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange
        )
        NetInfo.isConnected.fetch().done(
            ( isConnected: boolean ) => { this.setState( { isConnected } ) }
        )
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectivityChange
        )
    }

    private _handleConnectivityChange = ( isConnected: boolean ) => {
        this.setState( { isConnected } )
    }

    render() {
        return (
            <View>
                <Text>{this.state.isConnected ? 'Online' : 'Offline'}</Text>
            </View>
        )
    }
}

export default {

    title:       'NetInfo',
    description: 'Monitor network status',
    examples:    [
        {
            title:       'NetInfo.isConnected',
            description: 'Asyncronously load and observe connectivity',
            render:      (): React.ReactElement<any> => { return <IsConnected /> }
        } as RNTSExample,
        {
            title:       'NetInfo.reachabilityIOS',
            description: 'Asyncronously load and observe iOS reachability',
            render:      (): React.ReactElement<any> => { return <ReachabilityCurrent /> }
        } as RNTSExample,
        {
            title:       'NetInfo.reachabilityIOS',
            description: 'Observed updates to iOS reachability',
            render:      (): React.ReactElement<any> => { return <ReachabilitySubscription /> }
        } as RNTSExample,
    ]
} as RNTSExampleModule

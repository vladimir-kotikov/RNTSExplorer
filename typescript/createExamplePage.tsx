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
import { Component } from 'react';
var invariant = require('invariant');

import RNTSExplorerBlock from './RNTSExplorerBlock'
import RNTSExplorerPage from  './RNTSExplorerPage'
import RNTSExample from './RNTSExample'
import RNTSExampleModule from './RNTSExampleModule'


const createExamplePage = ( title: string, exampleModule: RNTSExampleModule ): React.ComponentClass<any> => {

    invariant ( !!exampleModule.examples ,'The module must have examples')
    //if ( !exampleModule.examples ) throw('The module must have examples')


    class ExamplePage extends React.Component<any,any> {
        public static get title() { return exampleModule.title }

        public static get description() { return exampleModule.description }


        private getBlock = ( example: RNTSExample, i: number ): JSX.Element => {

            // Hack warning: This is a hack because the www UI explorer requires
            // renderComponent to be called.
            //var originalRenderComponent = React.renderComponent
            //var originalRender = React.render
            //var renderedComponent

            //// and workaround is removed from react-native.js
            //React.render = React.renderComponent = function ( element, container ) {
            //    renderedComponent = element
            //}
            //
            //const result = example.render( null )
            //if ( result ) {
            //    renderedComponent = result
            //}
            //
            //React.renderComponent = originalRenderComponent
            //React.render = originalRender

            var renderedComponent: React.ReactElement<any> = example.render()

            return (
                <RNTSExplorerBlock
                    key={i}
                    title={example.title}
                    description={example.description}>
                    {renderedComponent}
                </RNTSExplorerBlock>
            )
        }

        render() {
            return (
                <RNTSExplorerPage title={title}>
                    {exampleModule.examples.map(this.getBlock)}
                </RNTSExplorerPage>
            )
        }
    }

    return ExamplePage
}

export default createExamplePage

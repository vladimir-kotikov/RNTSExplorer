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
          PickerIOS,
          Text,
          View
          } = React

const PickerItemIOS = PickerIOS.Item

interface MakeModels {
    name: string
    models: string[]
}

const CAR_MAKES_AND_MODELS: {[key: string]: MakeModels} = {
    amc:       {
        name:   'AMC',
        models: [ 'AMX', 'Concord', 'Eagle', 'Gremlin', 'Matador', 'Pacer' ],
    },
    alfa:      {
        name:   'Alfa-Romeo',
        models: [ '159', '4C', 'Alfasud', 'Brera', 'GTV6', 'Giulia', 'MiTo', 'Spider' ],
    },
    aston:     {
        name:   'Aston Martin',
        models: [ 'DB5', 'DB9', 'DBS', 'Rapide', 'Vanquish', 'Vantage' ],
    },
    audi:      {
        name:   'Audi',
        models: [ '90', '4000', '5000', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q5', 'Q7' ],
    },
    austin:    {
        name:   'Austin',
        models: [ 'America', 'Maestro', 'Maxi', 'Mini', 'Montego', 'Princess' ],
    },
    borgward:  {
        name:   'Borgward',
        models: [ 'Hansa', 'Isabella', 'P100' ],
    },
    buick:     {
        name:   'Buick',
        models: [ 'Electra', 'LaCrosse', 'LeSabre', 'Park Avenue', 'Regal',
                  'Roadmaster', 'Skylark' ],
    },
    cadillac:  {
        name:   'Cadillac',
        models: [ 'Catera', 'Cimarron', 'Eldorado', 'Fleetwood', 'Sedan de Ville' ],
    },
    chevrolet: {
        name:   'Chevrolet',
        models: [ 'Astro', 'Aveo', 'Bel Air', 'Captiva', 'Cavalier', 'Chevelle',
                  'Corvair', 'Corvette', 'Cruze', 'Nova', 'SS', 'Vega', 'Volt' ],
    },
}

interface State {
    carMake?: string
    modelIndex?: number
}

class PickerExample extends React.Component<any,State> {
    componentWillMount() {
        this.setState(
            {
                carMake:    'cadillac',
                modelIndex: 3
            }
        )
    }

    render() {
        const make = CAR_MAKES_AND_MODELS[ this.state.carMake ]
        const selectionString = make.name + ' ' + make.models[ this.state.modelIndex ]
        return (
            <View>
                <Text>Please choose a make for your car:</Text>
                <PickerIOS
                    selectedValue={this.state.carMake}
                    onValueChange={(carMake: string) => this.setState({carMake, modelIndex: 0})}>
                    {Object.keys(CAR_MAKES_AND_MODELS).map((carMake) => (
                    <PickerItemIOS
                        key={carMake}
                        value={carMake}
                        label={CAR_MAKES_AND_MODELS[carMake].name}
                    />
                        )
                        )}
                </PickerIOS>
                <Text>Please choose a model of {make.name}:</Text>
                <PickerIOS
                    selectedValue={this.state.modelIndex}
                    key={this.state.carMake}
                    onValueChange={(modelIndex: number) => this.setState({modelIndex})}>
                    {CAR_MAKES_AND_MODELS[this.state.carMake].models.map(
                        (modelName, modelIndex) => (
                                <PickerItemIOS
                                    key={this.state.carMake + '_' + modelIndex}
                                    value={modelIndex}
                                    label={modelName}
                                />
                            ))
                        }
                </PickerIOS>
                <Text>You selected: {selectionString}</Text>
            </View>
        )
    }
}

export default {
    title:       '<PickerIOS>',
    description: 'Render lists of selectable options with UIPickerView.',
    examples:    [
                     {
                         title:  '<PickerIOS>',
                         render: (): React.ReactElement<any> => {
                             return <PickerExample />
                         }
                     } ] as RNTSExample[]
} as RNTSExampleModule



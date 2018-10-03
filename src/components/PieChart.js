import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg';

class Pie extends React.PureComponent {
    fillColors = [
        '#36a2eb',
        '#ffce56',
        '#4bc0c0',
        '#9966ff',
        '#ff9f40'
    ];

    render() {
        const { transactions } = this.props;
        console.log('Analytics', transactions);
        const testData = transactions.map((transaction, index) => {
            return ({
                key: transaction.category,
                value: transaction.total,
                svg: { fill: this.fillColors[index] }
            })
        })

        console.log('testData', testData);
        const data = [
            {
                key: 1,
                amount: 50,
                svg: { fill: '#600080' },
            },
            {
                key: 2,
                amount: 50,
                svg: { fill: '#9900cc' }
            },
            {
                key: 3,
                amount: 40,
                svg: { fill: '#c61aff' }
            },
            {
                key: 4,
                amount: 95,
                svg: { fill: '#d966ff' }
            },
            {
                key: 5,
                amount: 35,
                svg: { fill: '#ecb3ff' }
            }
        ]

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[0]}
                        y={pieCentroid[1]}
                        fill={'black'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.key}
                    </Text>
                )
            })
        }

        return (
            <PieChart
                style={{ height: 200, flex: 1 }}
                valueAccessor={({ item }) => item.value}
                data={testData}
                spacing={0}
                outerRadius={'95%'}
            >
                <Labels />
            </PieChart>
        )
    }



}

export default Pie
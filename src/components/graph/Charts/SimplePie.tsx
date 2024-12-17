import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const SimplePie = () => {
    return (
        <Chart
            options={{
                colors: COLORS,
                labels: ['Team A', 'Team B', 'Team C'],
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: 'bottom',
                            },
                        },
                    },
                ],
            }}
            series={[44, 55, 13]}
            height={250}
            width={'50%'}
            type="pie"
        />
    )
}

export default SimplePie

import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const SimpleDonut = () => {
    return (
        <Chart
            options={{
                colors: COLORS,
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
            series={[44, 55, 41]}
            height={200}
            type="donut"
        />
    )
}

export default SimpleDonut

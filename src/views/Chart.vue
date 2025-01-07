<template>
    <section v-if="marketHistory" class="chart">
        <Line :data="dataLine" :options="options" />
        <Radar :data="dataRadar" :options="options" />
    </section>
</template>

<script>
import { bitcoinService } from '@/services/bitcoinService'
import { Line } from 'vue-chartjs'
import { Radar } from 'vue-chartjs'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    Filler,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default {
    data() {
        return {
            marketHistory: null,
            dataLine: null,
            dataRadar: null,
            options: {
                responsive: true,
            },
        }
    },
    methods: {
        async getMarketHistory() {
            try {
                this.marketHistory =
                    await bitcoinService.getMarketPriceHistory()
                this.prepareData()
            } catch (error) {
                console.error('Error fetching market history')
            }
        },
        prepareData() {
            if (this.marketHistory?.values?.length) {
                this.dataLine = {
                    labels: this.marketHistory.values
                        .slice(0, 10)
                        .map(val =>
                            new Date(val.x * 1000).toLocaleDateString('en-IL')
                        ),
                    datasets: [
                        {
                            label: 'Market History',
                            backgroundColor: '#79a1f8',
                            data: this.marketHistory.values
                                .slice(0, 10)
                                .map(val => val.y),
                        },
                    ],
                }
                this.dataRadar = {
                    labels: this.marketHistory.values
                        .slice(0, 10)
                        .map(val =>
                            new Date(val.x * 1000).toLocaleDateString('en-IL')
                        ),
                    datasets: [
                        {
                            label: 'First 10 days',
                            backgroundColor: 'rgba(179,181,198,0.2)',
                            borderColor: 'rgba(179,181,198,1)',
                            pointBackgroundColor: 'rgba(179,181,198,1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(179,181,198,1)',
                            data: this.marketHistory.values
                                .slice(0, 10)
                                .map(val => val.y),
                        },
                        {
                            label: 'Next 10 days',
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            pointBackgroundColor: 'rgba(255,99,132,1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(255,99,132,1)',
                            data: this.marketHistory.values
                                .slice(10, 20)
                                .map(val => val.y),
                        },
                    ],
                }
            }
        },
    },
    async created() {
        await this.getMarketHistory()
    },
    components: {
        Line,
        Radar,
    },
}
</script>

<style lang="scss">
.chart {
    max-width: 60vw;
    margin-inline: auto;

    > * {
        margin-block-end: 2em;
    }
}
</style>

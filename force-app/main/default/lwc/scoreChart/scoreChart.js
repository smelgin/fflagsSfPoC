import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chart';
import getIndustryScore from '@salesforce/apex/ScoreChartController.getIndustryScore';

export default class ScoreChart extends LightningElement {
    @api clientScore;
    @api mediaScore;
    @api industry;
    chart;
    chartjsInitialized = false;

    async renderedCallback() {
        if (this.chartjsInitialized) {
            return;
        }
        if (this.industry !== null) {
            try {
                let result = await getIndustryScore({industry : this.industry})
                this.mediaScore = result;
            } catch (error) {
                console.log(error);
                this.mediaScore = 10.00;
            }
            await loadScript(this, chartjs);
            const canvas = document.createElement('canvas');
            this.template.querySelector('div.chart').appendChild(canvas);
            const ctx = canvas.getContext('2d');
            this.chart = new window.Chart(ctx, this.config);
            this.chartjsInitialized = true;
        } 
    }

    get config() {
        return {
            type: 'bar',
            data: {
                labels: ['Client Score', 'Media Score'],
                datasets: [
                    {
                        label: 'Score',
                        data: [this.clientScore, this.mediaScore],
                        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            max: 100,
                            min: 0
                        }
                    }]
                }
            }
        };
    }
}
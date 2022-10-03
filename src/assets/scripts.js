// import * as echarts from 'echarts';

// var chartDom = document.getElementById('#chart');
// var myChart = echarts.init(chartDom);
// var option;

// option = {
//     xAxis: {
//         type: 'category',
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//     },
//     yAxis: {
//         type: 'value'
//     },
//     series: [
//         {
//             data: [120, 200, 150, 80, 70, 110, 130],
//             type: 'bar',
//             showBackground: true,
//             backgroundStyle: {
//                 color: 'rgba(180, 180, 180, 0.2)'
//             }
//         }
//     ]
// };

// option && myChart.setOption(option);

console.log(document.querySelector('.content'))
$(document).ready(function() {
    $('#bar').click(function () {
        console.log('Clicked');
        barClicked = !barClicked
        console.log(barClicked)
    })
})

//navbar width
var content=document.querySelector('.content');
var btn=document.querySelector('.button-dark');
var mainContainer=document.querySelector('.mainContainer');

btn.addEventListener('click',()=>{
    content.classList.toggle('active1');
    mainContainer.classList.toggle('mainContainerWidth');
    console.log("hello")
});

//week , month, year stats
                                      //SALES
var SalesText=document.querySelector('.SalesText');
var SalesMoney=document.querySelector('.SalesMoney');
var SalesIncPercent=document.querySelector('.SalesIncPercent');
//WEEK
var weeklySales=document.querySelector('.weeklySales');

weeklySales.addEventListener('click',()=>{
    SalesText.innerHTML="Weekly Sales";
    SalesMoney.innerHTML="Rs. 15,000";
    SalesIncPercent.innerHTML="Increased by 20%";
});
//MONTH
var monthlySales=document.querySelector('.monthlySales');

monthlySales.addEventListener('click',()=>{
    SalesText.innerHTML="Montly Sales";
    SalesMoney.innerHTML="Rs. 35,000";
    SalesIncPercent.innerHTML="Increased by 35%";
});
//YEAR
var yearlySales=document.querySelector('.yearlySales');

yearlySales.addEventListener('click',()=>{
    SalesText.innerHTML="Yearly Sales";
    SalesMoney.innerHTML="Rs. 1,45,000";
    SalesIncPercent.innerHTML="Increased by 45%";
});

                                        //ORDERS
var OrderText=document.querySelector('.OrderText');
var OrderNumber=document.querySelector('.OrderNumber');
var OrderIncPercent=document.querySelector('.OrderIncPercent');

//WEEK
var weeklyOrders=document.querySelector('.weeklyOrders');

weeklyOrders.addEventListener('click',()=>{
    OrderText.innerHTML="Weekly Orders";
    OrderNumber.innerHTML="Rs. 2,000";
    OrderIncPercent.innerHTML="Increased by 5%";
});
//MONTH
var monthlyOrders=document.querySelector('.monthlyOrders');

monthlyOrders.addEventListener('click',()=>{
    OrderText.innerHTML="Monthly Orders";
    OrderNumber.innerHTML="Rs. 8,000";
    OrderIncPercent.innerHTML="Increased by 7%";
});
//YEAR
var yearlyOrders=document.querySelector('.yearlyOrders');

yearlyOrders.addEventListener('click',()=>{
    OrderText.innerHTML="Yearly Orders";
    OrderNumber.innerHTML="Rs. 35,000";
    OrderIncPercent.innerHTML="Increased by 2%";
});

                                           //PROFIT
var ProfitText=document.querySelector('.ProfitText');
var ProfitMoney=document.querySelector('.ProfitMoney');
var ProfitIncPercent=document.querySelector('.ProfitIncPercent');

//WEEK
var weeklyProfit=document.querySelector('.weeklyProfit');

weeklyProfit.addEventListener('click',()=>{
    ProfitText.innerHTML="Weekly Profit";
    ProfitMoney.innerHTML="Rs. 2,000";
    ProfitIncPercent.innerHTML="Increased by 3%";
});
//MONTH
var monthlyProfit=document.querySelector('.monthlyProfit');

monthlyProfit.addEventListener('click',()=>{
    ProfitText.innerHTML="Monthly Profit";
    ProfitMoney.innerHTML="Rs. 10,000";
    ProfitIncPercent.innerHTML="Increased by 8%";
});
//YEAR
var yearlyProfit=document.querySelector('.yearlyProfit');

yearlyProfit.addEventListener('click',()=>{
    ProfitText.innerHTML="Yearly Profit";
    ProfitMoney.innerHTML="Rs. 1,00,000";
    ProfitIncPercent.innerHTML="Increased by 15%";
});








//charts
var ctx = document.getElementById('myChart').getContext('2d');
var xValues = [100,200,300,400,500,600,700,800,900,1000];
var myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
            label:"Orders",
            data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
            borderColor: "#ffa69e",
            backgroundColor:"#ffa69e",
            borderWidth:"100px",
            borderRadius:"5px",
            fill: false
        },{
            label:"Profit",
            data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
            borderColor: "#b8f2e6",
            backgroundColor:"#b8f2e6",
            borderWidth:0.1,
            fill: false
        },{
            label:"Sales",
            data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
            borderColor: "#5e6472",
            backgroundColor:"#5e6472",
            borderWidth:0.1,
            fill: false
        }]
    },
    options: {
        plugins:{
            legend: {
                display: false
            }
        },
        scale: {
            ticks: {
               display: false,
               maxTicksLimit: 0
            },
            yAxes: [{
                display: false,
                gridLines: {
                    display:false
                }
            }],
        },
    }

});

                  //Weekly Chart
var Weekly_Labels=[100,200,300,400,500,600,700];
var Weekly_Sales=[100,200,300,400,500,600,670];
var Weekly_Orders=[300,250,340,100,400,200,170];
var Weekly_Profit=[20,70,100,30,5,10,50];
var weekly=document.querySelector('.weekly');
weekly.addEventListener('click',()=>{
    var data= myChart.config.data;
    data.datasets[0].data=Weekly_Sales;
    data.datasets[1].data=Weekly_Orders;
    data.datasets[2].data=Weekly_Profit;
    data.labels=Weekly_Labels;
    myChart.update()
});

                    //monthly chart
var Monthly_Labels=[];
var Monthly_Sales=[];
var Monthly_Orders=[];
var Monthly_Profit=[];
for (let i = 1; i <= 31; i++) {Monthly_Labels.push(i);}
for (let i = 1; i <= Monthly_Labels.length; i++) {
    Monthly_Sales.push((i+10)*4);
    Monthly_Orders.push((i+10)*5);
    Monthly_Profit.push((i+10)*2);
}
var Monthly=document.querySelector('.monthly');
Monthly.addEventListener('click',()=>{
    var data= myChart.config.data;
    data.datasets[0].data=Monthly_Sales;
    data.datasets[1].data=Monthly_Orders;
    data.datasets[2].data=Monthly_Profit;
    data.labels=Monthly_Labels;
    myChart.update()
});

              //yealy chart
var Yearly_Labels=[];
var Yearly_Sales=[];
var Yearly_Orders=[];
var Yearly_Profit=[];
for (let i = 1; i <= 12; i++) {Yearly_Labels.push(i);}
for (let i = 1; i <= Yearly_Labels.length; i++) {
    Yearly_Sales.push((i+10)*4);
    Yearly_Orders.push((i+10)*5);
    Yearly_Profit.push((i+10)*2);
}
var yearly=document.querySelector('.yearly');
yearly.addEventListener('click',()=>{
    var data= myChart.config.data;
    data.datasets[0].data=Yearly_Sales;
    data.datasets[1].data=Yearly_Orders;
    data.datasets[2].data=Yearly_Profit;
    data.labels=Yearly_Labels;
    myChart.update()
});


var productChart = document.getElementById('productChart').getContext('2d');
var productC=new Chart(productChart,{
    type:"doughnut",
    data:{
        labels: [
            'Cracker1',
            'Cracker2',
            'Cracker3',
            "Cracker4"
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100,200],
            backgroundColor: [
            '#f7aef8',
            '#b388eb',
            '#72ddf7',
            '#8093f1'
            ],
            hoverOffset:5
        }]
    },
    options: {
        plugins:{
            legend: {
                display: false
            }
        }
    }
});
var productRating =document.getElementById('productRating').getContext('2d');
var productR=new Chart(productRating,{
    type:'pie',
    data:{
        labels: ['5', '4', '3', '2', '1'],
        datasets:[{
            data:[100,200,15,21,6],
            backgroundColor:[
                '#ee6055',
                '#f86624',
                '#aaf683',
                '#662e9b',
                '#43bccd'
            ]
        }],
    },
    options: {
        plugins:{
            legend: {
                display: false
            }
        }
    }
});

            //Cracker_1
var Cracker_1=document.querySelector('.Cracker_1');
Cracker_1.addEventListener('click',()=>{
    var data= productR.config.data;
    data.datasets[0].data=[200,300,200,100,50];
    productR.update();
});
                 //Cracker_2
var Cracker_2=document.querySelector('.Cracker_2');
Cracker_2.addEventListener('click',()=>{
    var data= productR.config.data;
    data.datasets[0].data=[50,400,200,1000,500];
    productR.update();
});

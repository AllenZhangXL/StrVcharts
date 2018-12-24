<template>
  <div class="hello">
    <!-- cdn v-chart -->
    <ve-line :data="chartData" :settings="chartSettings" :mark-line="maxtotal" :data-zoom="dataZoom" :grid="grid"></ve-line>
    <!-- audience v-chart -->
    <ve-line :data="chartData2" :settings="chartSettings2" :grid="grid"  :data-zoom="dataZoom"></ve-line>
  </div>
</template>

<script>
import axios from 'axios'
import Charts from 'v-charts'

export default {
  name: 'HelloWorld',
//settings for V-charts 
  data(){
    this.grid={
      right:'3%'
    }

    this.dataZoom=[
      {
        type:'slider',
        start:0,
        end:20
      }
    ]

    this.maxtotal= {
      data:[
        {
          name: 'MaxLine',
          type:'max'
        } 
      ]
    }

// chartSettings for cdn v-chart
    this.chartSettings={
      stack: {'Gbps':['cdn','p2p']},
      //  yAxisType:['Gbps'],
       yAxisName:['Gbps'],
      area: true
    }
//  chartSettings for audience v-chart
    this.chartSettings2={
      area: true
    }
    return{ 
       chartData2:{
        columns:['date','audienceNum'],
        rows: {}
      },
      chartData:{
        columns:['date','cdn','p2p','total','spikeReduction'],
        rows:{}
  }
    }
  },
  mounted(){
// post auth to get session 
    axios.post('http://localhost:3000/auth',{
      identifiant:"swagtv",
      password:"bling$bling"
    }).then((response) =>{
      var timenow = Math.round(new Date());
// post to get audience and cdn&p2p data
      axios.all([axios.post('http://localhost:3000/audience',{
        session_token:response.data.session_token,
        from:(1509490800000 + timenow - 1510826400000).toString(),
        to:timenow.toString()
        
      }),
// post to get bandwidth data
      axios.post('http://localhost:3000/bandwidth',{
        session_token:response.data.session_token,
        from:(1509490800000 + timenow - 1510826400000).toString(),
        to:timenow.toString()
      })])
      .then(axios.spread((audienceData,bandwidthData) => {

//set audience data
        var audienceObj = JSON.parse(JSON.stringify(audienceData.data));
        var audienceArry = [];
        audienceObj.audience.forEach(e=>{
          audienceArry.push({
            date: new Date(e[0]).toLocaleString(),
            audienceNum:e[1]
          });
          })
        this.chartData2.rows = audienceArry;

// set cdn & p2p data
        var bandwidthObj = JSON.parse(JSON.stringify(bandwidthData.data));
        var bandwidthArry = [];
        var cdn =[];
        var p2p =[];
        cdn = bandwidthObj.cdn;
        p2p = bandwidthObj.p2p;
        for(var i=0;i< cdn.length;i++){
         let lg ={
           date : new Date(cdn[i][0]).toLocaleString(),
// convert byte/s - gbps
           cdn : cdn[i][1]/124999999,
           p2p : p2p[i][1]/124999999,
           total: cdn[i][1]/124999999+p2p[i][1]/124999999,
           spikeReduction:(p2p[i][1]/124999999/(cdn[i][1]/124999999+p2p[i][1]/124999999))
         };
         bandwidthArry.push(lg);
        }
         this.chartData.rows = bandwidthArry;
      }))
    })
  }
} 
  //     axios.post('http://localhost:3000/audience',{
  //       session_token:response.data.session_token,
  //       from:"1544094587000",
  //       to:"1545404987000"
  //     })
  //     .then((response)=>{
  //     console.log(response.data);
  //     var audienceObj = JSON.parse(JSON.stringify(response.data));
  //     var audienceArry =[];
  //     audienceObj.audience.forEach(e => {
  //       audienceArry.push({
  //         date: new Date(e[0]).toLocaleString(),
  //         audienceNum:e[1]
  //       });
  //       this.chartData.rows = audienceArry;
  //       this.audience = audienceArry;
  //       this.chartData2.rows = audienceArry;
  //     });
  //  });
  
//     axios.post('http://localhost:3000/audience',{
//        session_token: "149f70ce1fd82d",
//       from:"1544094587000",
//       to:"1545404987000"
//     }).then((response) => {
//       console.log(response.data);
//       var audienceObj = JSON.parse(JSON.stringify(response.data));
//       var audienceArry =[];
//       audienceObj.audience.forEach(e => {
//         audienceArry.push({
//           date: new Date(e[0]).toLocaleString(),
//           audienceNum:e[1]
//         });
//         this.chartData.rows = audienceArry;
//         this.audience = audienceArry;
//         this.chartData2.rows = audienceArry;
//       });
//    })
//      .catch((error)=>{
//        console.log(error);
//      });
//   },
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

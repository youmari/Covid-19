import React,{useState ,useEffect} from 'react';
import { fetchDailyData } from '../../api';
import styles from './Chart.module.css';
import {Line , Bar } from 'react-chartjs-2'

const Chart = ( {data :{confirmed,recovered,deaths},country}) =>{
    const [dailyData ,setDailyData] = useState([]);

    useEffect(()=> {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData())
        } 
        fetchAPI();
    } ,[]);
    
    const linechart =( 
        dailyData.length
        ? (<Line data={{labels:dailyData.map(({date})=> date),datasets:[{
            data:dailyData.map(({confirmed})=> confirmed),
            label:'Infected',
            borderColor:'#3333ff',
            fill:true,

        },{  data:dailyData.map(({deaths})=> deaths),
            label:'Deaths',
            borderColor:'red',
            backgroundColor:'rgba(255,0,0,0.5)',
            fill:true,}],}}/>)
        : null

    ) 
    
    const barChart = (
        confirmed
        ? (
            <Bar data={{ labels:['Infected','Recovered','Deaths'],
            datasets:[{label:'people',backgroundColor:['blue','green','red'],data:[confirmed.value,recovered.value,deaths.value]}]}} 
            options={{ legend: {display:false },title:{display:true,text:`Current state in ${country}`}}}/>

        ): null
    )
    return(
        <div className={styles.container}>
            {country ? barChart : linechart}
        </div>
    )
}

export default Chart;
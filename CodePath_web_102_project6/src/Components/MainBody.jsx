import React from "react";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {Chart, Line} from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title,Tooltip,Legend, Filler } from 'chart.js'; 

ChartJS.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title,Tooltip,Legend, Filler );

function MainBody() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const[chartData, SetCharData]=useState({})

  let dataLatitude=[]
  let dataLongitude=[]
  let dataState=[]

  let finalData = {
    labels:chartData.label,
    datasets: [
      {
        label: "Latitude",
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(51,200,99,.7)",
        data: chartData.datasets[0].data,
        borderWidth: 4,
      },
    ],
  };

  const options={
    maintainAspectRatio:false,
    interaction:{
      mode:'index',
      intersect:false,
      axis:'x'
    },
    Plugins:{
      tooltip:{
        enabled:true,
      },
      legend:false,
    },
    scales:{
      y:{grid:{
        drawOnChartArea:false,
        drawBorder:false,
      }},
      x:{
        grid:{
          drawBorder:false,
          borderDash:[6],
          border:false,
        },
        ticks:{
          font:{
            family:"'Mulish', sans-serif",
            size:"16px",
          }
        }
      }
    }
  }

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openbrewerydb.org/v1/breweries/random?size=10`
        );
        const dataTemp = await response.json();
        setData(dataTemp);
        if (!isCancelled) {
          // console.log(dataTemp);
          for(const dataObj of dataTemp){
            dataLatitude.push(parseFloat(dataObj.latitude))
            dataLongitude.push(parseFloat(dataObj.longitude))
            dataState.push(dataObj.state)
          }
          console.log(dataState)
          const chart=()=>{
           
            SetCharData({
              label: dataState,
              datasets:[
                {
                  label:"Latitude",
                  backgroundColor:["rgba(75,192,192,0.6)"],
                  borderColor:"rgba(51,200,99,.7)",
                  data: dataLatitude,
                  borderWidth:4
                }
              ]
            })
            
          }
          const option =
chart()
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    return () => {
      isCancelled = true;
    };
  }, []);

  
  return (
    <div className="flex gap-3">
      <div className="ml-16 mt-3">
      <div>
        <form action="">
          <label>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl text-center w-auto"
            />
          </label>
        </form>
      </div>

      <div>
        <div className="flex justify-center gap-7 mt-6">
          <div className="p-2 font-semibold text-2xl bg-green-600 rounded-md ">
            Total Data: {data.length}
          </div>
          <div className="p-2 font-semibold text-2xl bg-green-600 rounded-md">
            Mean Value:{" "}
            {data.length === 0 ? data.name : data[data.length / 2].name}
          </div>
          <div className="p-2 font-semibold text-2xl bg-green-600 rounded-md ">
            Total Data: {data.length}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 auto-cols-auto">
        <div className="p-2 font-semibold text-2xl text-green-600">Name</div>
        <div className="p-2 font-semibold text-2xl text-green-600">
          Phone Number
        </div>
        <div className="p-2 font-semibold text-2xl text-green-600">Address</div>
        {data
          .filter(function (data) {
            if (filter.length != 0) {
              if (
                filter.includes(data.name) ||
                filter.includes(data.address_1) ||
                filter.includes(data.phone)
              ) {
                return data;
              }
            } else {
              return data;
            }
          })
          .map((item, index) => {
            return (
              <>

                <Link to={`/${item.name}`} state={item} >
                  <div
                    className={`bg-gray-700 hover:scale-105 cursor-pointer rounded-2xl p-2 m-2 ${
                      search == item.name ? "bg-green-600" : ""
                    } ${search == item.phone ? "bg-green-600" : ""} ${
                      search == item.address_1 ? "bg-green-600" : ""
                    }`}
                  
                  >
                    {item.name}
                  </div>
                </Link>

                <Link to={`/${item.name}`} state={item} >
                <div
                  className={`bg-gray-700 hover:scale-105 cursor-pointer rounded-2xl p-2 m-2 ${
                    search == item.name ? "bg-green-600" : ""
                  } ${search == item.phone ? "bg-green-600" : ""} ${
                    search == item.address_1 ? "bg-green-600" : ""
                  }`}
                 
                >
                  {item.phone}
                </div>
                </Link>


                <Link to={`/${item.name}`} state={item} >
                  <div
                    className={`bg-gray-700 rounded-2xl hover:scale-105 cursor-pointer p-2 m-2 ${
                      search == item.name ? "bg-green-600" : ""
                    } ${search == item.phone ? "bg-green-600" : ""} ${
                      search == item.address_1 ? "bg-green-600" : ""
                    }`}
                    
                  >
                    {item.address_1}
                  </div>
                </Link>
              </>
            );
          })}
      </div>
      <div>
        <p className="text-green-600 text-2xl font-semibold">Filter</p>
        {filter.map((item, index) => {
          return (
            <div
              className={`bg-gray-700 rounded-2xl hover:scale-105 cursor-pointer p-2 m-2`}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div
        className={`bg-green-600 rounded-2xl hover:scale-105 cursor-pointer p-2 m-2  `}
        onClick={() => setFilter([])}
      >
        Reset Filter
      </div>
    </div>


    <div>
    <div className="max-w-sm">
      <Outlet/>
    </div>
    <div>
      {console.log(chartData)}
      {console.log(["Oregon", "New York", "Illinois", "Pennsylvania", "Virginia", "Colorado", "West Sussex", "Montana", "North Dakota", "North Carolina"])}
      <Chart type="line" data={finalData} options={options}/>

    </div>

    </div>
    
    </div>
  );
}

export default MainBody;

import "./App.css";
import GaugeChart from "react-gauge-chart";
import React, { useEffect, useState } from "react";
import axios from "axios";
import sad from "./Assets/Images/icons8-sad-64.png";
import positive from "./Assets/Images/icons8-positive-58.png";

import neutral from "./Assets/Images/icons8-neutral-50.png";

function App() {
  const [stateWiseDate, setStateWiseData] = useState("");
  const totalState = [];

  const [stateWiseCovidStat, setstateWiseCovidStat] = useState({
    active: 0,
    confirmed: 0,
    deceased: 0,
  });

  useEffect(() => {
    let active = 0;
    let confirmed = 0;
    let deceased = 0;
    // axios
    //   .get("https://api.covid19india.org/state_district_wise.json", {
    //     "Content-Type": "application/json",
    //   })
    //   .then((res) => console.log(res));
    const url = "https://api.covid19india.org/state_district_wise.json";
    //  {
    //   method: "GET",
    //  mode: "no-cors",
    // headers: {
    //   // "Content-Type": "application/json",
    //   // "Access-Control-Request-Method": "GET",
    //   "Access-Control-Allow-Origin": "*",
    //   // "Access-Control-Request-Headers: origin": " x-requested-with",
    // },
    //  }
    const options = {
      method: "GET",
    };

    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Request-Method": "GET",
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Request-Headers: origin": " x-requested-with",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        for (const states in data) {
          for (const districts in data[states]["districtData"]) {
            console.log(data[states]["districtData"][districts]["active"]);
            active += data[states]["districtData"][districts]["active"];
            confirmed += data[states]["districtData"][districts]["confirmed"];
            deceased += data[states]["districtData"][districts]["deceased"];
          }
        }
        setStateWiseData(data);
        setstateWiseCovidStat({
          active: active,
          confirmed: confirmed,
          deceased: deceased,
        });
      });
    totalState = [active, confirmed, deceased];
    return () => {};
  }, []);
  return (
    <div className="App">
      <h1>Sentimental Analysis Gauge</h1>
      <div className="gauge-container">
        <div className="sad">
          <img src={sad} />
          <div>Sad</div>
          <spam>{stateWiseCovidStat.deceased}</spam>
        </div>
        <div className="neutral">
          <img src={neutral} />
          <div>neutral</div>
          <spam>{stateWiseCovidStat.active}</spam>
        </div>
        <div className="positive">
          <img src={positive} />
          <div>Positive</div>
          <spam>{stateWiseCovidStat.confirmed}</spam>
        </div>
        <GaugeChart
          id="gauge-chart1"
          arcsLength={[10, 20, 30]}
          colors={["#5BE12C", "#F5CD19", "#EA4228"]}
          percent={0.37}
          arcPadding={0.02}
          formatTextValue={totalState.map((ele, index) => {
            return ele;
          })}
          // hideText={true}
        />
      </div>
    </div>
  );
}

export default App;

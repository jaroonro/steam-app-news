import './App.css';
import { drawGraph } from './Function';
import SteamUpdateChart from './SteamUpdateChart';
import { useState, useEffect } from 'react';


function App() {
  const [chart, setChart] = useState(null);
  const [points, setPoints] = useState([]);
  const handleKeyDown = (event)=>{
    const appId = document.querySelector('.App').lastChild.firstChild.value;
      if(event.key=='Enter'){
      UpdateChart(appId,setChart)
    }
  }
  useEffect(() => {
    // This effect will be triggered whenever points change
    if (points.length > 0) {
      setChart(<SteamUpdateChart points={points} />);
    }
  }, [points]);
  async function UpdateChart(appId, setChart) {
    await drawGraph(appId,setPoints);
    console.log(points);
  }
  return (
    <div className="App">

      <div className="App-header flex items-center justify-center">
        <div className="content relative" >

          <div className="logo">
            <span id="logo_holder">
              <a href="https://store.steampowered.com/?snr=1_4_4__global-header" aria-label="Link to the Steam Homepage">
                <img src="https://store.cloudflare.steamstatic.com/public/shared/images/header/logo_steam.svg?t=962016" width="176" height="44" alt="Link to the Steam Homepage"/>
              </a>
            </span>
          </div>

          <div className='headt absolute'>
            <p className="text">STEAM APP NEWS</p>
          </div>

        </div>
      </div>

      <div className="App-body flex flex-col items-center pt-10 relative">
        <input type="number" className="top-20 w-80 h-8 border border-gray-300 rounded-md" placeholder="Give me steam app id" onKeyDown={handleKeyDown}></input>
        <div  className="Canvas absolute w-1/2 h-auto ">{chart}</div>

      </div>
      

    </div>
  );
}

export default App;



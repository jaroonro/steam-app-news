import './App.css';
import { drawGraph, getOptions } from './Function';
import SteamUpdateChart from './SteamUpdateChart';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function App() {
  const [chart, setChart] = useState(null);
  const [points, setPoints] = useState([]);
  const handleKeyDown = async(event)=>{
      if(event.key=='Enter'){
        const app = options.filter((option)=>option.label==text.trim());
        UpdateChart(app[0].appId,setChart)
      }else{
        try {
          const newOptions = await getOptions(text.trim());
          console.log(newOptions); // Log the newOptions to check its type
          setOptions(newOptions);
        } catch (error) {
          console.error('Error fetching options:', error);
          // Handle the error appropriately
        }
      }
  }
  const [text,setText] = useState("");
  const [options,setOptions] = useState([]);
  
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
        <Autocomplete
          className="top-20 w-96 h-fit border border-gray-300 rounded-md bg-white"
          id="free-solo-demo"
          freeSolo
          options={options}
          onChange={(event, newValue) => {
            if (newValue) {
              setText(newValue.label);
            } else {
              setText('');
            }
          }}
          renderInput={(params) => <TextField {...params} value={text} placeholder="Give me app name" onKeyDown={handleKeyDown} onClick={(e) => {
            setText(e.target.value);}} onChange = {(e) => {
            setText(e.target.value);
         }}/>}
          
        />
        <div  className="Canvas absolute w-1/2 h-auto ">{chart}</div>

      </div>
      

    </div>
  );
}

export default App;



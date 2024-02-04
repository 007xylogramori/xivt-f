import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Temp from './Temp';

function App() {
  const [cityInput, setCityInput] = useState('');
  const [cityTemp, setCityTemp] = useState({});
  const [isLoading , setLoading]=useState(false);
  const handleInputChange = (event) => {
    setCityInput(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Split city names by space and create an array
    const citiesArray = cityInput.split(' ');

    // Make a POST request with the array of city names
    try {
      const response = await axios.post(`${process.env.REACT_APP_URI}/api/v1/getdetails`, {
        cities: citiesArray,
      });

      setCityTemp(response.data);
      console.log(response.data);
      setCityInput("");
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      setCityTemp({message:"Bad request"})
      setCityInput("")
    }

    setLoading(false)
  };

  return (
    <div className="App">
      <header className="App-header">
       <h3>WEATHER APP</h3>
       <form onSubmit={handleSubmit} id="" className="form" >

       
          
          <input type="text" value={cityInput} onChange={handleInputChange} />
        

        {
          isLoading?<div className="loader"></div>:
          
          <button type='submit'>submit</button>}
          
              
      </form>
        
        

        <Temp data = {cityTemp} />
      </header>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BACKEND_URL = 'https://musicband-production.up.railway.app'

function App() {
  const [city, setCity] = useState('');
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBands = async (cityName) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/bands`, { params: { city: cityName } });
      setBands(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async () => {
        const geoResp = await axios.get('https://get.geojs.io/v1/ip/geo.json');
        fetchBands(geoResp.data.city);
      },
      async () => {
        const geoResp = await axios.get('https://get.geojs.io/v1/ip/geo.json');
        fetchBands(geoResp.data.city);
      }
    );
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">🎸 Recently Founded Bands</h1>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => fetchBands(city)}>Search</button>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="row">
          {bands.map((band) => (
            <div className="col-md-4 mb-4" key={band.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{band.name}</h5>
                  <p className="card-text">
                    <strong>Founded:</strong> {band['life-span']?.begin || 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

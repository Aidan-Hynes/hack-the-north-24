import React, { useEffect, useState } from 'react';

const SensorData = () => {
  const [accelX, setAccelX] = useState(null);
  const [accelY, setAccelY] = useState(null);
  const [accelZ, setAccelZ] = useState(null);
  const [accelMag, setAccelMag] = useState(null);
  const [gyroX, setGyroX] = useState(null);
  const [gyroY, setGyroY] = useState(null);
  const [gyroZ, setGyroZ] = useState(null);
  const [gyroMag, setGyroMag] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.37.118.129/');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const textResponse = await response.text();
        console.log('Response:', textResponse);

        /*
        const dataParts = textResponse.split('},{');
        const accelData = JSON.parse(dataParts[0] + '}');
        const gyroData = JSON.parse('{' + dataParts[1]);
        const locData = JSON.parse()

        setAccelX(accelData["Accel-X"]);
        setAccelY(accelData["Accel-Y"]);
        setAccelZ(accelData["Accel-Z"]);

        setGyroX(gyroData["Gyro-X"]);
        setGyroY(gyroData["Gyro-Y"]);
        setGyroZ(gyroData["Gyro-Z"]);
        */
        const accelXMatch = textResponse.match(/"Accel-X"\s*:\s*([0-9.\-]+)/);
        const accelYMatch = textResponse.match(/"Accel-Y"\s*:\s*([0-9.\-]+)/);
        const accelZMatch = textResponse.match(/"Accel-Z"\s*:\s*([0-9.\-]+)/);
    
        const gyroXMatch = textResponse.match(/"Gyro-X"\s*:\s*([0-9.\-]+)/);
        const gyroYMatch = textResponse.match(/"Gyro-Y"\s*:\s*([0-9.\-]+)/);
        const gyroZMatch = textResponse.match(/"Gyro-Z"\s*:\s*([0-9.\-]+)/);
    
        const latMatch = textResponse.match(/"Lat"\s*:\s*([0-9.\-]+)/);
        const lngMatch = textResponse.match(/"Lng"\s*:\s*([0-9.\-]+)/);

        // Update state with parsed values
        setAccelX(accelXMatch ? parseFloat(accelXMatch[1]) : null);
        setAccelY(accelYMatch ? parseFloat(accelYMatch[1]) : null);
        setAccelZ(accelZMatch ? parseFloat(accelZMatch[1]) : null);
        
        setGyroX(gyroXMatch ? parseFloat(gyroXMatch[1]) : null);
        setGyroY(gyroYMatch ? parseFloat(gyroYMatch[1]) : null);
        setGyroZ(gyroZMatch ? parseFloat(gyroZMatch[1]) : null);

        setLat(latMatch ? parseFloat(latMatch[1]) : null);
        setLng(lngMatch ? parseFloat(lngMatch[1]) : null);

        if (Math.abs(accelData["Accel-X"]) > 10 || Math.abs(accelData["Accel-Y"]) > 10 || Math.abs(accelData["Accel-Z"]) > 10 ||
            Math.abs(gyroData["Gyro-X"]) > 10 || Math.abs(gyroData["Gyro-Y"]) > 10 || Math.abs(gyroData["Gyro-Z"]) > 10) {
          setStatus('Fallen');
        } else {
          setStatus('Normal');
        }

        setError(null);
      } catch (error) {
        setError('Failed to fetch data.');
      }
    };

    const intervalId = setInterval(fetchData, 75);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold text-white mb-6">ESP8266 Sensor Data</h1>
      {error && !accelX && !accelY && !accelZ && !gyroX && !gyroY && !gyroZ && (
        <p className="text-red-500 text-lg mb-4">Error: {error}</p>
      )}
      {accelX !== null && accelY !== null && accelZ !== null && gyroX !== null && gyroY !== null && gyroZ !== null ? (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Accelerometer Data:</h2>
            <p className="text-xl text-gray-700">Accel-X: <span className="font-bold">{accelX}</span></p>
            <p className="text-xl text-gray-700">Accel-Y: <span className="font-bold">{accelY}</span></p>
            <p className="text-xl text-gray-700">Accel-Z: <span className="font-bold">{accelZ}</span></p>
            <p className="text-xl text-gray-700">Magnitude: <span className="font-bold">{accelMag}</span></p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Gyroscope Data:</h2>
            <p className="text-xl text-gray-700">Gyro-X: <span className="font-bold">{gyroX}</span></p>
            <p className="text-xl text-gray-700">Gyro-Y: <span className="font-bold">{gyroY}</span></p>
            <p className="text-xl text-gray-700">Gyro-Z: <span className="font-bold">{gyroZ}</span></p>
            <p className="text-xl text-gray-700">Magnitude: <span className="font-bold">{gyroMag}</span></p>
          </div>

          <p className={`text-2xl font-semibold ${status === 'Fallen' ? 'text-red-600' : 'text-green-600'}`}>Status: {status}</p>
        </>
      ) : (
        <p className="text-gray-600 text-lg">Loading data...</p>
      )}
    </div>
  );
};

export default SensorData;

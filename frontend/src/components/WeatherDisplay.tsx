import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../utils/api';

const WeatherDisplay: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData();
      if (data) {
        setWeatherData(data);
        setFilteredData(data);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = weatherData.filter((item) => {
      return item['\uFEFFDate'] ? item['\uFEFFDate'].toLowerCase().includes(term.toLowerCase()) : false;
    });
    setFilteredData(filtered);
  };

  const averageTemp = filteredData.length ? filteredData.reduce((acc, item) => acc + parseFloat(item.Max), 0) / filteredData.length : 0;

  return (
    <div className="bg-gray-100 h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Weather Dashboard</h1>

        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Search by date..." 
            value={searchTerm} 
            onChange={handleSearch}
            className="p-2 border rounded w-full focus:outline-none"
          />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Average Max Temperature: {averageTemp ? averageTemp.toFixed(1) : 'N/A'}°C</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className ='bg-slate-500 text-gray-100'>
                <tr>
                  <th className="border py-2 px-4">Date</th>
                  <th className="border py-2 px-4">Max (°C)</th>
                  <th className="border py-2 px-4">Min (°C)</th>
                  <th className="border py-2 px-4">Humidity</th>
                  <th className="border py-2 px-4">Chance of Rainfall</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td className="border py-2 px-4">{item['\uFEFFDate']}</td>
                    <td className="border py-2 px-4">{item.Max}</td>
                    <td className="border py-2 px-4">{item.Min}</td>
                    <td className="border py-2 px-4">{item.Humdidity}</td>
                    <td className="border py-2 px-4">{item['Chance of rainfall']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;

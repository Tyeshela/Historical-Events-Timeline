import React, { useState, useEffect } from 'react';

const App = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const month = date.split('-')[1];
        const day = date.split('-')[2];
        const response = await fetch(`https://history.muffinlabs.com/date/${month}/${day}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.data.Events);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [date]);

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-no-repeat bg-[url('https://example.com/your-background-image.jpg')] p-8">
      <div className="container mx-auto max-w-4xl bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl">
        <div className="text-center py-8 px-4 md:px-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 mb-6">
            Historical Events Timeline
          </h1>
          <div className="mb-8">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input w-full max-w-xs mx-auto border-2 border-purple-500 rounded-full text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-600 transition p-2"
            />
          </div>
          {loading && <div className="text-xl text-purple-700">Loading...</div>}
          {error && <div className="text-xl text-red-700">{error}</div>}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {events.map((event, index) => (
              <div key={index} className="bg-gradient-to-bl from-indigo-100 to-purple-100 rounded-lg shadow-lg p-6 hover:scale-105 transform transition duration-500 ease-out hover:shadow-2xl">
                <p className="text-lg md:text-xl font-semibold text-gray-800">
                  <span className="font-bold text-gray-900">{event.year}</span>: {event.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

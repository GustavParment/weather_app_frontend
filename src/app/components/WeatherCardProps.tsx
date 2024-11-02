interface WeatherCardProps {
    city: string;
    temperature: string;
    description: string;
  }
  
  export default function WeatherCard({ city, temperature, description }: WeatherCardProps) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-2">{city}</h2>
        <p className="text-gray-600">{temperature}</p>
        <p className="text-gray-500">{description}</p>
      </div>
    );
  }
  
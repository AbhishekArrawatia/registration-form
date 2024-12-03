import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
});

export const getCountries = async () => {
  const response = await api.get('/all');
  return response.data.map((country: any) => ({
    name: country.name.common,
    code: country.cca2,
  }));
};

export const getCities = async (country: string) => {
  // For demo purposes, returning mock cities
  const mockCities = {
    US: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
    UK: ['London', 'Manchester', 'Birmingham', 'Liverpool'],
    CA: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
  };
  
  return mockCities[country as keyof typeof mockCities] || [];
};
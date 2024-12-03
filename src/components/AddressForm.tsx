import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setAddress, nextStep, previousStep } from '../store/formSlice';
import { getCountries } from '../services/api';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  street: Yup.string().required('Street address is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  postalCode: Yup.string().required('Postal code is required'),
});

const AddressForm: React.FC = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: RootState) => state.form.address);
  const [countries, setCountries] = useState<Array<{ name: string; code: string }>>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadCountries = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    loadCountries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(address, { abortEarly: false });
      setErrors({});
      dispatch(nextStep());
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = error.inner.reduce((acc: Record<string, string>, curr) => {
          if (curr.path) {
            acc[curr.path] = curr.message;
          }
          return acc;
        }, {});
        setErrors(validationErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Address Information</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Street Address</label>
        <input
          type="text"
          value={address.street}
          onChange={(e) => dispatch(setAddress({ ...address, street: e.target.value }))}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.street ? 'border-red-500' : ''
          }`}
        />
        {errors.street && (
          <p className="mt-1 text-sm text-red-600">{errors.street}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <select
          value={address.country}
          onChange={(e) => dispatch(setAddress({ ...address, country: e.target.value }))}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.country ? 'border-red-500' : ''
          }`}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-1 text-sm text-red-600">{errors.country}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          value={address.city}
          onChange={(e) => dispatch(setAddress({ ...address, city: e.target.value }))}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.city ? 'border-red-500' : ''
          }`}
          placeholder="Enter your city"
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Postal Code</label>
        <input
          type="text"
          value={address.postalCode}
          onChange={(e) =>
            dispatch(setAddress({ ...address, postalCode: e.target.value }))
          }
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.postalCode ? 'border-red-500' : ''
          }`}
        />
        {errors.postalCode && (
          <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
        )}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => dispatch(previousStep())}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
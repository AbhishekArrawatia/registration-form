import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import PersonalInfoForm from './components/PersonalInfoForm';
import AddressForm from './components/AddressForm';
import CreditCardForm from './components/CreditCardForm';

const FormSteps: React.FC = () => {
  const currentStep = useSelector((state: RootState) => state.form.currentStep);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex items-center ${
                step !== 3 ? 'flex-1' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
              {step !== 3 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    step < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Personal Info</span>
          <span>Address</span>
          <span>Payment</span>
        </div>
      </div>

      {currentStep === 1 && <PersonalInfoForm />}
      {currentStep === 2 && <AddressForm />}
      {currentStep === 3 && <CreditCardForm />}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <FormSteps />
      </div>
    </Provider>
  );
}

export default App;
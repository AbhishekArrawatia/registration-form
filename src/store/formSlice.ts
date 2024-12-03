import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, PersonalInfo, Address, CreditCard } from '../types/form';

const initialState: FormState = {
  currentStep: 1,
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  address: {
    street: '',
    city: '',
    country: '',
    postalCode: '',
  },
  creditCard: {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  },
  errors: {
    personalInfo: {},
    address: {},
    creditCard: {},
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    setAddress: (state, action: PayloadAction<Address>) => {
      state.address = action.payload;
    },
    setCreditCard: (state, action: PayloadAction<CreditCard>) => {
      state.creditCard = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < 3) {
        state.currentStep += 1;
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    setErrors: (state, action: PayloadAction<Partial<FormState['errors']>>) => {
      state.errors = { ...state.errors, ...action.payload };
    },
  },
});

export const {
  setPersonalInfo,
  setAddress,
  setCreditCard,
  nextStep,
  previousStep,
  setErrors,
} = formSlice.actions;
export default formSlice.reducer;
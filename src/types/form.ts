export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface CreditCard {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface FormState {
  currentStep: number;
  personalInfo: PersonalInfo;
  address: Address;
  creditCard: CreditCard;
  errors: {
    personalInfo: Partial<PersonalInfo>;
    address: Partial<Address>;
    creditCard: Partial<CreditCard>;
  };
}
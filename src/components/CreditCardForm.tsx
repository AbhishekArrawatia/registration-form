import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setCreditCard, previousStep } from "../store/formSlice";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Card number must be 16 digits"),
  cardHolder: Yup.string().required("Card holder name is required"),
  expiryDate: Yup.string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

const CreditCardForm: React.FC = () => {
  const dispatch = useDispatch();
  const creditCard = useSelector((state: RootState) => state.form.creditCard);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(creditCard, { abortEarly: false });
      setErrors({});
      console.log("Form submitted successfully", creditCard);
      window.alert("Submission successful");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = error.inner.reduce(
          (acc: Record<string, string>, curr) => {
            if (curr.path) {
              acc[curr.path] = curr.message;
            }
            return acc;
          },
          {}
        );
        setErrors(validationErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Credit Card Information</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          value={creditCard.cardNumber}
          onChange={(e) =>
            dispatch(
              setCreditCard({ ...creditCard, cardNumber: e.target.value })
            )
          }
          placeholder="1234 5678 9012 3456"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.cardNumber ? "border-red-500" : ""
          }`}
        />
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Card Holder Name
        </label>
        <input
          type="text"
          value={creditCard.cardHolder}
          onChange={(e) =>
            dispatch(
              setCreditCard({ ...creditCard, cardHolder: e.target.value })
            )
          }
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            errors.cardHolder ? "border-red-500" : ""
          }`}
        />
        {errors.cardHolder && (
          <p className="mt-1 text-sm text-red-600">{errors.cardHolder}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="text"
            value={creditCard.expiryDate}
            onChange={(e) =>
              dispatch(
                setCreditCard({ ...creditCard, expiryDate: e.target.value })
              )
            }
            placeholder="MM/YY"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.expiryDate ? "border-red-500" : ""
            }`}
          />
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            value={creditCard.cvv}
            onChange={(e) =>
              dispatch(setCreditCard({ ...creditCard, cvv: e.target.value }))
            }
            placeholder="123"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.cvv ? "border-red-500" : ""
            }`}
          />
          {errors.cvv && (
            <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
          )}
        </div>
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
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreditCardForm;

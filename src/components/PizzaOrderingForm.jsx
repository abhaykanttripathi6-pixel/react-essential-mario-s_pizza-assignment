import React, { useEffect, useState } from 'react';
import PizzaSlice from '../assets/PizzaSlice.png';
import Stepper from './Stepper';
import CustomerDetails from './CustomerDetails';
import PizzaCustomization from './PizzaCustomization';
import PlaceOrder from './PlaceOrder';

const PizzaOrderingForm = () => {

    const [step, setStep] = useState(1);

    const [stepper, setStepper] = useState([
        {
            stepNum: 1,
            stepName: 'Customer Details',
        },
        {
            stepNum: 2,
            stepName: 'Pizza Customization',
        },
        {
            stepNum: 3,
            stepName: 'Summary & Place Order',
        }
    ]);

    const [customerDetails, setCustomerDetails] = useState(null);
    const [pizzaCustomizationInfo, setPizzaCustomizationInfo] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    return (
        <div className=' bg-yellow-50 cursor-default'>
            <header className=' bg-yellow-100 grid place-content-center shadow-sm'>
                <div className='p-1 flex flex-col justify-center items-center gap-2 sm:p-3'>
                    <figure className='size-20 object-contain -scale-x-100 sm:size-25'>
                        <img src={PizzaSlice} alt="pizza-slice" />
                    </figure>
                    <h1 className='text-red-600 text-4xl font-bold sm:text-6xl'>Mario's Pizza</h1>
                    <p className='text-gray-800 text-base font-semibold sm:text-lg'>Hot, Cheesy, Fresh, & Unforgettable</p>
                </div>
            </header>

            <main className=' flex flex-col items-center sm:min-h-150 sm:gap-8 sm:p-5'>
                <Stepper stepper={stepper} setStepper={setStepper} stepVal={step} />
                { step === 1 && <CustomerDetails stepper={stepper} setStepper={setStepper} setStep={setStep} setCustomerDetails={ setCustomerDetails} customerDetails={customerDetails} isEdit={isEdit}/> }
                { step === 2 && <PizzaCustomization setStepper={setStepper} setStep={setStep} setPizzaCustomizationInfo={setPizzaCustomizationInfo} isEdit={isEdit} pizzaCustomizationInfo={pizzaCustomizationInfo}/> }
                { step === 3 && <PlaceOrder customerDetails={customerDetails} pizzaCustomizationInfo={pizzaCustomizationInfo} setStep={setStep}  setCustomerDetails={setCustomerDetails}  setPizzaCustomizationInfo={ setPizzaCustomizationInfo} setIsEdit={setIsEdit}/> }
            </main>

        </div>
    )
}

export default PizzaOrderingForm;

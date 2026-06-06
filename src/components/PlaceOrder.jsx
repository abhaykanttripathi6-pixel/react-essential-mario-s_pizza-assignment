import React, { useState } from 'react'
import CustomerDetails from './CustomerDetails';


const PlaceOrder = ({ customerDetails, pizzaCustomizationInfo, setStep, setCustomerDetails, setPizzaCustomizationInfo, setIsEdit }) => {
    const { customerName, phoneNumber, email, deliveryAddress, gender } = customerDetails;

    const { pizzaSize, crustType, toppings, specialInstruction, pizzaPrice, quantity } = pizzaCustomizationInfo;
    console.log('infos', CustomerDetails, pizzaCustomizationInfo);

    const [orderStatus, setOrderStatus] = useState(false);

    const handleOrderAgain = () => {
        setStep(2);
        setIsEdit(false);
        setPizzaCustomizationInfo(null);
    };

    const handleEdit = () => {
        setStep(1);
        setIsEdit(true);
    };

    return (
        <>

            <div className=' w-full p-4 flex flex-col justify-center bg-yellow-300 rounded-md shadow-[1px_1px_5px_3px_rgba(0,0,0,0.18)] sm:w-150 sm:p-5'>
                <h2 className='text-lg font-semibold'>Order Summary</h2>
                <div className='flex justify-between font-normal'>
                    <span>{pizzaSize} ({crustType})</span>
                    <span className='text-red-500'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pizzaPrice)}</span>
                </div>
                <div className='flex justify-between gap-2 font- font-normal'>
                    <span>Toppings: {toppings.join(', ')}</span>
                    <span className='text-red-500'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(toppings.length * 1.5)}</span>
                </div>
                <div className='flex justify-between font- font-normal'>
                    <span>Quantity: </span>
                    <span className='text-red-500'>{quantity}</span>
                </div>
                <div className='my-4 py-2 border-t-2 border-red-500 flex justify-between text-lg font-semibold'>
                    <span>Total</span>
                    <span className='text-red-500'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((Number(toppings.length * 1.5) + Number(pizzaPrice)) * quantity)}</span>
                </div>

                <div className='flex flex-col'>
                    <div>
                        <span className='font-medium'>Customer: </span>
                        <span>{customerName}</span>
                    </div>
                    <div>
                        <span className='font-medium'>Gender: </span>
                        <span> {gender}</span>
                    </div>
                    <div>
                        <span className='font-medium'>Phone: </span>
                        <span>{phoneNumber}</span>
                    </div>
                    <div>
                        <span className='font-medium'>Address: </span>
                        <span>{deliveryAddress}</span>
                    </div>
                   { specialInstruction.trim() &&
                    <div>
                        <span className='font-medium'>Customer's Instruction: </span>
                        <span className='break-all'>{specialInstruction}</span>
                    </div>
                    }
                </div>

                <div>
                    {!orderStatus?
                    <div className='my-4  flex gap-5'>
                    <button className='p-1.5 bg-red-500 text-white font-semibold rounded-md flex-1' onClick={() => setOrderStatus(true)}>Place Order - {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format((Number(toppings.length * 1.5) + Number(pizzaPrice)) * quantity)}</button>

                    <button className=' border-2 border-red-500 bg-amber-200 text-red-500 font-semibold rounded-md flex-1' onClick={handleEdit}>Edit</button>
                    </div>
                    :
                    <div className='py-4 text-center'>
                        <div className='p-2 bg-amber-700 text-amber-400'>
                         <p className='font-bold'>Your order has been placed successfully!!</p>
                         <p className='font-bold'>Enjoy Your Pizza, Thank you !!</p>
                        </div>
                        <button className='w-full my-3 p-1 bg-red-500 text-white font-semibold rounded-md' onClick={handleOrderAgain}>Order Again</button>
                    </div>
                    }
                </div>

            </div>
        </>
    )
}

export default PlaceOrder;

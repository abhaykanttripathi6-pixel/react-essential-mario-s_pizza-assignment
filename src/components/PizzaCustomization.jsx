import React, { useEffect, useState } from 'react';
import PizzaImg from '../assets/PizzaSlice.png'

const PizzaCustomization = ({ setStepper, setStep, setPizzaCustomizationInfo, pizzaCustomizationInfo, isEdit }) => {

  const [pizzaInfo, setPizzaInfo] = useState({
    pizzaSize: isEdit?pizzaCustomizationInfo.pizzaSize:'',
    crustType: isEdit?pizzaCustomizationInfo.crustType:'Regular Crust',
    toppings: isEdit?pizzaCustomizationInfo.toppings:[],
    specialInstruction: isEdit?pizzaCustomizationInfo.specialInstruction:'',
    pizzaPrice: isEdit?pizzaCustomizationInfo.pizzaPrice:'',
    quantity: isEdit?pizzaCustomizationInfo.quantity:1,
  })

  const toppings = ['Pepperoni', 'Sausage', 'Mushrooms', 'Green peppers', 'Onions', 'Black Olives', 'Extra Cheese', 'Bacon', 'Ham', 'Pineapple', 'Jalapenos', 'Tomatoes'];

  const btnStatus = (!pizzaInfo.pizzaSize) || (pizzaInfo.toppings.length === 0) ? true : false;


  const handleInputs = (name, value, checked) => {


    if (Object.keys(pizzaInfo).includes(name)) {
      if (name === 'pizzaSize') {
        setPizzaInfo(prev => ({ ...prev, [name]: value.split('\n')[0], pizzaPrice: value.split('\n$')[1] }))
      } else if (name === 'toppings') {
        if (checked && (pizzaInfo.toppings.length < 4)) {
          setPizzaInfo(prev => ({ ...prev, [name]: [...prev.toppings, value] }))
        } else {
          setPizzaInfo(prev => ({ ...prev, [name]: prev.toppings.filter((toppings) => toppings !== value) }))
        }
      } else {
        setPizzaInfo(prev => ({ ...prev, [name]: value }))
      }
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault(e);
    setPizzaCustomizationInfo(pizzaInfo);
    setStep(3);
  };


  return (
    <div className='w-full p-3 bg-yellow-300 rounded-md shadow-[1px_1px_5px_3px_rgba(0,0,0,0.18)] sm:w-150 sm:p-5'>
      <h2 className='text-center text-lg font-semibold'>Customize Your Pizza</h2>

      <form onSubmit={(e) => handleSubmit(e)} className=' flex flex-col gap-4'>

        <div>
          <label className=' my-1 font-semibold'>Pizza Size</label>

          <div className='grid grid-cols-3 gap-2 text-center cursor-pointer' >

            <div id='pizzaSize' className={`p-2 bg-yellow-50 border-2 flex flex-col justify-center items-center rounded-md active:border-yellow-600 ${pizzaInfo.pizzaSize === 'Small' ? 'border-3 border-red-600' : ''}`} onClick={(e) => handleInputs(e.target.id, e.target.innerText)
            }>
              <div>
                <figure>
                  <img src={PizzaImg} alt='smallSize-pizza' className='size-10' />
                </figure>
              </div>

              <div className='flex flex-col gap-1' >
                <span className='text-base font-semibold '>Small</span>
                <span className='text-lg text-yellow-500'>$9.99</span>
              </div>
            </div>

            <div id='pizzaSize' className={`p-2 bg-yellow-50 border-2 flex flex-col justify-center items-center rounded-md active:border-yellow-600 ${pizzaInfo.pizzaSize === 'Medium' ? 'border-3 border-red-600' : ''}`} onClick={(e) => handleInputs(e.target.id, e.target.innerText)
            }>
              <div>
                <figure>
                  <img src={PizzaImg} alt='mediumSize-pizza' className='size-10' />
                </figure>
              </div>

              <div className='flex flex-col gap-1'>
                <span className='text-base font-semibold'>Medium</span>
                <span className='text-lg text-yellow-500'>$13.99</span>
              </div>
            </div>

            <div id='pizzaSize' className={`p-2 bg-yellow-50 border-2 flex flex-col justify-center items-center rounded-md active:border-yellow-600 ${pizzaInfo.pizzaSize === 'Large' ? 'border-3 border-red-600' : ''}`} onClick={(e) => handleInputs(e.target.id, e.target.innerText)
            }>
              <div>
                <figure>
                  <img src={PizzaImg} alt='largeSize-pizza' className='size-10' />
                </figure>
              </div>

              <div className='flex flex-col gap-1'>
                <span className='text-base font-semibold'>Large</span>
                <span className='text-lg text-yellow-500'>$17.99</span>
              </div>
            </div>

          </div>
        </div>

        <div>
          <label className='font-semibold'>Crust Type</label>
          <div>
            <select className='w-full p-1 bg-yellow-50 border outline-yellow-600 rounded-md' name='crustType' value={pizzaInfo.crustType} onChange={(e) => handleInputs(e.target.name, e.target.value)}>
              <option value="Regular Crust">Regular Crust</option>
              <option value="Thin&Crispy">Thin&Crispy</option>
              <option value="Thik Pan">Thik Pan</option>
              <option value="Cheese Burst">Cheese Burst</option>
              <option value="Hand-Tossed Crust">Hand-Tossed Crust</option>
            </select>
          </div>
        </div>

        <div>
          <label className='font-semibold'>Toppings <span className='text-sm font-medium'>(Each - $1.5, you can add only 4 items)</span></label>
          <div className='grid grid-cols-3 gap-2 cursor-default'>
            {
              toppings.map((topping, index) => {
                return (
                  <div key={index} className='p-1 border flex gap-2 bg-yellow-50 rounded-sm text-sm'>
                    <input type="checkbox" id={index} name='toppings' checked={pizzaInfo.toppings.includes(topping)} onChange={(e) => {
                      if (pizzaInfo.toppings.length < 4) {
                        e.target.checked = true;
                      }else{
                        e.target.checked = false;
                      }
                      return handleInputs(e.target.name, topping, e.target.checked)
                    }
                    } />
                    <label htmlFor={index} >{topping}</label>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="special-instruction" className='font-semibold'>Special Instruction (Optional)</label>
          <textarea id='special-instruction' name='specialInstruction' maxLength={200} placeholder='Any special requests (e.g. extra crispy, light sauce etc.)' rows='3' className='p-1.5 border bg-yellow-50 outline-yellow-600 text-sm resize-none' value={pizzaInfo.specialInstruction} onChange={(e) => handleInputs(e.target.name, e.target.value)} />
          <span className='self-end text-xs'>{pizzaInfo.specialInstruction.length}/200</span>
        </div>

        <div className='flex justify-between items-center'>
          <label className='font-semibold'>Quantity</label>
          <div className='text-base flex gap-3'>
            <button type='button' className=' px-2 bg-amber-500 text-white rounded' onClick={() => (pizzaInfo.quantity < 3) && setPizzaInfo(prev => ({ ...prev, quantity: pizzaInfo.quantity + 1 }))}>+</button>
            <span className='text-lg'>{pizzaInfo.quantity}</span>
            <button type='button' className=' px-2 bg-amber-500 text-white rounded' onClick={() => (pizzaInfo.quantity > 1) && setPizzaInfo(prev => ({ ...prev, quantity: pizzaInfo.quantity - 1 }))}>-</button>
          </div>
        </div>

        <button type='submit' disabled={btnStatus} className={`w-full p-1.5 my-1 bg-orange-600 text-white font-semibold outline-none rounded-md cursor-pointer ${btnStatus ? 'bg-red-400' : ''}`} >{isEdit?'Update':'Done'}</button>
      </form>
    </div >
  )
}

export default PizzaCustomization;


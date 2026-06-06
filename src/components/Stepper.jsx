import React from 'react'

const Stepper = ({stepper, stepVal}) => {
 
    return (
        <div className='px-2 py-4 flex gap-8 sm:gap-12'>
            {
                stepper.map((step, index) => {
                    const {stepNum, stepName} = step;
                    return <div key={stepNum} className='flex items-center gap-1 relative'>
                        <span className={`inline-block size-6 p-0.5 bg-gray-400 text-sm text-white text-center font-semibold rounded-full sm:size-7 sm:p-0 sm:text-lg  ${stepVal >= stepNum?`bg-red-600`:``}`}>{stepNum}</span>
                        <span className='text-xs text-bold font-semibold'>{stepName}</span>
                       { index<2 && <span className='inline-block h-0.5 w-6 bg-gray-600 absolute top-3.4 -right-7 sm:w-10 sm:-right-11'></span>}
                    </div>
                })
            }
        </div>
    )
}

export default Stepper;

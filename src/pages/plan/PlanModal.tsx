import React, { ReactNode } from 'react'

type Props = {
   children: ReactNode,
   isOpen?: boolean
}

export const PlanModal = ({ isOpen = true, children }: Props) => {
   return (
      !isOpen ? null :

         <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
               <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                     <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="text-center sm:mt-0 sm:text-left">
                           <h3 className="text-base font-semibold text-gray-900" id="modal-title">Plan</h3>
                           <div className="mt-2">
                              {children}
                           </div>
                        </div>
                     </div>
                     
                  </div>
               </div>
            </div>
         </div>
   )
}

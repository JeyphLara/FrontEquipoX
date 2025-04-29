
//hook
import { usePlan } from './usePlan';

//components
import { PlanModal } from './PlanModal';

export const PlanPage = () => {

  const { searchStatus, toggleFilter, showFilter, onSubmitUpdateStatus, toggleStatus, isStatusUpdating, loading, handleClickItemEdit, handleModal, search, isOpen, state, handleChange, listPlan, onSubmit, handleSearch, onCancel, clearInputSearch } = usePlan();


  const filterData = listPlan.filter(x => x.description.includes(search) || x.name.includes(search));


  return (
    <div>
      <h1 className='text-3xl font-bold'>Planes</h1>

      <section className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <input
            className="block w-10/12 px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
            name='search'
            onChange={handleSearch}
            placeholder='Plan'
            value={search}
          />
          <button disabled={search.trim() === ""} type="button" onClick={clearInputSearch} className="flex w-full items-center justify-center bg-gray-600 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-xs ring-1 ring-gray-300 ring-inset sm:mt-0 sm:w-auto">
            {
              search.trim() === "" ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg> :
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>

            }

          </button>
        </div>

        <div className='flex gap-2'>
          <div className="relative inline-block text-left">
            <div className="flex justify-center items-center gap-1" onClick={toggleFilter}>

              <button className="rounded-full basis-full bg-white shadow-2xl" id="menu-button" aria-expanded="true" aria-haspopup="true">
                <svg xmlns="http://www.w3.org/2000/svg" className='h-10 w-10' viewBox="0 -960 960 960" fill="#B7B7B7"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" /></svg>
              </button>

              <svg className="size-5 text-myprimary-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
              </svg>

            </div>


            {showFilter ?

              <div className="absolute transition-opacity duration-300 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">

                  <button onClick={() => searchStatus("pendiente")} className=" border-0 block px-4 py-2 text-sm text-gray-700" role="menuitem">Pendiente</button>

                  <button onClick={() => searchStatus("ejecutado")} className=" border-0 block px-4 py-2 text-sm text-gray-700" role="menuitem">Ejecutado</button>

                  <button onClick={() => searchStatus("finalizado")} className=" border-0 block px-4 py-2 text-sm text-gray-700" role="menuitem">Finalizado</button>

                </div>
              </div> : null

            }

          </div>

          <button id="modal" type="button" onClick={handleModal} className="flex w-full items-center justify-center bg-blue-600 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-xs ring-1 ring-gray-300 ring-inset sm:mt-0 sm:w-auto">Crear</button>
        </div>
      </section>

      <section className='grid grid-cols-4 gap-4 pt-4'>

        {filterData.map(item => (
          <div key={item.id} className='rounded bg-white shadow-md min-h-32 hover:shadow-xl'>
            <div className='flex justify-end'>
              <button disabled={loading} onClick={() => handleClickItemEdit(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>
              </button>
            </div>
            <p className='text-xl'>{item.description}</p>
            <button onClick={() => toggleStatus(item.id)} className='underline'>{item.status === '' ? 'Sin estado' : item.status}</button>


          </div>
        ))}

      </section>

      <PlanModal isOpen={isOpen}>
        <>
          <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <input
                className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                name='name'
                onChange={handleChange}
                placeholder='Nombre'
                value={state.name}
              />
            </div>
            <div>
              <input className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                name='version'
                onChange={handleChange}
                placeholder='versión'
                value={state.version}
              />
            </div>
            <div>
              <input
                className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                name='attachment'
                onChange={handleChange}
                placeholder='adjunto'
                value={state.attachment}
              />
            </div>

            <div>
              <input className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                name='note'
                onChange={handleChange}
                placeholder='nota'
                value={state.note}
              />
            </div>

            <div>
              <input className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                name='status'
                onChange={handleChange}
                placeholder='Estado'
                value={state.status}
              />
            </div>

            <div className='md:col-span-2'>
              <textarea
                name='description'
                onChange={handleChange}
                rows={3}
                value={state.description}
                placeholder='descripción' className="block w-full px-3 py-3  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700" />
            </div>
          </section>

          <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
            <button type="button" onClick={onSubmit} className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 sm:ml-3 sm:w-auto">Aceptar</button>
            <button type="button" onClick={onCancel} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
          </div>
        </>
      </PlanModal>


      {
        isStatusUpdating ?
          <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className='flex mb-2'>

                      <input className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700"
                        name='status'
                        onChange={handleChange}
                        placeholder='Estado'
                        value={state.status}
                      />

                      <button type="button" onClick={() => onSubmitUpdateStatus()} className="flex w-full items-center justify-center bg-blue-600 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-xs ring-1 ring-gray-300 ring-inset sm:mt-0 sm:w-auto">Editar</button>

                    </div>

                    <button type="button" onClick={() => toggleStatus("")} className="flex w-full items-center justify-center bg-gray-500 rounded-md text-white px-3 py-2 text-sm font-semibold shadow-xs ring-1 ring-gray-300 ring-inset sm:mt-0 sm:w-auto">Cancelar</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
          : null
      }

    </div >
  )
}

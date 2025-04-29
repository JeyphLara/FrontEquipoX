import { useEffect, useState } from "react"
import { toast } from 'react-toastify';

import { listPlanService, createPlanService, searchStatusPlanService, updateStatusPlanService, getPlanService, updatePlanService } from '../../api/planApi';

//interfaces
import { Plan } from '../../interfaces/plan.interface';

export const usePlan = () => {

   const [listPlan, setListPlan] = useState<Plan[]>([]);
   const [isOpen, setIsOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const [showFilter, setShowFilter] = useState(false);
   const [isStatusUpdating, setIsStatusUpdating] = useState(false);
   const [search, setSearch] = useState('');
   const [state, setState] = useState<Plan>({ 
      id:"",
      name:"",
      description:"",
      version:"",
      attachment: "",
      note: "",
      status: ""
   });



   useEffect(() => {

      getListPlan();

   }, []);


   const getListPlan = async () => {

     const response = await listPlanService();

     if(response.status === 200){

        setListPlan(response.data);
     }
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

      const { name, value } = e.target;

      setState(prev => ({...prev,  [name]:value }));
   }

   const onSubmit = async () => {

      const { id, ...rest } = state;

      if(id===""){
         
         const response = await createPlanService(rest);

         if(response.status === 200){
            getListPlan();
            toast("Plan guardado con éxito"); 
         }

      } else {

         const response = await updatePlanService({ id, ...rest});

         if(response.status === 200){
            getListPlan();
            toast("Plan actualizado con éxito"); 
         }

      }
      
      //cerrar el modal
      handleModal();
      clearState();
   }

   const clearState = () => {
      setState({
         id:"",
         name:"",
         description:"",
         version:"",
         attachment: "",
         note: "",
         status: ""
      });
   }

   const onCancel = () => {
    setIsOpen(prev => !prev);
   }

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
     setSearch(e.target.value);
   }

   const clearInputSearch = () => {
      setSearch("");
   }

   const handleModal = () => {
      setIsOpen(prev => !prev);
   }


   const handleClickItemEdit = async (id:string) => {
      setLoading(true);
      const response = await getPlanService(id);

      if(response.status === 200){
         
         setState(response.data);

         handleModal();

      }
     
      setLoading(false);
   }

   const toggleStatus = (id:string) => {
      setState(prev => ({...prev, id}));
      setIsStatusUpdating(prev => !prev);
   }

   const onSubmitUpdateStatus = async () => {

      const response = await updateStatusPlanService({ id: state.id, status: state.status });

      if(response.status === 200){
         getListPlan();
         toast("Estado del plan actualizado con éxito"); 
         clearState();
         toggleStatus("");
      }

   }

   const toggleFilter = () =>  {
    setShowFilter(prev => !prev);
   }

   const searchStatus = async (status:string) => {

      const response = await searchStatusPlanService(status);
      if(response.status === 200){
         setListPlan(response.data);
      }
      toggleFilter()
   }


   return { searchStatus, toggleFilter, showFilter, onSubmitUpdateStatus, toggleStatus,  isStatusUpdating, loading, handleClickItemEdit, handleModal, search, isOpen, state, handleChange, handleSearch, listPlan, onSubmit, onCancel, clearInputSearch }
}
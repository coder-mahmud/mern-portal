import React, { useState } from 'react'
import Pencil from '../../../assets/pencil-white.svg'
import { useGetTermsQuery } from '../../../slices/termsApiSlice';
import Loader from '../../Loader';
import TermsDetails from './TermsDetails';
import TermsEdit from './TermsEdit';
import { toast } from 'react-toastify';

const Terms = () => {
  // const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  // const [termsContent, setTermsContent] = useState('');
  const editShowHandler = () => {
    setShowEdit(true)
  }

  const {data, isLoading, isError} = useGetTermsQuery();

  if(isLoading){
    return <Loader />
  }
  if(isError){
    return 'Something went wrong!'
  }

  // console.log("Data", data)

  const editCancelHandler = () => {
    setShowEdit(false);
    
  }

  return (
    <div className='pr-6'>
      <div className="flex justify-between items-center mb-9">
        <h1 className="font-medium text-2xl">Terms & Conditions</h1>
        {!showEdit && (
          <button onClick={editShowHandler} className='flex items-center h-11 px-10 bg-primary-blue rounded-[100px] gap-2 font-semibold'>
            <img src={Pencil} alt="" /> Edit
          </button>

        )}
        
      </div>

      {!showEdit && <TermsDetails content={data.terms[0].content} />}

      {showEdit && <TermsEdit editCancelHandler={editCancelHandler} content={data.terms[0].content} /> }
      
    </div>
  )
}

export default Terms
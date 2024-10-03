import React from 'react'

import SolutionListOptions from './SolutionListOptions'
import dayjs from 'dayjs'

const SolutionListItem = ({solution}) => {

  const formatDate = (userDate) => {
    let formattedDate = dayjs(userDate).format("MM/DD/YYYY");
    return formattedDate;
  };


  return (
    <div className="flex items-center py-5">

      <div className=" flex items-center gap-4 grow-[2] basis-0"><img src={solution.image} className='w-8 h-8' alt="" /><p className="">{solution.title}</p></div>
      <div className="grow basis-0">{solution.status}</div>
      <div className="grow basis-0">{formatDate(solution.createdAt)} </div>
      <div className="grow basis-0">{solution.category}</div>
      <SolutionListOptions solution={solution} />
      
    </div> 
  )
}

export default SolutionListItem
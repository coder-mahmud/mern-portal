import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import MsgIcon from '../../assets/msg_icon.svg'
import TimeIcon from '../../assets/time_icon.svg'
import TickIcon from '../../assets/tick_icon.svg'
import Search from '../../assets/search.svg'
import AllIcon from '../../assets/all_icon.svg'

import CheckBox from '../../assets/Checkbox.svg'
import CheckBoxSelected from '../../assets/Checkbox-blue-selected.svg'


import { useGetUsersQuery } from '../../slices/userApiSlice'
import dayjs from 'dayjs'
import { setDate,setSearchTerm,setStatus } from '../../slices/usersListSlice'

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import UserListItem from './UserListItem'


const Admin = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.userInfo)
  const statusFilterTerm = useSelector(state => state.usersFilter.status)
  const searchFilterTerm = useSelector(state => state.usersFilter.searchTerm)
  const startDate = useSelector(state => state.usersFilter.dateRange.startDate)
  const endDate = useSelector(state => state.usersFilter.dateRange.endDate)
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [selectedDate, setSelectedDate] = useState('Select Date');
  const [showCal, setShowCal] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [showStateSelector, setShowStateSelector] = useState(false)
  
  
  const {data, isLoading, isError, error, isSuccess } = useGetUsersQuery()
  useEffect(() => {
    // console.log("user",user)
    if(!user){
      toast.error("Please login to view this page!")
      navigate('/login')
    }else if(user.role ==='user'){
      // console.log(user.role)
      toast.error("You are not allowed to view this page! Only Admin can!")
      navigate('/')
    }



  },[])

  const dispatch = useDispatch();

  
  if(error){
    console.log(error)
    console.log(isError)
  }
  if (isError) return <div>An error has occurred!</div>

  if (isLoading) return <div>Loading</div>
  
  // console.log("data",data)



  const statusFilterHandler = (user) => {
    if(statusFilterTerm == "All"){
      return true;
    }else{
      return user.status ===  statusFilterTerm;
    }    
  }


  const dateFilterHandler = (user) => {
    if(startDate){
      const createDate = dayjs( user.createdAt)
      const createDateFormatted = dayjs( user.createdAt).format('DD/MM/YYYY')
      let startDateFormatted = dayjs( startDate).format('DD/MM/YYYY')
      let endDateFormatted = dayjs( endDate).format('DD/MM/YYYY')

      if(startDateFormatted == endDateFormatted){
        return startDateFormatted == createDateFormatted;
      }

      const oneDayBefore = dayjs(startDate).subtract(1, 'day');
      const oneDayAfter = dayjs(endDate).add(1, 'day');  
      if( dayjs(createDate).isAfter(dayjs(oneDayBefore),'d') && dayjs(createDate).isBefore(dayjs(oneDayAfter),'d') ){
        return true
      }
      return false
    }else{
      return true
    }

  }

  const searchFilterHandler = (user) => {
    return user?.company?.toLowerCase()?.includes(searchFilterTerm);
  }

  const dateChangeHandler = (item) => {
    //console.log("date selection",item.selection )
    setDateState([item.selection])
    let startDate = `${item.selection.startDate}`;
    let endDate = `${item.selection.endDate}`;
    dispatch(setDate({startDate,endDate}))
    let showStartDate = dayjs(item.selection.startDate).format('D MMM')
    let showEndDate = dayjs(item.selection.endDate).format('D MMM')

    if(startDate !== endDate){
      setShowCal(false)
      setSelectedDate(`${showStartDate} - ${showEndDate}`)
    }else{
      setSelectedDate(`${showStartDate}`)
    }
   
  }

  const showCalHandler = () => {
    setShowCal(!showCal)
  }

  const contentClickHandler = (e) => {
    const dateContainer = document.querySelector('.date');
    if (dateContainer.contains(e.target)){
    } else{
      setShowCal(false)
    }

    const searchContainer = document.querySelector('.search')
    if (searchContainer.contains(e.target)){
    } else{
      setShowSearch(false)
    }

    const statusContainer = document.querySelector('.status_selector_trigger')
    if (statusContainer.contains(e.target)){
    } else{
      setShowStateSelector(false)
    }




  }

  const searchFieldShowHandler  = () => {
    setShowSearch(true)
  }

  const searchInputHandler = (e) => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm)
    dispatch(setSearchTerm(searchTerm))
  }

  const showStatusSelectorHandler = () => {
    setShowStateSelector(true)
  }

  const statusSelectHandler = (e) => {
    console.log("Status", e.target.closest('li').getAttribute('data-value'))
    dispatch(setStatus(e.target.closest('li').getAttribute('data-value')))
    setShowStateSelector(false)
  }

  const clearFiltersHandler = () => {
    dispatch(setStatus('All'))
    dispatch(setDate({}))
    dispatch(setSearchTerm(''))
  }

 
  return (
    <>
      <div onClick={contentClickHandler} className="admin_content min-h-[600px]">
      <div className="dashboard_summary flex gap-6 w-full justify-between">
        
        <div className="dashboard_summary_col flex gap-4 items-center px-6 py-8 bg-[#1B1B1F] w-full">
          <img src={MsgIcon} className='w-14' alt="" />
          <div className="flex flex-col">
            <p className="text-[#E7E7E7] text-sm font-semibold">Total Requests</p>
            <p className="font-bold text-xl text-bold color-white">{data.total}</p>
            <p className="text-xs text-[#E7E7E7]">All request including pending, accepted</p>
          </div>
        </div>

        <div className="dashboard_summary_col flex gap-4 items-center px-6 py-8 bg-[#1B1B1F] w-full">
          <img src={TimeIcon} className='w-14' alt="" />
          <div className="flex flex-col">
            <p className="text-[#E7E7E7] text-sm font-semibold">Pending Requests</p>
            <p className="font-bold text-xl text-bold color-white">{data.pending}</p>
            <p className="text-sm text-[#E7E7E7]">Total of {data.total}</p>
          </div>
        </div>

        <div className="dashboard_summary_col flex gap-4 items-center px-6 py-8 bg-[#1B1B1F] w-full">
          <img src={TickIcon} className='w-14' alt="" />
          <div className="flex flex-col">
            <p className="text-[#E7E7E7] text-sm font-semibold">Accepted Requests</p>
            <p className="font-bold text-xl text-bold color-white">{data.accepted}</p>
            <p className="text-sm text-[#E7E7E7]">Total of {data.total}</p>
          </div>
        </div>


      </div>

      <div className="users_list mt-11">
        <div className="user_list_header flex justify-between items-center">
          <p className="font-bold text-2xl">Access Request</p>
          <div className="flex items-center gap-4">
            <div className="search flex gap-2">
              {showSearch && <input type="text" className='bg-black border text-white' value={searchText} onChange={searchInputHandler} />}       
              <img onClick={searchFieldShowHandler} src={Search} alt="" />
            </div>
            
            <div className="date">
              <p onClick={showCalHandler} className="bg-[#1B1B1F] py-2.5 px-3.5 text-[#707070] cursor-pointer rounded-lg">{selectedDate}</p>
              {showCal && (
                <DateRangePicker
                  // onChange={item => setState([item.selection])}
                  onChange={dateChangeHandler}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  ranges={dateState}
                  direction="horizontal"
                  DefinedRange={false}
                  // staticRanges={[]}
                  inputRanges={[]}
                />

              )}
            </div>
            
            <div className="status_selector flex gap-1 items-center">
              <p className="status_selector_trigger flex flex-row gap-1 items-center bg-[#1B1B1F] py-2.5 px-3.5 rounded-lg cursor-pointer text-[#888888]" onClick={() => setShowStateSelector(!showStateSelector)} >All <img src={AllIcon} alt="" /></p> 
              {showStateSelector && (
                <div className="statusSelect w-[230px] bg-[#1B1B1F] px-4 py-5 rounded">
                  <ul>
                    <li onClick={statusSelectHandler} data-value="All" className='flex gap-2 h-11 items-center cursor-pointer'>{statusFilterTerm !=="All" && <img className='h-4' src={CheckBox} alt="" /> } {statusFilterTerm =="All" && <img className='h-4' src={CheckBoxSelected} alt="" /> }  All</li>
                    <li onClick={statusSelectHandler} data-value="Accepted" className='flex gap-2 h-11 items-center cursor-pointer'>{statusFilterTerm !=="Accepted" && <img className='h-4' src={CheckBox} alt="" /> } {statusFilterTerm =="Accepted" && <img className='h-4' src={CheckBoxSelected} alt="" /> } Accepted</li>
                    <li  onClick={statusSelectHandler} data-value="Pending" className='flex gap-2 h-11 items-center cursor-pointer'>{statusFilterTerm !=="Pending" && <img className='h-4' src={CheckBox} alt="" /> } {statusFilterTerm =="Pending" && <img className='h-4' src={CheckBoxSelected} alt="" /> } Pending</li>
                    <li onClick={statusSelectHandler} data-value="Rejected" className='flex gap-2 h-11 items-center cursor-pointer'>{statusFilterTerm !=="Rejected" && <img className='h-4' src={CheckBox} alt="" /> } {statusFilterTerm =="Rejected" && <img className='h-4' src={CheckBoxSelected} alt="" /> } Rejected</li>
                  </ul>
                </div>
              )}

            </div>

            <button onClick={clearFiltersHandler} className='bg-[#1B1B1F] text-[#888888] hover:text-[#ddd] h-11 flex items-center px-3.5'>Clear All</button>
          </div>
        </div>

        <div className="user_list_col_name flex justify-between text-[#B0B0B0] mb-3 mt-4 pr-6">
          <p className="w-full pl-6">Company Name</p>
          <p className="w-full pl-6">Request Date</p>
          <p className="w-full pl-6">Status</p>
          <p className="w-full pl-6 max-w-[97px] flex justify-center">Actions</p>
        </div>

      </div>
      <ul>
        {
          data.users.filter(statusFilterHandler).filter(searchFilterHandler).filter(dateFilterHandler).map(user => <UserListItem key={user._id} user={user} />)
        }
      </ul>


      </div>
    </>

  )
}

export default Admin
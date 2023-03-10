import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { SearchIcon,
         GlobeAltIcon,
         MenuIcon,
         UserCircleIcon,
         UsersIcon

} from '@heroicons/react/solid' 
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';



function Header({placeholder}) {
 
  const router = useRouter()
  const [searchInput,setsearchInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [noOfGuests, setnoOfGuests] = useState(1);
  // console.log(searchInput);


  //In this function we are taking the realtime values of the user input and pushing it to the route search.js using router  
 const search = () => {
   router.push({
     pathname: "/search",
     query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
     }
   });
 }

 const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
 }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection'
  }

  const resetInput = () => {
    setsearchInput("");
  }

  const [show, handleShow] = useState(false);

  const transitionNavBar = () => {
    if(window.scrollY > 100) {
      handleShow(true);
    }else{
      handleShow(false);
    }
  }

  useEffect(() => {
  window.addEventListener("scroll", transitionNavBar);
  return () => window.removeEventListener("scroll", transitionNavBar);
  }, [])
  return (
    <header className={`sticky top-0 z-50 grid grid-cols-3 ${show && "bg-black"} shadow-md py-5 px-5 md:px-10`}>
       
       {/* Left */}
       <div onClick={() => router.push("/")} className='relative flex items-center h-10 cursor-pointer my-auto'> 
        <Image src="https://links.papareact.com/qd3" 
        layout='fill'
        objectFit='contain'
        objectPosition='left'    
        />
       </div>
       {/* Middle- Search*/}
       <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
         <input 
         value={searchInput} //here we established the direct connection with the usestate()
         onChange={(e) => setsearchInput(e.target.value)} //everytime user searches for some value it is going to map that value to the setsearchInput setter and updates everytime screen refreshes with an empty string
         className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400' 
         type="text" 
         placeholder={placeholder || "Start your search"}

         />
         <SearchIcon className='hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2'/>
       </div>
       {/* Right */}
       <div className='flex items-center space-x-4 justify-end text-gray-500'>
         <p className='hidden md:inline cursor-pointer hover:bg-gray-100 rounded-full px-4 py-2'>Become a host</p>
         <GlobeAltIcon className='h-10 cursor-pointer hover:bg-gray-100 rounded-full px-2 py-2'/>
         <div className='flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer md:shadow-sm'>
           <MenuIcon className='h-6' />
           <UserCircleIcon  className='h-6' />
         </div>
       </div>
       {searchInput && (
        <div className='flex flex-col col-span-3 mx-auto'>
          {/* Date Range Picker */}
          <DateRangePicker 
            ranges={[selectionRange]} //this is the initial variable customised(created by me) to set the initial value for the calender
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
            />
            <div className='flex items-center border-b mb-4'> 
              <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
              <UsersIcon className='h-5'/>
              <input 
              value={noOfGuests}
              onChange={(e) => setnoOfGuests(e.target.value)}
              type='number' 
              min={1}
              className='w-12 pl-2 text-lg outline-none text-red-400'/>
            </div>
            <div className='flex items-center'>
              <button onClick={resetInput} className='flex-grow text-gray-500'>Cancel</button>
              <button onClick={search} className='flex-grow text-red-500'>Search</button>
            </div>
        </div>
        
       )}
       
    </header>
  )
}

export default Header
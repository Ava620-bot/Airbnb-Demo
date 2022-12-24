import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';
import Map from '../components/Map';

function Search({searchResults}) {

    const router = useRouter();
    //ES6 Destructuring is a method in which we don't to have write router.query.location, router.query.startDate every time we have to render the field in our code we can just land on to the real value using location, startDate like this
    const { location, startDate, endDate, noOfGuests } = router.query;
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`;


    
    // console.log(router.query);

  return (
    <div>
        {/* Here we are using the router state for showing the result on the searchBar's placeholder field */}
        <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`}/>
         
         <main className='flex'>
           <section className='flex-grow pt-14 px-6'>
               <p className='text-xs'>300+ Stays for - {range} - {noOfGuests} guests</p>
               <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>
               <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                   <p className='button'>Cancellation flexibility</p>  {/* Here we have used the custom tailwind utility class button which we have created manually 'button' */}
                   <p className='button'>Types of Place</p>
                   <p className='button'>Price</p>
                   <p className='button'>Rooms and Beds</p>
                   <p className='button'>More Filters</p>
               </div>
               <div className='flex flex-col'>
               {searchResults.map(item => (
                 <InfoCard
                   key={item.img} 
                   img={item.img}
                   location={item.location}
                   title={item.title}
                   description={item.description}
                   star={item.star}
                   price={item.price}
                   total={item.total}
                 />
               ))}
               </div>
               
           </section>
           <section className='hidden xl:inline-flex xl:min-w-[600px]'> 
             <Map />
           </section>
         </main>
         
        <Footer />
    </div>
  )
  }
export default Search;

{/* Whenever we use await we have to use async function otherwise it will not work and we not get the result from the server */}

export async function getServerSideProps() {
  const searchResults = await fetch('https://links.papareact.com/isz'). 
  then(res => (res.json()));

  return{
    props:{
      searchResults,

    },
  };
}
// import type { NextPage } from 'next'
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Banner from '../components/Banner';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Airbnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <Header />
  
       <Banner />
      <main className='max-w-7xl mx-auto px-8 sm:px-16'> {/* here in this tailwind css we are restricting the main element to not get the max width on the screen instead resctricted it to 7xl */}
        <section className='pt-6'>
          <h1 className='text-4xl font-semibold pb-5'>Explore Nearby</h1>
          {/* Pull some data from the server - API endpoints*/}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {exploreData.map(({img, location, distance}) => (
            <SmallCard
              key={img} 
              img={img}
              location={location}
              distance={distance}
            />
          ))}
        </div>
        </section>
          <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>
          
        <section>
        <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
          {cardsData.map(({img, title}) => (
            <MediumCard 
              key={img}
              img={img}
              title={title}
            />
          ))}
          </div>
        </section>
        <LargeCard 
      
          img='https://links.papareact.com/4cj'
          title="The Greatest Outdoors"
          description="Wishlist curated by Airbnb"
          buttonText="Get Inspired" 
        />
        </main>
         <Footer />
    </div>
  );
}



//All these stuff here is happening on the server next.js server and from here we return the res.json file to our screen
export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').
  then(
    (res) => res.json() 
  );

  const cardsData = await fetch('https://links.papareact.com/zp1').
  then(res => res.json()

  );
  return {
    props: {
      exploreData,
      cardsData
    }
  }
}

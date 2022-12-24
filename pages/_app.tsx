import '../styles/globals.css';
import "tailwindcss/tailwind.css";
import type { AppProps } from 'next/app'
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';

//Here we are first creating the object of progress bar which we'r gonna use in the next.js router
const progress = new ProgressBar({
  size:4,
  color:'#FE595E',
  className:'z-50',
  delay:100,
});

//Whenever the route starts to changed or we navigate to the next page router detects the event and fire the progress bar object
Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

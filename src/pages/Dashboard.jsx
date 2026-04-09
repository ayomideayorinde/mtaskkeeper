import { Header } from '../components/Header'

export function Dashboard({ setIsLoggedIn, isLoggedIn }) {
  return (
    <section className='Dashboard w-full'>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className='w-full flex flex-col p-4 lg:px-36 gap-2 mt-5'>
        <p className='text-3xl lg:text-6xl'>Hello Michael!</p>
        <p className='lg:text-xl'>Welcome to your dashboard!</p>
      </div>
    </section>
  );
}
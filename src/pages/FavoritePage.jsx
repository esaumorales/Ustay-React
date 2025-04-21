import Footer from '@/components/Footer.jsx';
import Header from '@/components/Header.jsx';
import { FavoriteSection } from '@/sections/FavoriteSection';


export default function FavoritePage() {
    return (
        <div className='min-h-screen flex flex-col'>
            <Header/>

            <main className='flex-1'>
                <FavoriteSection/>
            </main>

            <Footer className='mt-auto'/>
        </div>
    )

}

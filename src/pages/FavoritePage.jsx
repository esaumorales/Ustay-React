import Footer from '../components/Footer';
import Header from '../components/Header';
import { FavoriteSection } from '../sections/FavoriteSection';


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

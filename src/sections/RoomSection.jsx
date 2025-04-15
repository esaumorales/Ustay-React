import { Routes, Route } from 'react-router-dom';
import RoomList from '../components/Room/RoomList';
import { RoomDetail } from '../components/room/RoomDetail';

export default function RoomSection() {
  return (
    <section className='min-h-screen my-8'>
      <Routes>
        <Route index element={<RoomList />} />
        <Route path=":id" element={<RoomDetail />} />
      </Routes>
    </section>
  );
}

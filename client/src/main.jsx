import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './views/Home'
import NotFound from './views/NotFound'
import MovieDetails from './views/MovieDetails'
import NewMovie from './views/NewMovie'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/movie/:id" element={<MovieDetails/>} />
        <Route path="/newmovie" element={<NewMovie/>} />
        <Route path="*" element={<NotFound/>} />
    </Routes>
</BrowserRouter>

)

import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { History } from './pages/History'
import { Home } from './pages/Home'

export function Router () {
    return (
        <Routes>
            <Route path='/Ignite-Timer/' element={<DefaultLayout/>}>
                <Route path='/Ignite-Timer/' element={<Home/>}/>
                <Route path='/Ignite-Timer/history' element={<History/>}/>
            </Route>
        </Routes>
    )
}
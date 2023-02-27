import Navbar from './navbar'
import { Outlet } from 'react-router-dom'

export default function Root(props) {
  return (
    <>
    <Navbar />
    <Outlet/>
    </>
  )
}

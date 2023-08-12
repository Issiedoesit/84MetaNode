import React from 'react'
import UndrawSpaceShip from './UndrawSpaceShip'
import {motion} from "framer-motion"
import { NavLink } from 'react-router-dom'
import {BiSolidHome} from "react-icons/bi"

const ErrorPage = () => {
  return (
    <div className={`px-4 md:px-8 overflow-x-hidden min-h-screen overflow-y-hidden pb-20`}>
        <motion.div initial={{opacity:0, x:-100}} animate={{opacity:100, x:0}} transition={{delay:4, duration:1}} className={`py-5 text-brandBlue3x text-lg`}>
            <NavLink to={"/dashboard"} className={`flex flex-row gap-3 items-center hover:gap-2 transition-all duration-300 ease-in-out`}>
                <BiSolidHome color={"#064ACB"} />
                Return Home
            </NavLink>
        </motion.div>
        <div className={`mx-auto pt-16 pb-14 flex items-center justify-center`}>
            <UndrawSpaceShip />
        </div>
        <motion.div initial={{opacity:0, y:100}} animate={{opacity:100, y:0}} transition={{delay:3, duration:1}} className={`text-brandBlue1x text-center`}>
            <h1 className={`text-5xl font-bold`}>
                Uh Oh !
            </h1>
            <p className={`text-brandBlue3x text-lg`}>Page has been taken away!!!</p>
        </motion.div>
    </div>
  )
}

export default ErrorPage
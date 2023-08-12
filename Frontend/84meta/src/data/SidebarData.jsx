import React from 'react'
import {MdDashboard} from "react-icons/md"
import {FaRegImages, FaFileCsv, FaRegFilePdf, FaFileAlt, FaFolderPlus,  FaFileDownload, FaTrash, FaFileAudio, FaFileVideo} from "react-icons/fa"
import {BiSolidFileJson, BiSolidFileTxt} from "react-icons/bi"

const color = "#064ACB"
const size="20px"

const SidebarData = [
    {
        name:"Dashboard",
        icon:<MdDashboard color={color} size={size} className={`aspect-square min-w-[20px]`} />,
        sub:[
            {
                name:"Image Files",
                icon:<FaRegImages color={color} size={size} className={`aspect-square min-w-[20px]`} />,
                type:"image"
            },
            // {
            //     name:"JSON Files",
            //     icon:<BiSolidFileJson color={color} size={size} className={`aspect-square min-w-[20px]`} />,
            //     type:"json"
            // },
            // {
            //     name:"CSV Files",
            //     icon:<FaFileCsv color={color} size={size} className={`aspect-square min-w-[20px]`} />,
            //     type:"csv"
            // },
            // {
            //     name:"PDF Files",
            //     icon:<FaRegFilePdf color={color} size={size} className={`aspect-square min-w-[20px]`} />,
            //     type:"pdf"
            // },
            {
                name:"Document Files",
                icon:<FaFileAlt color={color} size={size} className={`aspect-square min-w-[20px]`} />,
                type:"application"
            },
            {
                name:"Text Files",
                icon:<BiSolidFileTxt color={color} size={size} className={`aspect-square min-w-[20px]`} />,
                type:"text"
            },
            {
                name:"Audio Files",
                icon:<FaFileAudio color={color} size={size} className={`aspect-square min-w-[20px]`} />,
                type:"audio"
            },
            {
                name:"Video Files",
                icon:<FaFileVideo color={color} size={size} className={`aspect-square min-w-[20px]`} />,
                type:"video"
            },
        ]
    },
    {
        name:"Saved Files",
        link:"/dashboard/saved",
        icon:<FaFileDownload color={color} size={size} className={`aspect-square min-w-[20px]`} />,
    },
    {
        name:"Create new folder",
        link:"/dashboard/folder/new",
        icon:<FaFolderPlus color={color} size={size} className={`aspect-square min-w-[20px]`} />,
    },
    {
        name:"Trash",
        link:"/dashboard/trash",
        icon:<FaTrash color={color} size={size} className={`aspect-square min-w-[20px]`} />,
    },
]

export default SidebarData
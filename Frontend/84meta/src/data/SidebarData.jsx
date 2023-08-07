import React from 'react'
import {MdDashboard} from "react-icons/md"
import {FaRegImages, FaFileCsv, FaRegFilePdf, FaFolderPlus, FaFileDownload, FaTrash} from "react-icons/fa"
import {BiSolidFileJson} from "react-icons/bi"

const color = "#064ACB"
const size="20px"

const SidebarData = [
    {
        name:"Dashboard",
        icon:<MdDashboard color={color} size={size} className={`aspect-square min-w-[20px]`} />,
        sub:[
            {
                name:"Images",
                icon:<FaRegImages color={color} size={size} className={`aspect-square min-w-[20px]`} />
            },
            {
                name:"JSON Files",
                icon:<BiSolidFileJson color={color} size={size} className={`aspect-square min-w-[20px]`} />
            },
            {
                name:"CSV Files",
                icon:<FaFileCsv color={color} size={size} className={`aspect-square min-w-[20px]`} />
            },
            {
                name:"PDF Files",
                icon:<FaRegFilePdf color={color} size={size} className={`aspect-square min-w-[20px]`} />
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
import React from 'react'
import { useState } from 'react'
import useComponentVisible from '../../../../utils/hooks/useHideOnClickOutside'
import CsvDownloader from 'react-csv-downloader';
import slugify from "react-slugify"
import useFlat from '../../../../utils/hooks/useFlat';

const DashRow = ({index, id, name, size, folder, date, status, rowData}) => {

    const [showMenu, setShowMenu] = useState(false)

    useComponentVisible(`#showMenu${id}`, `#menu${id}`, ()=>setShowMenu(false))
    const {flat} =  useFlat()

    const columns = [{
        id: 'first',
        displayName: 'First column'
      }, {
        id: 'second',
        displayName: 'Second column'
      }];

    const data = [
      flat(rowData, {})
    ]

    // index == 0 && console.log(data)

  return (
    <tr id={id} className={`odd:bg-white even:bg-brandBlue2x py-4`}>
        <td className={`px-4 py-4 whitespace-nowrap`}>{name}</td>
        <td className={`px-4 py-4 whitespace-nowrap`}>{size}</td>
        <td className={`px-4 py-4 whitespace-nowrap`}>{folder} folder</td>
        <td className={`px-4 py-4 whitespace-nowrap`}>{date}</td>
        <td className={`px-4 py-2 whitespace-nowrap flex items-center justify-center`}>
          {status == 'saved' && <p className={`bg-green-400 rounded-sm text-white capitalize text-sm px-2 w-fit py-1`}>{status}</p>}
          {status == 'not saved' && <p className={`bg-yellow-400 rounded-sm text-white capitalize text-sm px-2 w-fit py-1`}>{status}</p>}
          {status == 'trashed' && <p className={`bg-red-400 rounded-sm text-white capitalize text-sm px-2 w-fit py-1`}>{status}</p>}
        </td>
        <td className={`px-4 py-4 relative whitespace-nowrap text-3xl text-brandBlue1x`}>
            <button onClick={()=>setShowMenu(prevShowMenu => !prevShowMenu)} id={`#showMenu${id}`} type={`button`} className={``}>
                ...
            </button>
            <div id={`#menu${id}`} className={`absolute text-sm z-30 ${showMenu ? "visible opacity-100" : "invisible opacity-0 h-0 overflow-hidden py-2"} transition-all duration-500 ease-in-out shadow-lg flex flex-col gap-4 rounded-10 ${index == 0 ? "top-80%" : "bottom-50%"} right-0 bg-brandGray5x px-4`}>
                <button type='button' onClick={()=>alert(`Share ${id}`)}>Share</button>
                <button type='button'>Copy</button>
                <button type='button'>Export</button>
                <CsvDownloader title={`${slugify(rowData.originalName)}.csv`} text="Download CSV" datas={data} filename={slugify(rowData.originalName)}         
                extension=".csv"
                separator=";"
                wrapColumnChar="'" 
                // columns={columns}
                suffix
                meta
                />
                <button type='button'>Download File</button>
            </div>
        </td>
    </tr>
  )
}

export default DashRow
import React from 'react'

const DashRow = ({id, name, size, folder, date, status}) => {
  return (
    <tr id={id} className={`odd:bg-white even:bg-brandBlue2x py-4`}>
        <td className={`px-4 py-4 whitespace-nowrap`}>{name}</td>
        <td className={`px-4 py-4 whitespace-nowrap`}>{size}</td>
        <td className={`px-4 py-4 whitespace-nowrap`}>{folder}</td>
        <td className={`px-4 py-4 whitespace-nowrap`}>{date}</td>
        <td className={`px-4 py-4 whitespace-nowrap`}>{status}</td>
        <td className={`px-4 py-4 whitespace-nowrap`}>...</td>
    </tr>
  )
}

export default DashRow
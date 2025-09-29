"use client"

import { useState } from "react"


export default function LangSelect() {

  const [menu, setMenu] = useState(false);

  function handleLanSelect() {

  }

  return (
    <div 
      className="relative flex items-center w-20 h-6 bg-white text-sm text-gray-500 rounded-sm p-1 cursor-pointer"
      onClick={() => setMenu(!menu)}
      >
      English
      <div className={menu ? 'flex flex-col absolute top-5 left-0 w-20 h-20 bg-white text-sm text-gray-500 rounded-sm p-1' : 'hidden'}>
        <ul>
          <li className="pt-2 cursor-pointer hover:bg-gray-200 hover:rounded-sm">Catalan</li>
          <li className="pt-2 cursor-pointer hover:bg-gray-200 rounded-sm">Spanish</li>
          <li className="pt-2 cursor-pointer hover:bg-gray-200 rounded-sm">German</li>
        </ul>
        
      </div>
    </div>
  )
}
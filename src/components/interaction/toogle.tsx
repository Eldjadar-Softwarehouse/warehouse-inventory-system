import React, { useState } from 'react'

const Toogle = ({ onChange, value }: any) => {
    const [toggle, setToggle] = useState(value);

    const handleClick = () => {
        setToggle(!toggle);
        onChange(!toggle);
    };
    console.log(toggle)

  return (
    <div className="flex">
        <span className={`absolute ml-1 text-xs pt-1 text-white font-bold appearance-none cursor-pointer ${toggle ? "block" : "hidden"}`}>
            ON
        </span>
        <span className={`absolute ml-1 pt-1 right-12 text-xs text-white font-bold appearance-none cursor-pointer ${toggle ? "hidden" : "block"}`}>
            OFF
        </span>
        <div 
            onClick={handleClick} 
            className={`flex h-6 w-16 cursor-pointer rounded-full p-[1px] ${toggle ? "justify-end bg-sage" : "justify-start bg-black"}`}>
                <div className="h-5 w-5 relative rounded-full transition-all duration-700 bg-white" />
        </div>
    </div>
  )
}

export default Toogle
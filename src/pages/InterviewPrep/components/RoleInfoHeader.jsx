import React from 'react'

function RoleInfoHeader({
    role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) {
  return (
    <div className="bg-white relative">
        <div className="container mx-auto px-10 md:px-0">
            <div className="h-[200px] flex flex-col justify-center relative z-10">
                <div className="flex flex-start">
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-medium ">{role}</h2>
                                <p className="text-sm text-medium text-gray-900 mt-1">{topicsToFocus}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                    <div className="text-[10px] font-medium bg-black text-white px-3 py-1 rounded-full">
                         Experience: {experience} {experience == 1 ? 'Year' : 'Years'}
                    </div>
                    <div className="text-[10px] font-medium bg-black text-white px-3 py-1 rounded-full">
                        {questions} Q&A
                    </div>
                    <div className="text-[10px] font-medium bg-black text-white px-3 py-1 rounded-full">
                        Last Updated: {lastUpdated}
                    </div>
                </div>
            </div>
            <div className="w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-white overflow-hidden absolute top-0 right-0">
                <div className="w-16 h-16 bg-lime-400 animate-blob1 blur-[65px]"></div>
                <div className="w-16 h-16 bg-teal-400 animate-blob2 blur-[65px]"></div>
                <div className="w-16 h-16 bg-cyan-300 animate-blob3 blur-[45px]"></div>
                <div className="w-16 h-16 bg-fuchsia-200 animate-blob1 blur-[45px]"></div>
            </div>
        </div>
    </div>
  )
}

export default RoleInfoHeader
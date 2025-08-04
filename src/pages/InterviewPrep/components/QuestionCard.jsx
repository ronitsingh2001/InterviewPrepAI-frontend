import {
  ChevronDown,
  Pin,
  PinOff,
  Sparkles,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import AIResponsePreview from "./AIResponsePreview";

function QuestionCard({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef();

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group">
      <div className="flex items-start justify-between cursor-pointer">
        <div className="flex items-start gap-3.5">
          <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">
            Q
          </span>
          <h3
            className="text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>
        <div className="flex items-center justify-end ml-4 relative">
          <div
            className={`flex ${
              isExpanded ? "md:flex" : "md:hidden group-hover:flex"
            }`}
          >
            <button
              className="flex items-center gap-2 text-indigo-800 font-medium bg-indigo-50 px-3 py-1 mr-2 rounded text-nowrap border border-indigo-50 hover:border-indigo-200 cursor-pointer"
              onClick={onTogglePin}
            >
              {isPinned ? <PinOff size={15} /> : <Pin size={15} />}
            </button>
            <button
              className="flex items-center gap-2 text-cyan-800 font-medium bg-cyan-50 px-3 py-1 mr-2 rounded text-nowrap border border-cyan-50 hover:border-cyan-200 cursor-pointer"
              onClick={onLearnMore}
            >
              <Sparkles size={15} />
              <span className="hidden md:block text-xs">Learn More</span>
            </button>
          </div>
          <button
            className="text-gray-400 hover:text-gray-500 cursor-pointer"
            onClick={toggleExpand}
          >
            <ChevronDown
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <div
        className="overflow-hidden transition-all ease-in-out duration-300"
        style={{
          maxHeight: `${height}px`,
        }}
      >
        <div className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg" ref={contentRef}>
            <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;

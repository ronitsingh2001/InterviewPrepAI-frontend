import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import moment from "moment";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import QuestionCard from "./components/QuestionCard";
import { CircleAlert, ListCollapse } from "lucide-react";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import toast from "react-hot-toast";

function InterviewPrep() {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreSection, setOpenLearnMoreSection] = useState(false);
  const [explaination, setExplaination] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // fetch session data by sessionId
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data && response.data.session) {
        // toast.success('Question Pinned Successfully')
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // Generate explaination for question
  const generateConceptExplaination = async (question) => {
    try {
      setErrorMsg("");
      setExplaination(null);

      setIsLoading(true);
      setOpenLearnMoreSection(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLAINATION,
        {
          question,
        }
      );

      if (response.data) {
        setExplaination(response.data);
      }
    } catch (error) {
      setExplaination(null);
      setErrorMsg("Failed to generate explaination, Try again later.");
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Pin or Unpin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTIONS.PIN(questionId)
      );

      if (response.data && response.data.question) {
        fetchSessionDetailsById();
        toast.success("Question Pin Status Changed")
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // Add more question to a session
  const addMoreQuestions = async () => {
    setIsUpdateLoader(true);
    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 5,
        }
      );

      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(
        API_PATHS.QUESTIONS.ADD_TO_SESSIONS,
        {
          sessionId,
          questions: generatedQuestions,
        }
      );

      if (response.data) {
        toast.success("Added More Q&A!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong, Please try again.");
      }
      console.error("Error: ", error);
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, []);

  return (
    <DashboardLayout>
      {sessionData && (
        <>
          <RoleInfoHeader
            role={sessionData?.role || ""}
            topicsToFocus={sessionData?.topicsToFocus || ""}
            experience={sessionData?.experience || "-"}
            questions={sessionData?.questions?.length || "-"}
            description={sessionData?.description || ""}
            lastUpdated={
              sessionData?.updatedAt
                ? moment(sessionData.updatedAt).format("Do MMM YYYY")
                : ""
            }
          />
          <div className="container mx-auto py-4 px-4 md:px-0">
            <h2 className="text-lg font-semibold text-black">
              Interview Q & A
            </h2>
            <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
              <div
                className={`col-span-12 ${
                  openLearnMoreSection ? "md:col-span-7" : "md:col-span-8"
                }`}
              >
                <AnimatePresence>
                  {sessionData?.questions?.map((q, idx) => {
                    return (
                      <motion.div
                        key={q._id || idx}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          duration: 0.4,
                          type: "spring",
                          stiffness: 100,
                          delay: idx * 0.1,
                          damping: 15,
                        }}
                        layout
                        layoutId={`question-${q._id || idx}`}
                      >
                        <>
                          <QuestionCard
                            question={q?.question}
                            answer={q?.answer}
                            onLearnMore={() =>
                              generateConceptExplaination(q?.question)
                            }
                            isPinned={q?.isPinned}
                            onTogglePin={() => toggleQuestionPinStatus(q._id)}
                          />
                        </>
                        {!isLoading &&
                          sessionData?.questions?.length == idx + 1 && (
                            <div className="flex items-center justify-center mt-5">
                              <button
                                className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                                disabled={isLoading}
                                onClick={addMoreQuestions}
                              >
                                {isUpdateLoader ? (
                                  <SpinnerLoader />
                                ) : (
                                  <ListCollapse size={15} />
                                )}{" "}
                                Load More
                              </button>
                            </div>
                          )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            <div>
              <Drawer
                isOpen={openLearnMoreSection}
                onClose={() => setOpenLearnMoreSection(false)}
                title={!isLoading && explaination?.title}
              >
                {errorMsg && (
                  <p className="flex gap-2 text-sm text-amber-600 font-medium">
                    <CircleAlert className="mt-1" size={15} /> {errorMsg}
                  </p>
                )}
                {isLoading && <SkeletonLoader />}
                {!isLoading && explaination && (
                  <AIResponsePreview content={explaination?.explanation} />
                )}
              </Drawer>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default InterviewPrep;

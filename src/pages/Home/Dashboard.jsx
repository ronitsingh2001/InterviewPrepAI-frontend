import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { CARD_BG } from "../../utils/data";
import moment from "moment";
import SummaryCard from "../../components/Cards/SummaryCard";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [session, setSession] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSession(response.data);
    } catch (error) {
      console.error("Error fetching session data: ", error);
    }
  };
  const deleteSessions = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session Deleted Successfully!");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data: ", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 mb:px-0">
          {session?.map((s, index) => (
            <SummaryCard
              key={s?._id}
              color={CARD_BG[index % CARD_BG.length]}
              role={s?.role || ""}
              topicsToFocus={s?.topicsToFocus || ""}
              experience={s?.experience || "-"}
              questions={s?.questions?.length || "-"}
              description={s?.description || ""}
              lastUpdated={
                s?.updatedAt ? moment(s.updatedAt).format("Do MMM YYYY") : ""
              }
              onSelect={() => navigate(`/interview-prep/${s?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data: s })}
            />
          ))}
        </div>
        <button
          className="h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold rounded-full text-white px-7 py-2.5 hover:bg-black cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 right-10 md:bottom-20 md:right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <Plus /> Add New
        </button>
      </div>

      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>

      <Modal
        isOpen={openDeleteAlert.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Alert"
      >
        <div className="w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session details?"
            onDelete={() => deleteSessions(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default Dashboard;

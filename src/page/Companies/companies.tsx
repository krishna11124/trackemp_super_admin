import React, { useEffect, useState } from "react";
import WrapperCard from "../../components/Cards/WrapperCard";
import { Box } from "@chakra-ui/react";
import useLoadingStore from "../../zustand/globalLoadingState";
import axios from "axios";
import { Base_Url } from "../../hooks/api";
import useMessageStore from "../../zustand/messageStore";
import CustomHeading from "../../components/Topography/Heading1";
import CompanyTable from "./CompanyList/companyList";
import { Comapny } from "./CompanyList/data";

function CompanyList() {
  const { loading, setLoading } = useLoadingStore();
  const { setError, setMessage } = useMessageStore();
  const [companyData, setCompanyData] = useState<Comapny[]>([]);

  useEffect(() => {
    getCompanyList();
  }, []);

  // Fetch the company list
  const getCompanyList = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    await axios
      .post(
        Base_Url + "companyListing",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        if (res?.data?.data && res?.data?.status) {
          setCompanyData(res?.data?.data);
        }
      })
      .catch((error) => {
        console.error("Company Listing failed:", error);
        setError(error.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle the delete action
  const handleDelete = async (companyId: string) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.post(
        `${Base_Url}companyDelete`,
        { companyId: companyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status) {
        setMessage("Company deleted successfully!");
        setCompanyData((prevData) =>
          prevData.filter((company) => company._id !== companyId)
        );
      } else {
        setError(response?.data?.message || "Failed to delete the company");
      }
    } catch (error: any) {
      console.error("Error deleting company:", error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Handle the update status
  const handleUpdateStatus = async (companyId: string, status: boolean) => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.post(
        `${Base_Url}statusUpdate`,
        { companyId: companyId, status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status) {
        setMessage("Company status updated successfully!");
        setCompanyData((prevData) =>
          prevData.map((item) =>
            item._id === companyId ? { ...item, status: status } : item
          )
        );
      } else {
        setError(response?.data?.message || "Failed to update company status");
      }
    } catch (error: any) {
      console.error("Error updating company status:", error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <WrapperCard>
      <CustomHeading
        fontFamily="Urbanist"
        fontSize={["20px", "24px", "28px"]}
        px={3}
      >
        Company List
      </CustomHeading>
      <Box mt={12}>
        <CompanyTable
          companyData={companyData}
          handleDelete={handleDelete}
          handleUpdateStatus={handleUpdateStatus}
        />
      </Box>
    </WrapperCard>
  );
}

export default CompanyList;

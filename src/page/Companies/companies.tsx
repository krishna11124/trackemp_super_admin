import React, { useEffect, useMemo, useState } from "react";
import { Column } from "react-table";
import ImageAndName from "../../components/imageAndName";
import WrapperCard from "../../components/Cards/WrapperCard";
import { Comapny } from "./CompanyList/data";
import { useNavigate } from "react-router-dom";
import MyTable from "../../components/Table/Table";
import formatDate from "../../hooks/getDate";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import useLoadingStore from "../../zustand/globalLoadingState";
import axios from "axios";
import { Base_Url } from "../../hooks/api";
import useMessageStore from "../../zustand/messageStore";
import CustomHeading from "../../components/Topography/Heading1";
import CompanyTable from "./CompanyList/companyList";

function CompanyList() {
  const { loading, setLoading } = useLoadingStore();
  const { setError, setMessage } = useMessageStore();
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    getCompanyList();
  }, []);

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
          setCompanyList(res?.data?.data);
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
        <CompanyTable companyData={companyList} />
      </Box>
    </WrapperCard>
  );
}

export default CompanyList;

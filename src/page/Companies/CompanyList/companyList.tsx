import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Button,
  IconButton,
  Switch,
} from "@chakra-ui/react";
import CustomText from "../../../components/Topography/Text";
import Colors from "../../../constants/colors";
import formatDate from "../../../hooks/getDate";
import { Comapny, companyColumn } from "./data";
import { FaTrash } from "react-icons/fa";

interface ComapnyTableProps {
  companyData: Comapny[];
  handleDelete: (companyId: string) => void;
  handleUpdateStatus: (companyId: string, status: boolean) => void;
}

const CompanyTable: React.FC<ComapnyTableProps> = ({
  companyData,
  handleDelete,
  handleUpdateStatus,
}) => {
  return (
    <Table variant="striped" colorScheme="primary">
      <Thead>
        <Tr>
          {companyColumn.map((column) => (
            <Th
              key={column.key}
              {...tableHeaderStyle}
              color={Colors.PRIMARY[300]}
              backgroundColor={Colors.PRIMARY[200]}
            >
              {column.label}
            </Th>
          ))}
          <Th
            {...tableHeaderStyle}
            color={Colors.PRIMARY[300]}
            backgroundColor={Colors.PRIMARY[200]}
          >
            Status
          </Th>
          <Th
            {...tableHeaderStyle}
            color={Colors.PRIMARY[300]}
            backgroundColor={Colors.PRIMARY[200]}
          >
            Action
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {companyData &&
          companyData.map((user, index) => (
            <Tr
              key={index}
              _hover={{ bg: "gray.50" }}
              borderTop={"2px solid rgba(242, 242, 242, 1)"}
              borderBottom={"2px solid rgba(242, 242, 242, 1)"}
            >
              {companyColumn.map((column) => (
                <Td key={column.key} {...tableHeaderStyle}>
                  {column.key === "companyName" ? (
                    <HStack spacing={2}>
                      <CustomText>{user[column.key]}</CustomText>
                    </HStack>
                  ) : column.key === "createdAt" ? (
                    formatDate(user[column.key] as string)
                  ) : column.key === "expiryDate" ? (
                    formatDate(user[column.key] as string)
                  ) : column.key === "planDuration" ? (
                    user[column.key] / 30 + " Month"
                  ) : column.key === "status" ? (
                    user[column.key] ? (
                      "Yes"
                    ) : (
                      "No"
                    )
                  ) : (
                    user[column.key]
                  )}
                </Td>
              ))}
              <Td {...tableHeaderStyle}>
                <Switch
                  isChecked={user.status}
                  onChange={() => handleUpdateStatus(user._id, !user.status)}
                  colorScheme="teal"
                />
              </Td>
              <Td {...tableHeaderStyle}>
                <IconButton
                  aria-label="Delete Company"
                  icon={<FaTrash />}
                  colorScheme="red"
                  onClick={() => handleDelete(user._id)}
                  size="sm"
                />
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};

const tableHeaderStyle = {
  fontFamily: "Urbanist",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "17px",
  px: 5,
  py: 3,
};

export default CompanyTable;

export interface Comapny {
  _id: string;
  status: boolean;
  email: string;
  password: string;
  companyName: string;
  planDuration: any;
  price: any;
  allocatedEmp: any;
  planDescription: string;
  expiryDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface columnsSchema {
  label: string;
  key: keyof Comapny;
}

export const companyColumn: columnsSchema[] = [
  {
    label: "Company Name",
    key: "companyName",
  },
  {
    label: "Company Email",
    key: "email",
  },
  {
    label: "Plan Price",
    key: "price",
  },
  {
    label: "Plan Duration",
    key: "planDuration",
  },
  {
    label: "Create AT",
    key: "createdAt",
  },
  {
    label: "Expiry Date",
    key: "expiryDate",
  },
  {
    label: "Employee",
    key: "allocatedEmp",
  },
  {
    label: "Active",
    key: "status",
  },
];

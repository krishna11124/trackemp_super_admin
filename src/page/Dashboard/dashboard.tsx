import React from "react";
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Select,
  Textarea,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  useFormikContext,
} from "formik"; // Import Formik components
import * as Yup from "yup";
import Input from "../../components/input";
import CustomText from "../../components/Topography/Text";
import CustomHeading2 from "../../components/Topography/Heading2";
import CustomHeading from "../../components/Topography/Heading1";
import useMessageStore from "../../zustand/messageStore";
import useAxios, { Base_Url } from "../../hooks/api";
import { error } from "console";
import useLoadingStore from "../../zustand/globalLoadingState";
import axios from "axios";

interface FormValues {
  companyName: string;
  companyEmail: string;
  companyPassword: string;
  planDuration: string;
  planPrice: string;
  employeeAllocated: string;
  planInclude: string;
}

const schema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  companyEmail: Yup.string().required("Company Email is required"),
  companyPassword: Yup.string().required("Company Password is required"),
  planDuration: Yup.string().required("Plan Duration is required"),
  planPrice: Yup.string()
    .matches(/^\d*\.?\d*$/, "Price must be a number")
    .required("Price is required"),
  employeeAllocated: Yup.string().required("Employee Allocated is required"),
  planInclude: Yup.string().required("Plan Include is required"),
});

const CreateCompany = () => {
  const { setError, setMessage } = useMessageStore();
  const { client } = useAxios();
  const { loading, setLoading } = useLoadingStore();

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    setLoading(true);
    const payload = {
      email: values?.companyEmail,
      password: values?.companyPassword,
      companyName: values?.companyName,
      planDuration: values?.planDuration,
      price: Number(values?.planPrice),
      allocatedEmp: Number(values?.employeeAllocated),
      planDescription: values?.planInclude,
    };
    await axios
      .post(Base_Url + "createCompany", payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res?.data?.data && res?.data?.status) {
          setMessage("Company Created successfully");
          resetForm();
        }
      })
      .catch((error) => {
        console.error("Company Create failed:", error);
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box m="auto" bg={"white"} w="full" py={3} rounded={"10px"}>
      <CustomHeading
        fontFamily="Urbanist"
        fontSize={["20px", "24px", "28px"]}
        px={3}
        mt="4"
      >
        Create Company
      </CustomHeading>
      <CustomHeading2 bgColor="rgba(202, 222, 255, 1)" px={4} mt="8" py="2">
        Create Company Plan
      </CustomHeading2>
      <Formik
        initialValues={{
          companyName: "",
          companyEmail: "",
          companyPassword: "",
          planDuration: "",
          planPrice: "",
          employeeAllocated: "",
          planInclude: "",
        }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({
          isSubmitting,
          values,
          setSubmitting,
          resetForm,
          errors,
          isValid,
          validateForm,
          setErrors,
          setTouched,
        }) => (
          <Form>
            <SimpleGrid columns={2} mt="4" p="4" gap={4}>
              <Field name="companyName">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={
                      form.errors.companyName && form.touched.companyName
                    }
                  >
                    <FormLabel
                      htmlFor="companyName"
                      fontSize={["12px", "14px", "16px"]}
                    >
                      Company Name
                    </FormLabel>
                    <Input
                      {...field}
                      id="companyName"
                      placeholder="Enter Company Name"
                    />
                    <FormErrorMessage>
                      {form.errors.companyName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="companyEmail">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={
                      form.errors.companyEmail && form.touched.companyEmail
                    }
                  >
                    <FormLabel
                      htmlFor="companyEmail"
                      fontSize={["12px", "14px", "16px"]}
                    >
                      Company Email
                    </FormLabel>
                    <Input
                      {...field}
                      id="companyEmail"
                      placeholder="Enter Company Email"
                    />
                    <FormErrorMessage>
                      {form.errors.companyEmail}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="companyPassword">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={
                      form.errors.companyPassword &&
                      form.touched.companyPassword
                    }
                  >
                    <FormLabel
                      htmlFor="companyPassword"
                      fontSize={["12px", "14px", "16px"]}
                    >
                      Company Password
                    </FormLabel>
                    <Input
                      {...field}
                      id="companyPassword"
                      placeholder="Enter Company Password"
                    />
                    <FormErrorMessage>
                      {form.errors.companyPassword}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="planDuration">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={
                      form.errors.planDuration && form.touched.planDuration
                    }
                  >
                    <FormLabel
                      htmlFor="planDuration"
                      fontSize={["12px", "14px", "16px"]}
                    >
                      Plan Duration
                    </FormLabel>
                    <Select
                      {...field}
                      id="planDuration"
                      placeholder="Plan Duration"
                      rounded={"full"}
                      color="primary.500"
                      fontSize={"14px"}
                      _placeholder={{ color: "primary.200" }}
                      borderColor={"primary.200"}
                      h={"54px"}
                      size="lg"
                    >
                      <option value={"1"}>1 Month</option>
                      <option value={"2"}>2 Month</option>
                    </Select>

                    <FormErrorMessage>
                      {form.errors.planDuration}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="planPrice">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={form.errors.planPrice && form.touched.planPrice}
                  >
                    <FormLabel
                      htmlFor="planPrice"
                      fontSize={["12px", "14px", "16px"]}
                    >
                      Plan Price
                    </FormLabel>
                    <Input
                      {...field}
                      id="planPrice"
                      placeholder="Enter Plan Price"
                    />
                    <FormErrorMessage>{form.errors.planPrice}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="employeeAllocated">
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={
                      form.errors.employeeAllocated &&
                      form.touched.employeeAllocated
                    }
                  >
                    <FormLabel
                      htmlFor="employeeAllocated"
                      fontSize={["12px", "14px", "16px"]}
                    >
                      Allocated Employees
                    </FormLabel>
                    <Select
                      {...field}
                      id="employeeAllocated"
                      placeholder="Allocated Employees"
                      rounded={"full"}
                      color="primary.500"
                      fontSize={"14px"}
                      _placeholder={{ color: "primary.200" }}
                      borderColor={"primary.200"}
                      h={"54px"}
                      size="lg"
                    >
                      <option value={"5"}>5</option>
                      <option value={"10"}>10</option>
                      <option value={"15"}>15</option>
                    </Select>

                    <FormErrorMessage>
                      {form.errors.employeeAllocated}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </SimpleGrid>

            <CustomHeading2
              bgColor="rgba(202, 222, 255, 1)"
              px={4}
              mt="8"
              py="2"
            >
              Plan Include
            </CustomHeading2>

            <Field name="planInclude">
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  isInvalid={
                    form.errors.planInclude && form.touched.planInclude
                  }
                  mt={4}
                  p={"4"}
                >
                  <FormLabel
                    htmlFor="planInclude"
                    fontSize={["12px", "14px", "16px"]}
                  >
                    Plan Include
                  </FormLabel>
                  <Textarea
                    {...field}
                    id="planInclude"
                    placeholder="Enter Plan Include"
                    rounded={"14px"}
                    color="primary.500"
                    fontSize={"14px"}
                    _placeholder={{ color: "primary.200" }}
                    borderColor={"primary.200"}
                    px={"30px"}
                    py={"20px"}
                    minHeight={"164px"}
                  />
                  <FormErrorMessage>{form.errors.planInclude}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <HStack w="full" justifyContent={"end"} gap="2" px="4">
              <Button
                fontFamily={"Urbanist"}
                colorScheme="red"
                variant={"outline"}
                onClick={() => window.history.back()}
                isLoading={isSubmitting}
                w={"162px"}
              >
                Cancel
              </Button>

              <Button
                w={"162px"}
                fontFamily={"Urbanist"}
                colorScheme="primary"
                type="submit"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateCompany;

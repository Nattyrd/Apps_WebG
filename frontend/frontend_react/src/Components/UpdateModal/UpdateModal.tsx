import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../Context/UserContext";
import { UserContextState } from "../../Types/User";

const Container = styled.div`
  background-color: ${(props: any) => props.theme.body};
  color: ${(props: any) => props.theme.text};
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  width: 600px;
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  height: 40px;
  font-size: 16px;
  padding-left: 10px;
  background-color: ${(props: any) => props.theme.body};
  color: ${(props: any) => props.theme.text};
  border: 1px solid ${(props: any) => props.theme.text};
  border-radius: 5px;
  
  &:disabled {
    background-color: ${(props: any) => props.theme.disabled || "#f0f0f0"};
    opacity: 0.6;
  }
`;

const AccountDetails: React.FC = () => {
  const { currentUser } = useContext(Context) as UserContextState;

  return (
    <Container>
      <Title>Account Details</Title>
      <Form>
        <Label>First Name</Label>
        <Input 
          type="text" 
          disabled 
          value={
            currentUser.firstName[0].toUpperCase() + 
            currentUser.firstName.slice(1).toLowerCase()
          } 
        />

        <Label>Last Name</Label>
        <Input 
          type="text" 
          disabled 
          value={
            currentUser.lastName[0].toUpperCase() + 
            currentUser.lastName.slice(1).toLowerCase()
          } 
        />

        <Label>Email</Label>
        <Input 
          type="email" 
          disabled 
          value={currentUser.email} 
        />
      </Form>
    </Container>
  );
};

export default AccountDetails;
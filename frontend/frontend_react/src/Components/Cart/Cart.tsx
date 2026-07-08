import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { Context } from "../../Context/ProductContext";
import { ProductContextState } from "../../Types/Product";
import { Context as UserContext } from "../../Context/UserContext";
import { UserContextState } from "../../Types/User";
import CartBalanceCard from "../CartBalanceCard/CarBalanceCard";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import EmptyCart from "../EmptyCart/EmptyCart";

const fadeIn = keyframes`
  0% {opacity: 0%;}
  100% {opacity: 100%;}
`;

const Container = styled.div`
  height: 100vh;
  background-color: ${(props: any) => props.theme.body};
  color: ${(props: any) => props.theme.text};
  animation: ${fadeIn} 1s;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 50px;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  text-align: center;
  padding-top: 30px;
`;

const Cart: React.FC = () => {
  const { products } = useContext(Context) as ProductContextState;
  const { currentUser } = useContext(UserContext) as UserContextState;

  return (
    <Container>
      <Title>Shopping Cart</Title>
      {products.length === 0 ? (
        <EmptyCart />
      ) : (
        <Content>
          <CartBalanceCard />
          <CheckoutForm
            userId={currentUser.userId}
            firstName={currentUser.firstName}
            lastName={currentUser.lastName}
            email={currentUser.email}
            phoneNumber={currentUser.phoneNumber}
            address={currentUser.address}
            password={currentUser.password}
          />
        </Content>
      )}
    </Container>
  );
};

export default Cart;

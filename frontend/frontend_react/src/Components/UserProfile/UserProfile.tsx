import React from "react";
import styled from "styled-components";

// --- Interfaces ---
interface ReceiptItem {
  itemId: string;
  name: string;
  price: number;
  amount: number;
}

interface ReceiptCardProps {
  key: string;
  items: ReceiptItem[];
  userId: string;
  receiptNumber: string;
  dateTime: string;
  total: number;
}

// --- Styled Components ---
const Container = styled.div`
  background-color: ${(props: any) => props.theme.body};
  color: ${(props: any) => props.theme.text};
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  width: 600px;
  padding: 20px;
  margin: 10px;
`;

const DateOrder = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed gray;
  padding-bottom: 10px;
`;

const DateText = styled.p`
  font-size: 14px;
  color: gray;
`;

const OrderNo = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

const ItemsContainer = styled.div`
  margin-top: 15px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 15px;
`;

const ItemName = styled.p`
  flex: 2;
`;

const ItemQty = styled.p`
  flex: 1;
  text-align: center;
  color: gray;
`;

const ItemPrice = styled.p`
  flex: 1;
  text-align: right;
  font-weight: 500;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px dashed gray;
  margin-top: 15px;
  padding-top: 10px;
`;

const TotalLabel = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const TotalPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #047d40;
`;

// --- Componente Principal ---
const ReceiptCard: React.FC<ReceiptCardProps> = ({
  items,
  userId,
  receiptNumber,
  dateTime,
  total,
}) => {
  return (
    <Container>
      <DateOrder>
        <DateText>{dateTime}</DateText>
        <OrderNo>Order #{receiptNumber}</OrderNo>
      </DateOrder>

      <ItemsContainer>
        {items.map((item) => (
          <ItemRow key={item.itemId}>
            <ItemName>{item.name}</ItemName>
            <ItemQty>x{item.amount}</ItemQty>
            <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
          </ItemRow>
        ))}
      </ItemsContainer>

      <TotalContainer>
        <TotalLabel>Total</TotalLabel>
        <TotalPrice>${total.toFixed(2)}</TotalPrice>
      </TotalContainer>
    </Container>
  );
};

export default ReceiptCard;
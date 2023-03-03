import styled from "styled-components";
import InventoryHeader from "../components/inventory/InventoryHeader";
import InventoryTable from "../components/inventory/InventoryTable";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  box-shadow: -2px 0px 8px -1px #555555;
  border-radius: 40px 0px 0px 40px;
`;

export default function InventoryPage() {
  return (
    <Container>
      <InventoryHeader />
      <InventoryTable />
    </Container>
  );
}

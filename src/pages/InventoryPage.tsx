import styled from "styled-components";
import InventoryHeader from "../components/inventory/InventoryHeader";
import InventoryTable from "../components/inventory/InventoryTable";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;

export default function InventoryPage() {
  return (
    <Container>
      <InventoryHeader />
      <InventoryTable />
    </Container>
  );
}

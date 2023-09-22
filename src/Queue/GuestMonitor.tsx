import React from "react";
import styled from "styled-components";

export const GuestMonitor = (props: any) => {
    // Utility function to group items by department
    const groupItemsByDepartment = (): { [key: string]: any[] } => {
        const groupedItems: { [key: string]: any[] } = {};
        props.waiting.forEach((item: any) => {
            if (!groupedItems[item.department]) {
                groupedItems[item.department] = [];
            }
            groupedItems[item.department].push(item);
        });
        return groupedItems;
    };

    const groupedItems: { [key: string]: any[] } = groupItemsByDepartment();

    return (
        <Wrapper>
            <h3>Guest monitor for TV on a wall</h3>
            <TablesContainer>
                {Object.entries(groupedItems).map(
                    ([department, items]: [string, any[]]) => (
                        <div key={department}>
                            <h3>{department} Queue</h3>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Your guest ID number</th>
                                    <th>Service</th>
                                    <th>Status</th>
                                    <th>Your workplace</th>
                                </tr>
                                </thead>
                                <tbody>
                                {items.map((item: any) => (
                                    <tr key={item.numberInQ}>
                                        <td>{item.numberInQ}</td>
                                        <td>{item.department}</td>
                                        <td>{item.windowNow ? "Your workplace" : "in the queue"}</td>
                                        <td>{item.windowNow}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    )
                )}
            </TablesContainer>
        </Wrapper>
    );
};

const Wrapper = styled.div`

`;

const TablesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

`;

const Table = styled.table`
  
  border-collapse: collapse;
  text-align: center;
  font-size: 15px; /* Adjust the font size as needed */
  margin: 5px;

  th,
  thead,
  tr,
  tbody,
  td {
    border: 1px solid black;
    padding: 5px; /* Adjust the padding as needed */
  }
`;

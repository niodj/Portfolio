import React, {useState} from "react";
import styled from "styled-components";
import {v1} from "uuid";

export const WorkSpace = (props: any) => {
    const [combinedFilter, setCombinedFilter] = useState("");

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCombinedFilter(e.target.value);
    };

    const departmentOptions = Array.from(new Set(props.queueWindow.map((dept: any) => dept.department.toLowerCase())));
    const windowNameOptions = Array.from(new Set(props.queueWindow.map((item: any) => item.windowName.toLowerCase())));

    const filteredQueueWindow = props.queueWindow.filter((item: { department: any; windowName: any }) => {
        const [selectedDepartment, selectedWindowName] = combinedFilter.split(" ");
        const departmentMatches = !selectedDepartment || item.department.toLowerCase() === selectedDepartment;
        const windowNameMatches = !selectedWindowName || item.windowName.toLowerCase() === selectedWindowName;
        return departmentMatches && windowNameMatches;
    });


    const guestsCount: any = {}
    for (let i = 0; i < props.waiting.length; i++) {
        const element = props.waiting[i].department;
        if (guestsCount[element]) {
            guestsCount[element]++
        } else {
            guestsCount[element] = 1
        }

    }



    return (
        <Wrapper>
            <h3>Workplace for workers</h3>
            <div> Guests in the Queue</div>
            <GuestAmount>
                <thead>

                <tr>
                    <th>Service</th>
                    <th>number of people in the queue</th>
                </tr>
                </thead>
                <tbody>

                {Object.keys(guestsCount).map((item: any) => (


                    <tr key={item}>
                        <td>{item}</td>
                        <td>{guestsCount[item]}</td>
                    </tr>
                ))}
                </tbody>


            </GuestAmount>
            <div>

                <WorkSpaceTable>

                    <thead>

                    <tr>
                        <th>Guest ID number</th>
                        <th>
                            <div>filter</div>
                            <select value={combinedFilter} onChange={handleFilterChange}>
                                <option value="">All</option>
                                {departmentOptions.map((dept: any) =>
                                    windowNameOptions.map((windowName: any) => (
                                        <option key={`${dept} ${windowName}`} value={`${dept} ${windowName}`}>
                                            {`${dept} ${windowName}`}
                                        </option>
                                    ))
                                )}
                            </select>
                        </th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredQueueWindow.map((q: any) => (
                        <tr key={v1()}>
                            <td>{props.waiting.find((item: any) => item.windowNow === q.windowName && item.department === q.department)?.numberInQ}</td>
                            <td>{`${q.department} ${q.windowName}`}</td>
                            <td>
                                <button onClick={() => {
                                    props.takeGuest(q.department, q.windowName)
                                }}>invite guest
                                </button>
                                <button onClick={() => {
                                    props.finishGuest(q.department, q.windowName)
                                }}>Finish guest
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </WorkSpaceTable>

            </div>


        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  th, thead, tr, tbody, td {
    border: 1px solid black;
  }`


const WorkSpaceTable = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  text-align: center;
`


const GuestAmount = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  margin-bottom: 20px;
`

export default WorkSpace;

import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import axios from "axios";
import {Button} from "@mui/material";

type TableType = {
    id: number;
    first_name: string;
    last_name: string;
}

export const SqlConnect = (props: { dark: boolean }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tableData, setTableData] = useState<TableType[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<null | string>(null)
    useEffect(() => {
        axios.get<any>('https://asfalter.com.ua/script.php').then(response => {
            setTableData(response.data);
            setLoading(false)
        })
    }, []);

    const handleSubmit = (event: any) => {
        event.preventDefault()
        if (firstName.trim() && lastName.trim()) {
            event.preventDefault();
            axios.post('https://asfalter.com.ua/script.php', {firstName, lastName}, {
                headers: {'Content-Type': 'application/json'}
            }).then(response => {
                const data = response.data;
                setTableData(data);
                setFirstName('')
                setLastName('')
                setError(null)
            })
        } else {
            setError('Empty string');
        }

    };
    const handleDelete = (id: number) => {

        axios.post('https://asfalter.com.ua/script.php', {action: 'delete', id}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const data = response.data;
                setTableData(data);
            });
    };
    return (
        <Wrapper $dark={props.dark}>
            <Title>This component keeps names on cloud AWS Linux server using Axios requests in SQL database.
                PHP script is also added into the .tsx in comments </Title>

            <TableForm onSubmit={handleSubmit}>
                <div>
                    <FormFieldName>
                        Name:
                    </FormFieldName>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    {firstName && error ? <div></div> : <Error>{error}</Error>}
                </div>
                <div>
                    <FormFieldName>
                        LastName:
                    </FormFieldName>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                    {lastName && error ? <div></div> : <Error>{error}</Error>}
                </div>
                <Button type="submit" value="Add new member" variant={"outlined"}>Add</Button>
            </TableForm>
            {loading ? 'loading' :
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>LastName</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map(row => (
                        <tr key={row.id}>
                            <td>{row.first_name}</td>
                            <td>{row.last_name}</td>
                            <td>
                                <Button onClick={() => handleDelete(row.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </Wrapper>

    );
}


const Wrapper = styled.div<{ $dark: boolean }>`

  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    
    padding:0;

  }
  

  table {
    border-collapse: collapse;
    width: 380px;
    background: ${(props: { $dark: boolean }) => (props.$dark ? "black" : "white")};
    color: ${(props: { $dark: boolean }) => (props.$dark ? "green" : "black")};

  }

  th {

    border: solid ${(props: { $dark: boolean }) => (props.$dark ? "green" : "black")};
  }

  td {
    border: solid ${(props: { $dark: boolean }) => (props.$dark ? "green" : "black")};
    color: ${(props: { $dark: boolean }) => (props.$dark ? "white" : "black")};
  }

`
const TableForm = styled.form`
  margin-bottom: 20px;

`
const Title = styled.h3`
  text-align: center;
  width: 70%;
`
const FormFieldName = styled.label`
  display: block;
`
const Error = styled.div`
  color: red;
`


//  <?php
// $servername = "bora.cityhost.com.ua";
// $username = "ch734841cc_admin";
// $password = "Aa123456";
// $dbname = "ch734841cc_todolist";
//
// // Создаем соединение с базой данных
// $conn = new mysqli($servername, $username, $password, $dbname);
// // Проверяем соединение
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }
//
// // Получаем данные из React-компонента
// $data = json_decode(file_get_contents('php://input'), true);
// $action = $data['action'];
// $id = $data['id'];
// $firstName = $data['firstName'];
// $lastName = $data['lastName'];
//
// if ($action === 'delete') {
//     // Удаляем запись из базы данных
//     $stmt = $conn->prepare("DELETE FROM todolist WHERE id = ?");
//     $stmt->bind_param("i", $id);
//     if ($stmt->execute()) {
//         // Record deleted successfully
//     } else {
//         // Error deleting record
//     }
//     $stmt->close();
// } else {
//     // Записываем данные в базу данных
//     $stmt = $conn->prepare("INSERT INTO todolist (first_name, last_name) VALUES (?, ?)");
//     $stmt->bind_param("ss", $firstName, $lastName);
//     if ($stmt->execute()) {
//         // Record created successfully
//     } else {
//         // Error creating record
//     }
//     $stmt->close();
// }
//
// $sql = "SELECT * FROM todolist";
// $result = $conn->query($sql);
//
// $rows = array();
// while($row = $result->fetch_assoc()) {
//     $rows[] = $row;
// }
// echo json_encode($rows);
//
// $conn->close();
//     ?>
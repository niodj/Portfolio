import React, {useState, useEffect} from 'react';

interface Todo {
    id: number;
    first_name: string;
    last_name: string;
}

const SqlConnect = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tableData, setTableData] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://asfalter.com.ua/script.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'fetch' })
            });
            const data = await response.json();
            setTableData(data);
        }
        fetchData();
    }, []);

    const handleSubmit = async (event: any) => {
        if(firstName && lastName ){
        event.preventDefault();
        const response = await fetch('https://asfalter.com.ua/script.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName, lastName})
        });
        const data = await response.json();
        setTableData(data);
    }else {alert('empty string')}}

    const handleDelete = async (id: number) => {

            const response = await fetch('https://asfalter.com.ua/script.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({action: 'delete', id})
            });
            const data = await response.json();
            setTableData(data);

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                </label>
                <br/>
                <label>
                    NikName:
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                </label>
                <br/>
                <input type="submit" value="Add new member"/>
            </form>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>NikName</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map(row => (
                    <tr key={row.id}>
                        <td>{row.first_name}</td>
                        <td>{row.last_name}</td>
                        <td>
                            <button onClick={() => handleDelete(row.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}

export default SqlConnect;

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
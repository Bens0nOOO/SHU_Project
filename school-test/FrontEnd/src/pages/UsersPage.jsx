import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 從後端獲取資料
    axios.get('http://localhost:5000/api/users')
      .then((response) => {
        console.log('API 回應:', response);  // 查看 API 返回的資料
        setUsers(response.data);  // 將資料存入 state
      })
      .catch((error) => {
        console.error('錯誤:', error);  // 檢查是否有錯誤
      });
  }, []);

  return (
    <div>
      <h2>用戶列表</h2>
      <ul>
        {users.length === 0 ? (
          <p>正在加載用戶資料...</p> 
        ) : (
          users.map((user) => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UsersPage;

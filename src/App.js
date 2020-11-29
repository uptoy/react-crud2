import React, { useState } from "react";
import UserTable from "./tables/UserTable";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";

const App = () => {
  const usersData = [
    { id: 1, name: "AAA", username: "aiueo" },
    { id: 2, name: "BBB", username: "kakikukeko" },
    { id: 3, name: "CCC", username: "sasisuseso" }
  ];

  // usersの状態
  const [users, setUsers] = useState(usersData);

  // 更新関数を持つ追加メソッド
  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  // 更新関数を持つ削除メソッド
  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id));
  };

  // 編集状態か判断するための状態
  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, name: "", username: "" };
  // 編集中の現在のユーザの状態（編集中ユーザーを知るため）
  const [currentUser, setCurrentUser] = useState(initialFormState);

  // 編集モードをONにスイッチして現在のユーザー情報をセットする関数
  const editRow = user => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  // 編集後に更新投稿する関数
  const updateUser = (id, updateUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id ? updateUser : user)));
  };

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Eidt User</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add User</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
        </div>
      </div>
    </div>
  );
};

export default App;

import { Icon } from "../../../../components";
import { TableRow } from "../table-row/table-row";
import styled from "styled-components";
import { useState } from "react";
import { useServerRequest } from "../../../../hooks";

const UserRowContaiber = ({
  className,
  id,
  login,
  registedAt,
  roleId: userRoleId,
  roles,
  onUserRemove,
}) => {
  const [initialRoleId, setInitialRoleId] = useState(userRoleId);
  const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
  const requestServer = useServerRequest();

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  };

  const onRoleSave = (userId, newUserRoleId) => {
    requestServer("updateUserRole", userId, newUserRoleId).then(() => {
      setInitialRoleId(newUserRoleId);
    });
  };

  const isSaveButtonDisables = selectedRoleId === initialRoleId;

  return (
    <div className={className}>
      <TableRow border={true}>
        <div className="login-column">{login}</div>
        <div className="registered-at-column">{registedAt}</div>
        <select value={selectedRoleId} onChange={onRoleChange}>
          {" "}
          {roles.map(({ id: roleId, name: roleName }) => (
            <option key={roleId} value={roleId}>
              {roleName}
            </option>
          ))}
        </select>
        <Icon
          id="fa-floppy-o"
          margin="0 0 0 10px"
          disabled={isSaveButtonDisables}
          onClick={() => onRoleSave(id, selectedRoleId)}
        ></Icon>
      </TableRow>
      <Icon id="fa-trash-o" margin="0 0 0 10px" onClick={onUserRemove}></Icon>
    </div>
  );
};

export const UserRow = styled(UserRowContaiber)`
  display: flex;
  height: 32px;
  margin-top: 10px;
`;

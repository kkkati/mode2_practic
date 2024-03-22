import { Link, useNavigate } from "react-router-dom";
import { Icon, Button } from "../../../../components";
import { ROLE } from "../../../../constans";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserLogin,
  selectUserRole,
  selectUserSession,
} from "../../../../selectors";
import { styled } from "styled-components";
import { logout } from "../../../../actions/";

const RightAligner = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledIcon = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);
  const session = useSelector(selectUserSession);

  return (
    <div className={className}>
      <RightAligner>
        {roleId === ROLE.GUEST ? (
          <Button>
            <Link to="/login">Войти</Link>
          </Button>
        ) : (
          <>
            <UserName>{login}</UserName>
            <StyledIcon>
              <Icon
                id="fa-sign-out"
                margin="0 0 0 10px"
                onClick={() => dispatch(logout(session))}
              />
            </StyledIcon>
          </>
        )}
      </RightAligner>
      <RightAligner>
        <StyledIcon onClick={() => navigate(-1)}>
          <Icon id="fa-backward" margin="10px 0 0 0" />
        </StyledIcon>
        <Link to="/post">
          <Icon id="fa-file-text-o" margin="10px 0 0 16px" />
        </Link>
        <Link to="/users">
          <Icon id="fa-users" margin="10px 0 0 16px" />
        </Link>
      </RightAligner>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;

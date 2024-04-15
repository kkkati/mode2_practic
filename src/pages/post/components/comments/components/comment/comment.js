import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../../../../../components";
import {
  openModal,
  CLOSE_MODAL,
  removeCommentAsync,
} from "../../../../../../actions";
import { styled } from "styled-components";
import { useServerRequest } from "../../../../../../hooks";
import { selectUserRole } from "../../../../../../selectors";
import { ROLE } from "../../../../../../constans";

const CommentContainer = ({
  className,
  postId,
  id,
  author,
  content,
  publishedAt,
}) => {
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const userRole = useSelector(selectUserRole);

  const onCommentRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить комментарий?",
        onConfirm: () => {
          dispatch(removeCommentAsync(requestServer, postId, id));
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
  };

  const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

  return (
    <div className={className}>
      <div className="comment">
        <div className="information-panel">
          <div className="author">
            <Icon
              inactive={true}
              id="fa-user-circle-o"
              size="18px"
              margin="0 10px 0 10px"
            ></Icon>
            {author}
          </div>
          <div className="published-at">
            <Icon
              inactive={true}
              id="fa-calendar-o"
              size="18px"
              margin="0 10px 0 10px"
            ></Icon>
            {publishedAt}
          </div>
        </div>
        <div className="comment-text">{content}</div>
      </div>
      {isAdminOrModerator && (
        <Icon
          id="fa-trash-o"
          size="21px"
          margin="0 0 0 10px"
          onClick={() => onCommentRemove(id)}
        ></Icon>
      )}
    </div>
  );
};

export const Comment = styled(CommentContainer)`
  display: flex;
  margin-top: 10px;

  & .comment {
    width: 550px;
    padding: 5px 10px;
    border: 1px solid #000;
  }

  & .information-panel {
    display: flex;
    justify-content: space-between;
  }

  & .author {
    display: flex;
  }

  & .published-at {
    display: flex;
  }
`;

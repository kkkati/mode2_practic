import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../../../components";
import { Comment } from "./components";
import { useServerRequest } from "../../../../hooks";
import { selectUserId, selectUserRole } from "../../../../selectors";
import { addCommentAsync } from "../../../../actions";
import styled from "styled-components";
import { ROLE } from "../../../../constans";

const CommentsConteiner = ({ className, comments, postId }) => {
  const [newComment, setNewComment] = useState("");
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const userRole = useSelector(selectUserRole);

  const isGuest = userRole === ROLE.GUEST;

  const onNewCommentAdd = (userId, postId, content) => {
    dispatch(addCommentAsync(requestServer, userId, postId, content));
    setNewComment("");
  };

  return (
    <div className={className}>
      {!isGuest && (
        <div className="new-comment">
          <textarea
            name="comment"
            value={newComment}
            placeholder="Комментрий..."
            onChange={({ target }) => {
              setNewComment(target.value);
            }}
          ></textarea>
          <Icon
            id="fa-paper-plane-o"
            size="18px"
            margin="0 0 0 10px"
            onClick={() => onNewCommentAdd(userId, postId, newComment)}
          ></Icon>
        </div>
      )}
      <div className="comments">
        {comments.map(({ id, author, content, publishedAt }) => (
          <Comment
            key={id}
            postId={postId}
            id={id}
            author={author}
            content={content}
            publishedAt={publishedAt}
          />
        ))}
      </div>
    </div>
  );
};

export const Comments = styled(CommentsConteiner)`
  margin: auto;
  width: 580px;

  & .new-comment {
    display: flex;
    width: 100%;
    margin: 20px 0 0;
  }

  & .new-comment textarea {
    width: 550px;
    height: 120px;
    resize: none;
    font-size: 18px;
  }
`;

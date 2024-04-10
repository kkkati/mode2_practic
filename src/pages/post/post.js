import { useEffect, useLayoutEffect } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Comments, PostContent, PostForm } from "./components";
import { useServerRequest } from "../../hooks";
import { loadPostAsync, RESET_POST_DATA } from "../../actions";
import { selectPost } from "../../selectors";
import styled from "styled-components";

const PostContainer = ({ className }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isCreating = useMatch("/post");
  const isEditing = useMatch("/post/:id/edit");
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);

  useLayoutEffect(() => {
    dispatch(RESET_POST_DATA);
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      return;
    }

    dispatch(loadPostAsync(requestServer, params.id));
  }, [dispatch, isCreating]);

  return (
    <div className={className}>
      {isCreating || isEditing ? (
        <PostForm post={post} />
      ) : (
        <>
          <PostContent post={post}></PostContent>
          <Comments comments={post.comments} postId={post.id}></Comments>
        </>
      )}
    </div>
  );
};

export const Post = styled(PostContainer)`
  margin: 40px 0;
  padding: 10px 80px;
`;

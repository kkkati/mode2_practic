import { useEffect } from "react";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Comments, PostContent, PostForm } from "./components";
import { useServerRequest } from "../../hooks";
import { loadPostAsync } from "../../actions";
import { selectPost } from "../../selectors";
import styled from "styled-components";

const PostContainer = ({ className }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isEditing = useMatch("/post/:id/edit");
  const requestServer = useServerRequest();
  const post = useSelector(selectPost);

  useEffect(() => {
    dispatch(loadPostAsync(requestServer, params.id));
  }, []);

  return (
    <div className={className}>
      {isEditing ? (
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

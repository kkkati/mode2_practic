import styled from "styled-components";
import { useRef } from "react";
import { SpecialPanel } from "../special-panel/special-panel";
import { Icon, Input } from "../../../../components";
import { sanitizeContent } from "./utils/sanitize-content";
import { useDispatch } from "react-redux";
import { savePostAsync } from "../../../../actions";
import { useNavigate } from "react-router-dom";
import { useServerRequest } from "../../../../hooks";

const PostFormConteiner = ({
  className,
  post: { id, title, imageUrl, content, publishedAt },
}) => {
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestServer = useServerRequest();

  const onSave = () => {
    const newImageUrl = imageRef.current.value;
    const newTitle = titleRef.current.value;
    const newConten = sanitizeContent(contentRef.current.innerHTML);

    dispatch(
      savePostAsync(requestServer, {
        id,
        imageUrl: newImageUrl,
        title: newTitle,
        content: newConten,
      })
    ).then(() => navigate(`/post/${id}`));
  };

  return (
    <div className={className}>
      <Input
        ref={imageRef}
        defaultValue={imageUrl}
        width="100%"
        playceholder="Изображение..."
      />
      <Input
        ref={titleRef}
        defaultValue={title}
        width="100%"
        playceholder="Заголовок..."
      />
      <SpecialPanel
        publishedAt={publishedAt}
        margin="20px 0"
        editButton={
          <Icon
            id="fa-floppy-o"
            size="21px"
            margin="0 10px 0 0"
            onClick={onSave}
          />
        }
      />
      <div
        ref={contentRef}
        className="post-text"
        contentEditable={true}
        suppressContentEditableWarning={true}
      >
        {content}
      </div>
    </div>
  );
};

export const PostForm = styled(PostFormConteiner)`
  & img {
    float: left;
    margin: 0 20px 10px 0;
  }

  & .post-text {
    font-size: 18px;
    white-space: pre-line;
  }
`;

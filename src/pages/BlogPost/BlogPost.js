import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button";
const POSTS = {
  111: {
    title: "Hello World",
    content:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos corrupti ipsum, ea nihil itaque quidem recusandae perspiciatis assumenda perferendis, cupiditate odio velit dolorem consequuntur!",
  },
  123: {
    title: "Hello World",
    content:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos corrupti ipsum, ea nihil itaque quidem recusandae perspiciatis assumenda perferendis, cupiditate odio velit dolorem consequuntur!",
  },
};
function BlogPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const { postId } = useParams();
  const post = POSTS[postId];
  if (!post) {
    return (
      <div>
        {" "}
        <h1>NO POST</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{JSON.stringify(location)}</p>
      <Button
        onClick={() =>
          navigate("../success", { replace: true, state: { isPerfect: true } })
        }
      >
        OPEN SUCCESS
      </Button>
    </div>
  );
}
export default BlogPost;

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import appwriteconfservices from "../appwriter/conf";
import { Container, Button } from "../components";
import appwritefileservices from "../appwriter/File";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const dbpost = await appwriteconfservices.getPostById(id);
                if (dbpost) {
                    setPost(dbpost);
                } else {
                    navigate("/");
                }
            } catch (err) {
                console.error("Error fetching post:", err);
            }
        };
        fetchPost();
    }, [id, navigate]);

    const deletePost = async () => {
        try {
            const status = await appwriteconfservices.deletePost(post.$id);
            if (status) {
                await appwritefileservices.deleteFile(post.featuredimage);
                navigate("/");
            }
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    if (!post) {
        return <div className="py-8 text-center">Loading...</div>;
    }

    const imageUrl = post.featuredimage ? appwritefileservices.getFilePreview(post.featuredimage) : null;

    return (
        <div className="py-8">
            <Container>
                {imageUrl && (
                    <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="rounded-xl"
                        />
                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">{parse(post.content)}</div>
            </Container>
        </div>
    );
};

export default Post;
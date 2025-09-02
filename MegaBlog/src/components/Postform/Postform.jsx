import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwritefileService from "../../appwriter/File";
import appwriteconfService from "../../appwriter/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            // Fixed: Set default status to a boolean to match Appwrite schema
            status: post?.status ?? true, 
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [previewUrl, setPreviewUrl] = useState("");

    const submit = async (data) => {
        try {
            let fileId = null;

            // Step 1: Handle image upload
            if (data.image && data.image[0]) {
                const uploadedFile = await appwritefileService.uploadFile(data.image[0]);
                if (uploadedFile) {
                    fileId = uploadedFile.$id;
                }
            }

            if (post) {
                // Logic for updating an existing post
                const updatedData = {
                    ...data,
                    // Use new file ID or reuse old one if no new file was uploaded
                    featuredimage: fileId ? fileId : post.featuredimage,
                    // Fixed: Add userID for updates, as it's a required field in Appwrite
                    userID: post.userID, 
                };

                // Delete the old file if a new one was uploaded
                if (fileId && post.featuredimage) {
                    await appwritefileService.deleteFile(post.featuredimage);
                }

                const dbPost = await appwriteconfService.updatePost(post.$id, updatedData);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // Logic for creating a new post
                if (fileId) {
                    const dbPost = await appwriteconfService.createPost({
                        ...data,
                        featuredimage: fileId,
                        userID: userData.$id,
                    });
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                } else {
                    console.error("No featured image selected for new post.");
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    useEffect(() => {
        const fetchPreview = async () => {
            if (post?.featuredimage) {
                const url = await appwritefileService.getFilePreview(post.featuredimage);
                setPreviewUrl(url.href);
            }
        };
        fetchPreview();
    }, [post]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {previewUrl && (
                    <div className="w-full mb-4">
                        <img
                            src={previewUrl}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    // Fixed: Pass boolean values to match Appwrite schema
                    options={[
                        { value: true, label: "Active" },
                        { value: false, label: "Inactive" },
                    ]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
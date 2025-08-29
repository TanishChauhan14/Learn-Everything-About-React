import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwritefileservices from "../../appwriter/File";
import appwriteconfservices from "../../appwriter/conf";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";

export const Postform = ({ post }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwritefileservices.uploadFile(data.image[0])
        : null;

      if (file) {
        appwritefileservices.deleteFile(post.featuredimage);
      }

      const dbpost = await appwriteconfservices.updatePost(post.$id, {
        ...data,
        featuredimage: file ? file.$id : undefined,
      });

      if (dbpost) {
        navigate("/post/${dbpost.$id}");
      }
    } else {
      const file = await appwritefileservices.uploadFile(data.image[0]);

      if (file) {
        const fileid = file.$id;
        data.featuredimage = fileid;

        const dbpost = await appwriteconfservices.createPost({
          ...data,
          userid: userData.$id,
        });

        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }

    const slugTransform = useCallback((value) => {
      if (value && typeof value == "string") {
        return value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");
      }

      return " ";
    }, []);

    useEffect(() => {
      const subscription = watch((value, { name }) => {
        if (name === "title") {
          setValue("slug", slugTransform(value.title), {
            shouldValidate: true,
          });
        }
      });
      return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
  };

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
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwritefileservices.getfilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
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
};

import { client } from "../../utils/contentful";
import Link from "next/link";
import React from "react";

export const getStaticProps = async (_ctx) => {
  const { items } = await client.getEntries({
    content_type: "blogpost",
  });

  const blogs = items.map((item) => ({
    heading: item.fields.heading,
    blogSlug: item.fields.blogSlug,
  }));

  return {
    props: {
      blogs,
    },
  };
};

export default function Blog({ blogs }) {
  return (
    <>
      <h1>Blog Posts</h1>
      {blogs.map((blog) => (
        <React.Fragment key={blog.blogSlug}>
          <Link href={`/blog/${blog.blogSlug}`}>
            <a>{blog.heading}</a>
          </Link>
          <br />
          <br />
          <br />
        </React.Fragment>
      ))}
      <Link href={`/blog/this-doesnt-exist`}>
        <a>This doesn&rsquo;t exist - 404</a>
      </Link>
    </>
  );
}

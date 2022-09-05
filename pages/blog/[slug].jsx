import { client } from "../../utils/contentful";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

export const getStaticPaths = async (ctx) => {
  const { items } = await client.getEntries({ content_type: "blogpost" });

  const paths = items.map((item) => {
    return {
      params: {
        slug: item.fields.blogSlug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const entry = await client.getEntries({
    content_type: "blogpost",
    "fields.blogSlug[match]": slug,
  });

  const {
    items: [
      {
        fields: { heading, content },
      },
    ],
  } = entry;

  console.log(heading, content);

  return {
    props: {
      heading,
      content,
    },
  };
};

export default function BlogPage({ heading, content }) {
  const dtrOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={node.data?.target?.fields?.file?.url}
          alt={node.data?.target?.fields?.title}
        />
      ),
    },
  };

  return (
    <>
      <Link href={`/blog`}>Back 2 Blogz</Link>
      <h1>{heading}</h1>
      <>{documentToReactComponents(content, dtrOptions)}</>
    </>
  );
}

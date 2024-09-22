import BlogDetails from "@/components/blogs/BlogDetails";
import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import { allBlogs } from "@/data/blogs";
import MetaComponent from "@/components/common/MetaComponent";
import { useParams } from "react-router-dom";
const metadata = {
  title: "Blog Single || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function BlogDetailsPage() {
  let params = useParams();
  const id = params.id;
  const blog = allBlogs.filter((elm) => elm.id == id)[0] || allBlogs[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <BlogDetails blog={blog} />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}

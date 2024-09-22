import Blog1 from "@/components/blogs/Blog1";

import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blog 1 || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function BlogPage1() {
  return (
    <>
      <MetaComponent meta={metadata} />

      <Header1 />
      <main className="page-wrapper">
        <Blog1 />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}

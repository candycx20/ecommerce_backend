import Blog3 from "@/components/blogs/Blog3";

import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blog 3 || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function BlogPage3() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <main className="page-wrapper">
        <Blog3 />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}

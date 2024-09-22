import Footer7 from "@/components/footers/Footer7";
import Header8 from "@/components/headers/Header8";
import Hero from "@/components/homes/home-8/Hero";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Home 8 || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function HomePage8() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header8 />
      <main>
        <Hero />
      </main>
      <Footer7 />
    </>
  );
}

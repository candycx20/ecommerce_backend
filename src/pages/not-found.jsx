import MetaComponent from "@/components/common/MetaComponent";
import PageNotFound from "./otherPages/page-not-found";
const metadata = {
  title: "Page Not Found || Uomo eCommerce Reactjs Template",
  description: "Uomo eCommerce Reactjs Template",
};
export default function NotFound() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PageNotFound />
    </>
  );
}

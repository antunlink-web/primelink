import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Seo } from "@/components/Seo";
import { NotFoundContent } from "@/components/NotFoundContent";
import { notFoundSeo } from "@/data/seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Seo metadata={notFoundSeo} />
      <NotFoundContent />
    </>
  );
};

export default NotFound;

import { Routes, Route } from "react-router-dom";
import Users from "./modules/users/containers/Users";
import Products from "./modules/products/containers/Products";
import Industries from "./modules/industries/containers/Industries";
import ProductFamilies from "./modules/productFamilies/containers/ProductFamilies";
import Quote from "./modules/requests/containers/Quote";
import Sample from "./modules/requests/containers/Sample";
import AddEditProductPage from "./modules/products/components/AddEditProductPage";
import PolymerType from "./modules/polymer-type/containers/PolymerType";
import PaymentTerms from "./modules/payment-terms/containers/Paymentterms";
import PackagingType from "./modules/packaging-type/containers/PackagingType";
import PhysicalForm from "./modules/physical-form/containers/PhysicalForm";
import ChemicalFamily from "./modules/chemical-family/containers/ChemicalFamily";
import Incoterm from "./modules/incoterms/containers/Incoterm";
import Grade from "./modules/grade/containers/Grade";
import Sellers from "./modules/users/containers/Sellers";
import Finance from "./modules/requests/containers/Finance";
import Experts from "./modules/users/containers/Experts";
import PrivacyPolicy from "./modules/cms/PrivacyPolicy";
import TermsCondition from "./modules/cms/Terms&Condition";
import SocialMedia from "./modules/cms/SocialMedia";
import BenefitsForSuplier from "./modules/cms/BenefitsForSuplier";
import BenefitsForBuyer from "./modules/cms/BenefitsForBuyer";


const AppRoutes = () => {
  return (
    <div className="p-5">
      <Routes>
        <Route path="/products" exact element={<Products />} />
        <Route path="/add-product" exact element={<AddEditProductPage />} />
        <Route path="/edit-product/:id" exact element={<AddEditProductPage />} />
        <Route path="/" exact element={<Products />} />
        <Route path="/industries" exact element={<Industries />} />
        <Route path="/product-families" exact element={<ProductFamilies />} />


        <Route path="/enquiries/sample" exact element={<Sample />} />
        <Route path="/enquiries/quote" exact element={<Quote />} />
        <Route path="/enquiries/finance" exact element={<Finance />} />

        <Route path="/cms/termsAndConditions" exact element={<TermsCondition />} />
        <Route path="/cms/privacyPolicy" exact element={<PrivacyPolicy />} />
        <Route path="/cms/socialMedia" exact element={<SocialMedia />} />
        <Route path="/cms/BenefitsForSuplier" exact element={<BenefitsForSuplier />} />
        <Route path="/cms/BenefitsForBuyer" exact element={<BenefitsForBuyer />} />


        {/* <Route path="/cms/faq" exact element={< />} /> */}



        <Route path="/polymer-type" exact element={<PolymerType />} />
        <Route path="/payment-terms" exact element={<PaymentTerms />} />
        <Route path="/packaging-type" exact element={<PackagingType />} />
        <Route path="/physical-form" exact element={<PhysicalForm />} />
        <Route path="/grade" exact element={<Grade />} />
        <Route path="/incoterm" exact element={<Incoterm />} />
        <Route path="/chemical-family" exact element={<ChemicalFamily />} />

        <Route path={"/sellers-list"} element={<Sellers />} />
        <Route path={"/buyers-list"} element={<Users />} />
        <Route path={"/experts-list"} element={<Experts />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default AppRoutes;

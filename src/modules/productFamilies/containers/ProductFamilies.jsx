import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoader,
  setPageTitle,
  setProductFamilies,
} from "../../../slices/sharedSlice";
import { getProductFamiliesApi } from "../api";
import Title from "../../../shared/Title";
import ActionButton from "../../../shared/ActionButton";
import ProductFamilyList from "../components/ProductFamilyList";
import PageLoader from "../../../shared/PageLoader";

const ProductFamilies = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.sharedState);

  const fetchProducts = useCallback(() => {
    getProductFamiliesApi().then((response) => {
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setProductFamilies(response.data));
      }
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(setPageTitle("Product Families"));
    fetchProducts();
  }, [dispatch, fetchProducts]);

  return (
    <div>
      <Title
        title="Product Families"
        description="Displaying all the Product Families"
        actions={
          <div className="flex items-center justify-between ">
            <ActionButton
              buttonText="Add Product Family"
              handleOnClick={() => {}}
              textColor="#ffffff"
              bgColor="rgb(41, 82, 255)"
              icon={"/tools/create.svg"}
            />
          </div>
        }
      ></Title>
      {loader ? (
        <PageLoader />
      ) : (
        <div className="mt-4">
          <ProductFamilyList />
        </div>
      )}
    </div>
  );
};

export default ProductFamilies;

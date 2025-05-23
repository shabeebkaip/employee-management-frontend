import { setLoader, setProductFamilies } from "../../slices/sharedSlice";
import {
  globalDeleteService,
  globalGetService,
  globalPostService,
  globalPutService,
} from "../../utils/globalApiServices";

export const getProductFamiliesApi = (query = {}) => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    
    if (!query.page) {
      query.page = 1;
    }

    let response = await globalGetService("/product-family/list", query);

    if (response.data.success) {
      dispatch(setProductFamilies(response.data.data));
      return response.data;
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setLoader(false));
  }
};

export const createProductFamilyApi = async (data) => {
  try {
    let response = await globalPostService("/product-family/create", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProductFamilyApi = async (data) => {
  try {
    let response = await globalPutService(
      `/product-family/edit/${data._id}`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductFamilyApi = async (id) => {
  try {
    let response = await globalDeleteService(`/product-family/delete/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

import ProductDetails from "../pages/ProductDetails";
import "@testing-library/jest-dom";
import {
  getOneProductApi,
  getConfigurationApi,
  getDescriptionApi,
} from "../api/ProductApi";
describe(ProductDetails, () => {
  test("Xem danh sách chi tiết thông tin sản phẩm", async () => {
    const idProduct = "636fc8ba5bf3c32b1f551f77";
    let result;
    await getOneProductApi(idProduct)
      .then(() => {
        result = true;
      })
      .catch(() => {
        result = false;
      });
    expect(result).toEqual(true);
  });
});

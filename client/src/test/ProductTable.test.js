import ProductTable from "../components/Table/ProductTable";
import "@testing-library/jest-dom";
import { deleteProductApi, getProductsApi } from "../api/ProductApi";
describe(ProductTable, () => {
  test("Xóa sản phẩm có truyền id", async () => {
    const idProduct = "637004e5fe12eebf7cd43ea0";
    let result;
    await deleteProductApi(idProduct)
      .then(() => {
        result = true;
      })
      .catch(() => {
        result = false;
      });
    expect(result).toEqual(true);
  });
  test("Xóa sản phẩm không truyền id", async () => {
    const idProduct = "";
    let result;
    await deleteProductApi(idProduct)
      .then(() => {
        result = true;
      })
      .catch(() => {
        result = false;
      });
    expect(result).toEqual(false);
  });
  test("Xem danh sách sản phẩm", async () => {
    let result;
    let lenProduct;
    await getProductsApi()
      .then((res) => {
        lenProduct = res.data.products.length;
        result = true;
      })
      .catch(() => {
        result = false;
      });
    expect(result).toEqual(true);
    expect(lenProduct).toBeGreaterThan(0);
    expect(lenProduct).toBeLessThan(11);
  });
});

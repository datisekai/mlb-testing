import Search from "../pages/Search";
import "@testing-library/jest-dom";
import { searchProductApi } from "../api/ProductApi";
describe(Search, () => {
  test("Tìm kiếm nhập ký tự bất kì", async () => {
    const query = "samsung";
    const res = await searchProductApi(query);
    const data = res.data.results;
    const resdDataSuccess = res.data.success;
    expect(resdDataSuccess).toEqual(true);
  });
  test("Tìm kiếm không nhập ký tự nào", async () => {
    const query = "";
    let result;
    await searchProductApi(query)
      .then(() => {
        result = true;
      })
      .catch(() => {
        result = false;
      });
    expect(result).toEqual(false);
  });
});

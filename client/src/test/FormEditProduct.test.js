import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { addProduct, updateProductApi } from "../api/ProductApi";
import FormEditProduct from "../components/Forms/FormEditProduct";
import { store } from "../redux/store";

import mockAxios from "jest-mock-axios";

describe("FormEditProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    mockAxios.reset();
  });

  test("Hiển thị form", () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="*" element={<FormEditProduct />} />
          </Routes>
        </Router>
      </Provider>
    );

    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
  });

  test("Cập nhật giá trị input khi thay đổi", () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="*" element={<FormEditProduct />} />
          </Routes>
        </Router>
      </Provider>
    );
    const inputElement = screen.getByPlaceholderText("Name...");
    const inputValue = "New Product Name";
    fireEvent.change(inputElement, { target: { value: inputValue } });
    expect(inputElement.value).toBe(inputValue);
  });

  test("Nhập color,memory với giâ trị rỗng", async () => {
    const id = "64520d7435bb7b7050c8ac07";
    const data = {
      colors: ["", ""],
      memorys: ["", ""],
    };

    const expected = false;

    const result = await updateProductApi(id, data);
    expect(result.data.success).toEqual(expected);
  });

  test("Nhập đúng thông tin", async () => {
    const id = "64520d7435bb7b7050c8ac07";
    const data = {
      name: "Test 1111",
    };

    const expected = true;

    const result = await updateProductApi(id, data);
    expect(result.data.success).toEqual(expected);
  });
});

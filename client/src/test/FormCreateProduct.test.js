import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { addProduct } from "../api/ProductApi";
import FormCreateProduct from "../components/Forms/FormCreateProduct";
import { store } from "../redux/store";

import mockAxios from "jest-mock-axios";

describe("FormCreateProduct", () => {
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
            <Route path="*" element={<FormCreateProduct />} />
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
            <Route path="*" element={<FormCreateProduct />} />
          </Routes>
        </Router>
      </Provider>
    );
    const inputElement = screen.getByPlaceholderText("Name...");
    const inputValue = "New Product Name";
    fireEvent.change(inputElement, { target: { value: inputValue } });
    expect(inputElement.value).toBe(inputValue);
  });

  test("Bỏ trống trường bắt buộc memory, color", () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="*" element={<FormCreateProduct />} />
          </Routes>
        </Router>
      </Provider>
    );
    global.alert = jest.fn();

    const inputName = screen.getByPlaceholderText("Name...");
    const inputOldPrice = screen.getByPlaceholderText("Old Price...");
    const inputNewPrice = screen.getByPlaceholderText("New Price...");
    const inputSubmit = screen.getByPlaceholderText("Add Product");

    fireEvent.change(inputName, { target: { value: "new product" } });
    fireEvent.change(inputOldPrice, { target: { value: "120000" } });
    fireEvent.change(inputNewPrice, { target: { value: "110000" } });

    fireEvent.click(inputSubmit);

    const spy = jest.spyOn(window, "alert").mockImplementation(() => {});
    expect(spy).toHaveBeenCalledWith(
      "Them mau sac va phien ban cua san pham !"
    );
    spy.mockRestore();
  });

  test("Nhập color với giâ trị rỗng", async () => {
    const data = {
      category: "Phone",
      contentHtml: "<p>1234</p>\n",
      contentMarkdown: "1234",
      display: "122",
      image: [
        "http://res.cloudinary.com/annnn/image/upload/v1680615829/kvdjxoasvo1r6kwyi9zr.jpg",
      ],
      colors: ["", ""],
      memorys: ["2"],
      mobileNetwork: "123",
      name: "Khám phá ý nghĩa ngón tay đeo nhẫn nam",
      newPrice: 780000,
      oldPrice: 1090000,
      operatingSystem: "1222",
      pin: "11222",
      ram: "123",
      resolution: "12",
      thumnail:
        "http://res.cloudinary.com/annnn/image/upload/v1680615830/iryvhrmsxqfpiz6sqgq3.jpg",
      vat: "",
    };

    const result = await addProduct(data);
    expect(result.data.success).toEqual(false);
  });

  test("Nhập đúng thông tin", async () => {
    const data = {
      category: "Phone",
      contentHtml: "<p>1234</p>\n",
      contentMarkdown: "1234",
      display: "122",
      image: [
        "http://res.cloudinary.com/annnn/image/upload/v1680615829/kvdjxoasvo1r6kwyi9zr.jpg",
      ],
      colors: ["Đỏ", "Vàng"],
      memorys: ["2"],
      mobileNetwork: "123",
      name: "Khám phá ý nghĩa ngón tay đeo nhẫn nam",
      newPrice: 780000,
      oldPrice: 1090000,
      operatingSystem: "1222",
      pin: "11222",
      ram: "123",
      resolution: "12",
      thumnail:
        "http://res.cloudinary.com/annnn/image/upload/v1680615830/iryvhrmsxqfpiz6sqgq3.jpg",
      vat: "",
    };

    const expect = true;

    const result = await addProduct(data);
    expect(result.data.success).toEqual(expect);
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import FormCreateProduct from "../components/Forms/FormCreateProduct";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import { store } from "../redux/store";
import { toast } from 'react-toastify';



beforeEach(() => {
  jest.clearAllMocks();
 
});

describe("FormCreateProduct", () => {
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

  test("Nhập color với giá trị rỗng", () => {
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

    jest.mock("react-toastify", () => ({
      toast: {
        success: jest.fn(),
        error: jest.fn(),
      },
    }));

    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });

    const inputName = screen.getByPlaceholderText("Name...");
    const inputOldPrice = screen.getByPlaceholderText("Old Price...");
    const inputNewPrice = screen.getByPlaceholderText("New Price...");
    const inputThumbnail = screen.getByPlaceholderText("Thumnail...");
    const inputImages = screen.getByPlaceholderText("Images...");
    const inputColor = screen.getByPlaceholderText("Colors...")
    const inputMemory = screen.getByPlaceholderText("Memorys...")
    const btnAddColor = screen.getByTestId('btn-add-color')
    const btnAddMemory = screen.getByTestId('btn-add-memory')
    const inputSubmit = screen.getByPlaceholderText("Add Product");

    fireEvent.change(inputColor, { target: { value: "" } });
    fireEvent.change(inputMemory, { target: { value: "8GB" } });
    fireEvent.click(btnAddColor)
    fireEvent.click(btnAddMemory)

    fireEvent.change(inputName, { target: { value: "new product" } });
    fireEvent.change(inputOldPrice, { target: { value: "110000" } });
    fireEvent.change(inputNewPrice, { target: { value: "110000" } });

    fireEvent.change(inputThumbnail, { target: { files: [file] } });
    fireEvent.change(inputImages, { target: { files: [file] } });

    fireEvent.click(inputSubmit);


    const toastSuccessSpy = jest.spyOn(toast, "success").mockImplementation(() => {});
     expect(toastSuccessSpy).toHaveBeenCalledWith("Add new product success !");
  });


  // Add more tests here...
});

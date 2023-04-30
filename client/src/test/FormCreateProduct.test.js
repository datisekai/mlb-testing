import { render, screen, fireEvent } from "@testing-library/react";
import FormCreateProduct from "../components/Forms/FormCreateProduct";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import { store } from "../redux/store";

describe("FormCreateProduct", () => {
  test("renders the form", () => {
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

  test("updates the product name when input is changed", () => {
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

  test("add product and empty color, memory", () => {
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

  // Add more tests here...
});

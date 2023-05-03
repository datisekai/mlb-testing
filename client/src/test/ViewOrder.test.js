import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { addProduct, updateProductApi } from "../api/ProductApi";
import FormEditProduct from "../components/Forms/FormEditProduct";
import { store } from "../redux/store";

import mockAxios from "jest-mock-axios";
import AdminPage from "../pages/Admin/AdminPage";
import Oder from "../pages/Admin/Oder";
import { getAllOrderApi } from "../api/orderApi";

describe("View All Order", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    mockAxios.reset();
  });

  test("Hiển thị danh sách với page là kí tự", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="*" element={<Oder />} />
          </Routes>
        </Router>
      </Provider>
    );

    const result = await getAllOrderApi("abc");

    const expectedLength = 10;

    expect(result.data.order.length).toEqual(expectedLength);
  });

  test("Hiển thị danh sách đơn hàng", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="*" element={<Oder />} />
          </Routes>
        </Router>
      </Provider>
    );

    const result = await getAllOrderApi(1);

    const expectedLength = 10;

    expect(result.data.order.length).toEqual(expectedLength);
  });
});

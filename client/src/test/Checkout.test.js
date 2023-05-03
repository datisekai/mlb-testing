import ModalEditOder from "../components/Modal/ModalEditOder";
import "@testing-library/jest-dom";
import { createOrderApi } from "../api/orderApi";
describe(ModalEditOder, () => {
  test("Thêm đơn hàng mới", async () => {
    const newOrder = {
      name: "Dương",
      phoneNumber: "0338463462",
      email: "nguyenhaiduong9102@gmail.com",
      address: "29/4 thd",
      note: "",
      totalOrder: "858000",
      statusOrder: "Đang xác nhận",
      payments: "Ship COD",
      isPaid: false,
      products: [
        {
          _id: "637004e5fe12eebf7cd43ea0",
          name: "Chuột Gaming ASUS ROG Gladius II Core",
          newPrice: 780000,
          oldPrice: 1090000,
          image: [
            "http://res.cloudinary.com/annnn/image/upload/v1668285660/fax5t3vxmy6pcbe67dza.webp",
            "http://res.cloudinary.com/annnn/image/upload/v1668285659/y8vyu6kddovezegrdy0b.webp",
          ],
          thumnail:
            "http://res.cloudinary.com/annnn/image/upload/v1668285666/an09tacfnj1tyiomhsn7.webp",
          colors: "",
          memorys: "Có dây",
          category: "Chuột",
          quanty: 1,
        },
      ],
    };
    const resAddOrder = await createOrderApi(newOrder);
    expect(resAddOrder.data.success).toEqual(true);
  });
  test("Thêm đơn hàng mới không có sản phẩm nào", async () => {
    const newOrder = {
      name: "Dương",
      phoneNumber: "0338463462",
      email: "nguyenhaiduong9102@gmail.com",
      address: "29/4 thd",
      note: "",
      totalOrder: "858000",
      statusOrder: "Đang xác nhận",
      payments: "Ship COD",
      isPaid: false,
    };
    const resAddOrder = await createOrderApi(newOrder);
    expect(resAddOrder.data.success).toEqual(false);
  });
});

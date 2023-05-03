import ModalEditOder from "../components/Modal/ModalEditOder";
import "@testing-library/jest-dom";
import { editOderbyId, getAllOrderApi } from "../api/orderApi";
describe(ModalEditOder, () => {
  test("Thay đổi trạng thái đơn hàng và trạng thái thanh toán", async () => {
    const statusOrder = ["Đã xác nhận", "Chưa xác nhận"];
    const res = await getAllOrderApi(1);
    const data = res.data.order[0];
    const resEditOrder = await editOderbyId({
      ...data,
      statusOrder: statusOrder[0],
      isPaid: true,
    });
    expect(resEditOrder.data.success).toEqual(true);
  });
  test("Thay đổi trạng thái đơn hàng ", async () => {
    const statusOrder = ["Đã xác nhận", "Chưa xác nhận"];
    const res = await getAllOrderApi(1);
    const data = res.data.order[0];
    const resEditOrder = await editOderbyId({
      ...data,
      statusOrder: statusOrder[1],
    });
    expect(resEditOrder.data.success).toEqual(true);
  });
  test("Thay đổi trạng thái thanh toán", async () => {
    const statusOrder = ["Đã xác nhận", "Chưa xác nhận"];
    const res = await getAllOrderApi(1);
    const data = res.data.order[0];
    const resEditOrder = await editOderbyId({
      ...data,
      isPaid: false,
    });
    expect(resEditOrder.data.success).toEqual(true);
  });
  test("Không thay đổi gì nhưng nhấn sửa", async () => {
    const statusOrder = ["Đã xác nhận", "Chưa xác nhận"];
    const res = await getAllOrderApi(1);
    const data = res.data.order[0];
    const resEditOrder = await editOderbyId(data);
    expect(resEditOrder.data.success).toEqual(true);
  });
});

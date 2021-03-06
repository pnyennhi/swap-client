import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageUploader from "react-images-upload";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import {
  Divider,
  Button,
  Modal,
  Avatar,
  Rate,
  Input,
  Radio,
  Tabs,
  Progress,
} from "antd";
import Toast from "light-toast";
import { uploadRefundImage } from "../../firebase";
import OrderItem from "../../components/OrderItem";
import Paypal from "../../components/Paypal";
import Axios from "../../Axios";
import paypal from "../../assets/images/paypal.svg";

const { TextArea } = Input;
const { TabPane } = Tabs;

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [refundOrder, setRefundOrder] = useState({});
  const [detailRefund, setDetailRefund] = useState({});
  const [review, setReview] = useState({ rate: 0, review: null });
  const [paidOrder, setPaidOrder] = useState({ id: null, total: 0 });
  const [canceledOrder, setCanceledOrder] = useState(null);
  const [changedOrder, setChangedOrder] = useState(null);
  const [method, setMethod] = useState("cod");
  const [statuses, setStatuses] = useState([]);
  const [current, setCurrent] = useState(1);
  const [request, setRequest] = useState({ images: [], content: "" });
  const [pictures, setPictures] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [video, setVideo] = useState(null);

  const fetchOrder = () => {
    // Axios.get("/orders/user")
    //   .then((res) => {
    //     console.log(res.data);
    //     setOrders(res.data);
    //   })
    //   .catch((err) => console.log(err));
    Axios.get(`orderStatus`)
      .then((res) => {
        setStatuses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    Axios.get(`orders/user?statusId=${current}`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
        // setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [current]);

  const handleUploadStart = () => {
    setIsUploading(true);
    setProgress(0);
  };
  const handleProgress = (progress) => setProgress(progress);
  const handleUploadError = (error) => {
    setIsUploading(false);
    console.error(error);
  };
  const handleUploadSuccess = (filename) => {
    setIsUploading(false);
    setProgress(100);
    firebase
      .storage()
      .ref("refund")
      .child(filename)
      .getDownloadURL()
      .then((url) => setVideo(url));
  };

  const onDrop = (picture) => {
    setPictures(picture);
  };

  const handleCreateRequest = async () => {
    let uploadImages = [];
    if (pictures.length > 0) {
      uploadImages = pictures.map((item) => uploadRefundImage(item));
    }

    const images = pictures.length > 0 ? await Promise.all(uploadImages) : [];
    Axios.post("/refundRequest", {
      orderId: refundOrder.id,
      detail: request.content,
      links: images,
      video: video,
    })
      .then((data) => {
        Toast.success("Yêu cầu của bạn đã được gửi");
        setCurrent(8);
        setRefundOrder({});
      })
      .catch((err) => {
        console.log(err);
        Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau");
      });
  };

  const handleAddReview = () => {
    if (review.rate === 0) {
      Toast.info("Bạn cần đánh giá sao");
      return;
    }

    Axios.post("/reviews", {
      ...review,
      sellerId: selectedOrder.sellerId,
      orderId: selectedOrder.id,
    })
      .then((res) => {
        Toast.success("Đánh giá của bạn đã được ghi nhận");
        const orderId = selectedOrder.id;
        const index = orders.map((order) => order.id).indexOf(orderId);
        orders[index] = { ...orders[index], review: { ...review } };
        setSelectedOrder({});
      })
      .catch((err) => {
        Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau");
      });
  };

  const handleCancelOrder = () => {
    Axios.put(`/orders/reject/${canceledOrder}`)
      .then((res) => {
        fetchOrder();
        setCanceledOrder(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePayAgain = () => {
    Axios.put(`/orders/${paidOrder.id}`, { statusId: 1 })
      .then((res) => {
        fetchOrder();
        setPaidOrder({ id: null, total: 0 });
      })
      .catch((err) => {
        Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        setPaidOrder({ id: null, total: 0 });
      });
  };

  const handlePayError = () => {
    Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau");
    setPaidOrder({ id: null, total: 0 });
  };

  const handleChangeMethod = () => {
    Axios.put(`/orders/method/${changedOrder}`, { paymentMethod: method })
      .then((res) => {
        fetchOrder();
        setChangedOrder(null);
      })
      .catch((err) => {
        Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau");
        setChangedOrder(null);
      });
  };

  const handleChangeTab = (key) => {
    setCurrent(key);
  };

  return (
    <>
      <Tabs defaultActiveKey="0" onChange={(key) => handleChangeTab(key)}>
        {statuses.map((status) => (
          <TabPane
            tab={`${status.status} ${
              current == status.id ? `(${orders.length})` : ""
            }`}
            key={status.id}
          >
            {orders.map((order, index) => {
              const products = order.items;
              const seller = order.seller;
              const status = order.status.status;
              const total = order.total;

              return (
                <div className="order-item mb-5" key={index}>
                  <OrderItem
                    products={products.slice(0, 2)}
                    seller={seller}
                    status={status}
                  />
                  {products.length > 2 && (
                    <div className="text-center">
                      <Link className="see-more">
                        Xem thêm {products.length - 2} sản phẩm
                      </Link>
                    </div>
                  )}
                  <Divider />
                  <div className="flex justify-content-end align-items-center mb-3">
                    <p className="mr-4">Tổng tiền:</p>
                    <h4 className="text-orange font-weight-600">$ {total}</h4>
                  </div>
                  <div className="flex justify-content-end">
                    {order.statusId === 5 && (
                      <Button
                        className="btn-pink font-weight-600 mr-3"
                        onClick={() => setRefundOrder(order)}
                      >
                        Yêu cầu hoàn hàng
                      </Button>
                    )}

                    {order.statusId === 6 && !order.review && (
                      <Button
                        className="btn-pink font-weight-600 mr-3"
                        onClick={() => setSelectedOrder(order)}
                      >
                        Đánh giá
                      </Button>
                    )}
                    {[1, 2].includes(order.statusId) && (
                      <Button
                        className="btn-pink-outlined font-weight-600 mr-3"
                        onClick={() => setCanceledOrder(order.id)}
                      >
                        Hủy đơn hàng
                      </Button>
                    )}

                    {order.statusId === 1 && (
                      <Button
                        className="btn-pink-outlined font-weight-600 mr-3"
                        onClick={() => setChangedOrder(order.id)}
                      >
                        Đổi phương thức thanh toán
                      </Button>
                    )}
                    {order.statusId === 1 && (
                      <Button
                        className="btn-pink font-weight-600 mr-3"
                        onClick={() => setPaidOrder({ id: order.id, total })}
                      >
                        Thanh toán lại
                      </Button>
                    )}
                    <Link to={`/order/detail/${order.id}`}>
                      <Button className="btn-pink font-weight-600">
                        Xem chi tiết đơn hàng
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </TabPane>
        ))}
      </Tabs>

      <Modal
        visible={refundOrder.id}
        title="Yêu cầu hoàn hàng"
        onCancel={() => setRefundOrder({})}
        onOk={() => handleCreateRequest()}
        okText="Gửi yêu cầu"
        cancelText="Hủy"
      >
        <p>Mã đơn hàng: {refundOrder.id}</p>
        <Divider orientation="left">Nội dung yêu cầu hoàn hàng</Divider>
        <div className="mb-2">Lý do hoàn hàng:</div>
        <TextArea
          autoSize={{ minRows: 5, maxRows: 10 }}
          placeholder="Lý do hoàn hàng"
          onChange={(e) => setRequest({ ...request, content: e.target.value })}
          className="mb-3"
        />
        <div className="mb-2">Hình ảnh về sản phẩm đã nhận:</div>
        <ImageUploader
          withIcon={false}
          withPreview={true}
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif", "jpeg"]}
          maxFileSize={5242880}
        />

        <div className="mb-2">Video về sản phẩm đã nhận:</div>
        <FileUploader
          accept="*"
          randomizeFilename
          storageRef={firebase.storage().ref("refund")}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
          onProgress={handleProgress}
        />
        {isUploading && <Progress percent={progress} />}
        {video && (
          <video width="400" controls="controls" preload="metadata">
            <source src={video} />
          </video>
        )}
      </Modal>

      <Modal
        visible={refundOrder.id}
        title="Yêu cầu hoàn hàng"
        onCancel={() => setRefundOrder({})}
        onOk={() => handleCreateRequest()}
        okText="Gửi yêu cầu"
        cancelText="Hủy"
      >
        <p>Mã đơn hàng: {refundOrder.id}</p>
        <Divider orientation="left">Nội dung yêu cầu hoàn hàng</Divider>
        <div className="mb-2">Lý do hoàn hàng:</div>
        <TextArea
          autoSize={{ minRows: 5, maxRows: 10 }}
          placeholder="Lý do hoàn hàng"
          onChange={(e) => setRequest({ ...request, content: e.target.value })}
          className="mb-3"
        />
        <div className="mb-2">Hình ảnh về sản phẩm đã nhận:</div>
        <ImageUploader
          withIcon={false}
          withPreview={true}
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif", "jpeg"]}
          maxFileSize={5242880}
        />

        <div className="mb-2">Video về sản phẩm đã nhận:</div>
        <FileUploader
          accept="*"
          randomizeFilename
          storageRef={firebase.storage().ref("refund")}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          onUploadSuccess={handleUploadSuccess}
          onProgress={handleProgress}
        />
        {isUploading && <Progress percent={progress} />}
        {video && (
          <video width="400" controls="controls" preload="metadata">
            <source src={video} />
          </video>
        )}
      </Modal>

      <Modal
        visible={paidOrder.id}
        onCancel={() => setPaidOrder({ id: null, total: 0 })}
      >
        {paidOrder.id && (
          <Paypal
            total={paidOrder.total}
            onSuccess={handlePayAgain}
            onError={handlePayError}
          />
        )}
      </Modal>

      <Modal
        visible={selectedOrder.id}
        onCancel={() => setSelectedOrder({})}
        onOk={() => handleAddReview()}
        okText="Gửi đánh giá"
        cancelText="Hủy"
      >
        <div className="flex align-items-center owner mb-3">
          <Avatar size={60} src={selectedOrder.seller?.avatarImage} />
          <div className="ml-3">
            <h6 className="font-weight-600 mb-2">
              {selectedOrder.seller?.username}
            </h6>
            <p className="email">{selectedOrder.seller?.email}</p>
          </div>
        </div>
        <div className="text-center review-modal mb-3">
          <Rate onChange={(number) => setReview({ ...review, rate: number })} />
        </div>
        <TextArea
          autoSize={{ minRows: 5, maxRows: 10 }}
          placeholder="Viết đánh giá của bạn ở đây"
          onChange={(e) => setReview({ ...review, review: e.target.value })}
        />
      </Modal>

      <Modal
        visible={paidOrder.id}
        onCancel={() => setPaidOrder({ id: null, total: 0 })}
      >
        {paidOrder.id && (
          <Paypal
            total={paidOrder.total}
            onSuccess={handlePayAgain}
            onError={handlePayError}
          />
        )}
      </Modal>

      <Modal
        visible={changedOrder}
        onCancel={() => setChangedOrder(null)}
        onOk={handleChangeMethod}
      >
        <h5 className="mb-3">Chọn phương thức thanh toán</h5>
        <Radio.Group
          className="ml-3"
          onChange={(value) => setMethod(value)}
          value={method}
        >
          <div className="mb-2">
            <Radio value="cod">Thanh toán khi nhận hàng</Radio>
          </div>
          <div>
            <Radio value="paypal">
              Thanh toán qua <img width="80px" src={paypal} alt="paypal" />
            </Radio>
          </div>
        </Radio.Group>
      </Modal>

      <Modal
        visible={canceledOrder}
        onOk={handleCancelOrder}
        onCancel={() => setCanceledOrder(null)}
        cancelText="Không"
        okText="Hủy đơn hàng"
      >
        <p>Bạn có chắc chắn hủy đơn hàng này?</p>
      </Modal>
    </>
  );
};

export default Order;

import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import { Form, Cascader, Select, Button, Space } from "antd";
import * as Yup from "yup";
import ImageUploader from "react-images-upload";
import Toast from "light-toast";
import TextInput from "../../components/TextInput";
import TextAreaInput from "../../components/TextAreaInput";
import ErrorFocus from "../../components/ErrorFocus";
import Axios from "../../Axios";
import { uploadProductImage } from "../../firebase";

const AddProduct = ({ id }) => {
  const [editedProduct, setEditedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [cover, setCover] = useState(null);
  const [oldPictures, setOldPictures] = useState([]);
  const [oldCover, setOldCover] = useState([]);
  const [coverValidate, setCoverValidate] = useState(null);

  const onDrop = (picture, oldPictures) => {
    setOldPictures(oldPictures);
    setPictures(picture);
  };

  const onDropCover = (picture, oldPicture) => {
    setCover(picture);
    setOldCover(oldPicture);
  };

  useEffect(() => {
    Axios.get(`/products/${id}`)
      .then((res) => {
        setEditedProduct(res.data);
        setOldCover([res.data.coverImage]);
        setOldPictures(res.data.images.map((item) => item.imageLink));
      })
      .catch((err) => console.log(err));

    Axios.get("/categories").then((res) => {
      const data = res.data.data;

      const categories = data.map((item) => {
        return {
          ...item,
          label: item.category,
          value: item.category,
          children: item.children.map((child) => ({
            ...child,
            label: child.subCategory,
            value: child.id,
          })),
        };
      });

      setCategories(categories);
    });

    Axios.get("conditions").then((res) => {
      const data = res.data.data;

      const conditions = data.map((item) => ({
        ...item,
        label: item.condition,
        value: item.id,
      }));

      setConditions(conditions);
    });
  }, []);

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Please fill out this field"),
    subCategoryId: Yup.number().required("Please fill out this field"),
    conditionId: Yup.number().required("Please fill out this field"),
    size: Yup.string().required("Please fill out this field"),
    material: Yup.string().required("Please fill out this field"),
    brand: Yup.string().required("Please fill out this field"),
    description: Yup.string().required("Please fill out this field"),
    price: Yup.number().required("Please fill out this field"),
    quantity: Yup.number().required("Please fill out this field"),
  });

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const getCategory = (subId) => {
    return categories.find((item) => {
      const subs = item.children.map((child) => child.id);
      return subs.includes(subId);
    })?.value;
  };

  const handleEditProduct = (values, formikBag) => {
    console.log(values);

    Axios.put(`/products/${id}`, values)
      .then((res) =>
        Toast.success("Sản phẩm đã được gửi đến quản trị viên chờ duyệt", 2000)
      )
      .catch((err) => Toast.fail(err.response.data, 2000));
  };

  const handleSubmit = async (values, formikBag) => {
    if (cover?.length <= 0) {
      setCoverValidate("Bạn phải upload ít nhất 1 ảnh bìa");
      formikBag.setSubmitting(false);
      return;
    }

    setCoverValidate(null);

    try {
      const coverImage = cover
        ? await uploadProductImage(cover[0])
        : oldCover[0];
      values.coverImage = coverImage;

      let uploadImages = [];
      if (pictures.length > 0) {
        uploadImages = pictures.map((item) => uploadProductImage(item));
      }

      const images = pictures.length > 0 ? await Promise.all(uploadImages) : [];

      values.images = [
        ...oldPictures.filter((item) => item.includes("http")),
        ...images,
      ];

      handleEditProduct(values, formikBag);
    } catch (err) {
      console.log(err);
      Toast.fail(err.response.data);
      formikBag.setSubmitting(false);
      return;
    }

    // uploadProductImage(cover[0])
    //   .then((res) => {
    //     values.coverImage = res;
    //     if (pictures.length > 0) {
    //       const uploadImages = pictures[0].map((item) =>
    //         uploadProductImage(item)
    //       );
    //       Promise.all(uploadImages)
    //         .then((response) => {
    //           values.images = response;
    //           handleAddProduct(values, formikBag);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //           Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau");
    //           // setIsLoading(false);
    //           formikBag.setSubmitting(false);
    //         });
    //     } else handleAddProduct(values, formikBag);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau");
    //     // setIsLoading(false);
    //     formikBag.setSubmitting(false);
    //   });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={editedProduct}
      onSubmit={(values, formikBag) => handleSubmit(values, formikBag)}
      validationSchema={SignupSchema}
      validateOnBlur={false}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          setFieldValue,
        } = props;
        return (
          <Form {...layout} colon={false}>
            <div className="checkout checkout_info bg--white">
              <h5 className="mb-4">Thông tin sản phẩm</h5>
              <Field
                type="text"
                name="name"
                component={TextInput}
                className={errors.name ? "form-control error" : "form-control"}
                label="Tên sản phẩm"
              />

              <Form.Item label="Danh mục">
                <Cascader
                  value={[
                    getCategory(values?.subCategoryId),
                    values?.subCategoryId,
                  ]}
                  options={categories}
                  onChange={(value) => setFieldValue("subcategoryId", value[1])}
                />
                {errors.subCategoryId ? (
                  <div className="input-feedback">{errors.subCategoryId}</div>
                ) : null}
              </Form.Item>
              <Form.Item label="Tình trạng">
                <Select
                  value={values?.conditionId}
                  options={conditions}
                  onChange={(value) => setFieldValue("conditionId", value)}
                ></Select>
                {errors.conditionId ? (
                  <div className="input-feedback">{errors.conditionId}</div>
                ) : null}
              </Form.Item>

              <Field
                type="text"
                name="size"
                component={TextInput}
                className={errors.size ? "form-control error" : "form-control"}
                label="Kích cỡ"
              />

              <Field
                type="text"
                name="material"
                component={TextInput}
                className={
                  errors.material ? "form-control error" : "form-control"
                }
                label="Chất liệu"
              />

              <Field
                type="text"
                name="brand"
                component={TextInput}
                className={errors.brand ? "form-control error" : "form-control"}
                label="Thương hiệu"
              />

              <Field
                type="text"
                name="description"
                component={TextAreaInput}
                className={
                  errors.description ? "form-control error" : "form-control"
                }
                label="Mô tả"
              />
            </div>
            <div className="checkout checkout_info bg--white">
              <h5 className="mb-4">Thông tin bán hàng</h5>
              <Field
                type="text"
                name="price"
                component={TextInput}
                className={errors.price ? "form-control error" : "form-control"}
                label="Giá"
              />
              <Field
                type="text"
                name="quantity"
                component={TextInput}
                className={
                  errors.quantity ? "form-control error" : "form-control"
                }
                label="Số lượng"
              />
            </div>

            <div className="checkout checkout_info bg--white">
              <h5 className="mb-4">Quản lý hình ảnh</h5>
              <p>Ảnh bìa</p>
              <ImageUploader
                defaultImages={oldCover}
                withIcon={true}
                withPreview={true}
                onChange={onDropCover}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
                // singleImage={true}
              />
              {coverValidate && (
                <p className="input-feedback">{coverValidate}</p>
              )}
              <p>Ảnh khác</p>
              <ImageUploader
                defaultImages={oldPictures}
                withIcon={true}
                withPreview={true}
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
              />
            </div>

            <ErrorFocus />

            <div className="float-right">
              <Space>
                <Button
                  type="submit"
                  className="btn-orange font-weight-600 text-uppercase"
                  onClick={handleSubmit}
                >
                  Lưu
                </Button>
              </Space>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddProduct;

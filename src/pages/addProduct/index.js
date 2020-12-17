import React, { useState, useEffect } from "react";
import { Formik, Field, getActiveElement } from "formik";
import { Form, Cascader, Select, Button, Space } from "antd";
import * as Yup from "yup";
import ImageUploader from "react-images-upload";
import Toast from "light-toast";
import TextInput from "../../components/TextInput";
import TextAreaInput from "../../components/TextAreaInput";
import ErrorFocus from "../../components/ErrorFocus";
import Axios from "../../Axios";
import { uploadProductImage } from "../../firebase";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [brands, setBrands] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [cover, setCover] = useState(null);
  const [coverValidate, setCoverValidate] = useState(null);

  const onDrop = (picture) => {
    setPictures(picture);
  };

  const onDropCover = (picture) => {
    setCover(picture);
  };

  useEffect(() => {
    Axios.get("/categories").then((res) => {
      const data = res.data.data;

      const categories = data.map((item) => {
        return {
          ...item,
          label: item.category,
          value: item.id,
          children: item.children.map((child) => ({
            ...child,
            label: child.subCategory,
            value: child.id,
          })),
        };
      });

      setCategories(categories);
    });

    Axios.get("/conditions").then((res) => {
      const data = res.data.data;

      const conditions = data.map((item) => ({
        ...item,
        label: item.condition,
        value: item.id,
      }));

      conditions.push({ label: "", value: "" });

      setConditions(conditions);
    });

    Axios.get("/brands").then((res) => {
      const data = res.data;

      const brands = data.map((item) => ({
        ...item,
        label: item.brand,
        value: item.brand,
      }));

      brands.push({ label: "Khác", value: "Khác" });

      setBrands(brands);
    });

    Axios.get("/sizes").then((res) => {
      const data = res.data;

      const sizes = data.map((item) => ({
        ...item,
        label: `Size ${item.size}`,
        value: item.size,
      }));

      sizes.push({ label: "khác", value: "Khác" });

      setSizes(sizes);
    });

    Axios.get("/materials").then((res) => {
      const data = res.data;

      const materials = data.map((item) => ({
        ...item,
        label: `${item.material}`,
        value: item.material,
      }));

      materials.push({ label: "Khác", value: "Khác" });

      setMaterials(materials);
    });
  }, []);

  const initialValues = {
    name: "",
    categoryId: "",
    subCategoryId: "",
    conditionId: "",
    size: "",
    material: "",
    brand: "",
    description: "",
    price: null,
    quantity: 1,
  };

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
    const category = categories.find((item) => {
      const subs = item.children.map((child) => child.id);
      return subs.includes(subId);
    })?.value;

    return category ?? null;
  };

  const handleAddProduct = (values, formikBag) => {
    console.log(values);

    Axios.post("/products", values)
      .then((res) => {
        Toast.success("Sản phẩm đã được gửi đến quản trị viên chờ duyệt", 2000);
        formikBag.resetForm({ values: "" });
        setCover(null);
        setPictures([]);
        window.scrollTo(0, 0);
      })
      .catch((err) =>
        Toast.fail("Đã có lỗi xảy ra. Vui lòng thử lại sau", 2000)
      );
  };

  const handleSubmit = async (values, formikBag) => {
    if (!cover) {
      setCoverValidate("Bạn phải upload ít nhất 1 ảnh bìa");
      formikBag.setSubmitting(false);
      return;
    }

    if (cover.length <= 0) {
      setCoverValidate("Bạn phải upload ít nhất 1 ảnh bìa");
      formikBag.setSubmitting(false);
      return;
    }

    setCoverValidate(null);
    try {
      const coverImage = await uploadProductImage(cover[0]);

      values.coverImage = coverImage;

      let uploadImages = [];
      if (pictures.length > 0) {
        uploadImages = pictures.map((item) => uploadProductImage(item));
      }

      const images = pictures.length > 0 ? await Promise.all(uploadImages) : [];
      values.images = images;

      handleAddProduct(values, formikBag);
    } catch (err) {
      console.log(err);
      Toast.fail("Fail");
      formikBag.setSubmitting(false);
      return;
    }
    // uploadProductImage(cover[0])
    //   .then((res) => {
    //     values.coverImage = res;
    //     if (pictures.length > 0) {
    //       alert(1);
    //       const uploadImages = pictures[0].map((item) =>
    //         uploadProductImage(item)
    //       );
    //       Promise.all(uploadImages)
    //         .then((response) => {
    //           console.log(response);

    //           values.images = [...response];

    //           console.log(values);
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
      initialValues={initialValues}
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
                className={
                  errors.name && touched.name
                    ? "form-control error"
                    : "form-control"
                }
                label="Tên sản phẩm"
              />

              <Form.Item label="Danh mục">
                <Cascader
                  value={
                    getCategory(values.subCategoryId)
                      ? [
                          getCategory(values.subCategoryId),
                          values.subCategoryId,
                        ]
                      : null
                  }
                  placeholder=""
                  options={categories}
                  onChange={(value) => {
                    setFieldValue("subCategoryId", value[1]);
                    setFieldValue("categoryId", value[0]);
                  }}
                />
                {errors.subCategoryId && touched.subCategoryId ? (
                  <div className="input-feedback">{errors.subCategoryId}</div>
                ) : null}
              </Form.Item>
              <Form.Item label="Tình trạng">
                <Select
                  value={values.conditionId}
                  options={conditions}
                  onChange={(value) => setFieldValue("conditionId", value)}
                ></Select>
                {errors.conditionId & touched.conditionId ? (
                  <div className="input-feedback">{errors.conditionId}</div>
                ) : null}
              </Form.Item>

              <Form.Item label="Kích cỡ">
                <Select
                  name="size"
                  value={values.size}
                  options={sizes.filter(
                    (size) => size.categoryId === values.categoryId
                  )}
                  onChange={(value) => setFieldValue("size", value)}
                ></Select>
                {errors.size && touched.size ? (
                  <div className="input-feedback">{errors.size}</div>
                ) : null}
              </Form.Item>

              <Form.Item label="Chất liệu">
                <Select
                  name="material"
                  value={values.material}
                  options={materials}
                  onChange={(value) => setFieldValue("material", value)}
                  onBlur={handleBlur}
                ></Select>
                {errors.material && touched.material ? (
                  <div className="input-feedback">{errors.material}</div>
                ) : null}
              </Form.Item>

              <Form.Item label="Thương hiệu">
                <Select
                  name="brand"
                  value={values.brand}
                  options={brands}
                  onChange={(value) => setFieldValue("brand", value)}
                  onBlur={handleBlur}
                ></Select>
                {errors.brand && touched.brand ? (
                  <div className="input-feedback">{errors.brand}</div>
                ) : null}
              </Form.Item>

              <Field
                type="number"
                name="weight"
                component={TextInput}
                className={
                  errors.weight && touched.weight
                    ? "form-control error"
                    : "form-control"
                }
                label="Cân nặng"
              />

              <Field
                type="text"
                name="description"
                component={TextAreaInput}
                className={
                  errors.description && touched.description
                    ? "form-control error"
                    : "form-control"
                }
                label="Mô tả"
              />
            </div>
            <div className="checkout checkout_info bg--white">
              <h5 className="mb-4">Thông tin bán hàng</h5>
              <Field
                type="number"
                name="price"
                component={TextInput}
                className={
                  errors.price && touched.price
                    ? "form-control error"
                    : "form-control"
                }
                label="Giá"
              />
              <Field
                type="number"
                name="quantity"
                className={
                  errors.quantity && touched.quantity
                    ? "form-control error"
                    : "form-control"
                }
                component={TextInput}
                label="Số lượng"
              />
            </div>

            <div className="checkout checkout_info bg--white">
              <h5 className="mb-4">Quản lý hình ảnh</h5>
              <p>Ảnh bìa</p>
              <ImageUploader
                withIcon={true}
                withPreview={true}
                onChange={onDropCover}
                imgExtension={[".jpg", ".gif", ".png", ".gif", "jpeg"]}
                maxFileSize={5242880}
                singleImage={true}
              />
              {coverValidate && (
                <p className="input-feedback">{coverValidate}</p>
              )}
              <p>Ảnh khác</p>
              <ImageUploader
                withIcon={true}
                withPreview={true}
                onChange={onDrop}
                imgExtension={[".jpg", ".gif", ".png", ".gif", "jpeg"]}
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
                  Thêm
                </Button>
                <Button
                  className="btn-secondary font-weight-600 text-uppercase"
                  onClick={handleReset}
                >
                  Reset
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

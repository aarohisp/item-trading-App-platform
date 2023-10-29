import React, { useEffect, useState } from "react";
import { Layout, Card, Avatar, Button, Col, Divider, Row } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment-timezone";
import App from "../../routes/index";
import Topbar from "../Topbar";
import AppSidebar from "./AppSidebar";
import { NAV_STYLE_ABOVE_HEADER, NAV_STYLE_BELOW_HEADER, NAV_STYLE_DARK_HORIZONTAL, NAV_STYLE_DEFAULT_HORIZONTAL, NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_INSIDE_HEADER_HORIZONTAL, NAV_STYLE_MINI_SIDEBAR } from "../../constants/ThemeSetting";
import { updateWindowWidth } from "../../appRedux/actions";
import type { RootState } from "../../appRedux/store";
import CommonModal from "../Modal";
import axios from "axios";
import CONFIG from "../Config/config";

const { Content, Footer } = Layout;
const { Meta } = Card;

const getContainerClass = (navStyle: string) => {
  switch (navStyle) {
    case NAV_STYLE_DARK_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_DEFAULT_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_BELOW_HEADER:
      return "gx-container-wrap";
    case NAV_STYLE_ABOVE_HEADER:
      return "gx-container-wrap";
    default:
      return "";
  }
};

const getNavStyles = (navStyle: string) => {
  switch (navStyle) {
    case NAV_STYLE_FIXED:
      return <Topbar />;
    case NAV_STYLE_DRAWER:
      return <Topbar />;
    case NAV_STYLE_MINI_SIDEBAR:
      return <Topbar />;
    default:
      return null;
  }
};

const MainApp = () => {
  // CONSTANTS
  const dispatch = useDispatch();

  // STATE
  const { navStyle } = useSelector(({ settings }: RootState) => settings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]); // Explicitly typed as an array of Product
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProductImage, setSelectedProductImage] = useState<string | null>(null);

  type Product = {
    category: string;
    descriptions: string;
    donor_id: number;
    image_info: number[]; // Assuming image_info is an array of image IDs
    item_address: string;
    item_id: number;
    item_name: string;
    specification: string;
    time_used: number;
  };

  type ApiResponse = {
    products: Product[];
    status: string;
  };

  const fetchProducts = (page: number) => {
    axios
      .get(`http://127.0.0.1:5000/api/get_all_products?page=${page}&per_page=10`)
      .then((response) => {
        setProducts(response.data.products);
        // Assuming that the response structure has a 'products' field
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  };

  const fetchProductImage = (imageId: number) => {
    axios
      .get(`http://127.0.0.1:5000/api/images/${imageId}`, {
        responseType: "arraybuffer"
      })
      .then((response) => {
        const base64Image = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ""));
        setSelectedProductImage(`data:image/jpeg;base64, ${base64Image}`);
      })
      .catch((error) => {
        console.error("Error fetching product image:", error);
        setSelectedProductImage(null);
      });
  };

  const fetchProductImages = (imageIds: number[]) => {
    const imagePromises = imageIds.map((imageId: number) => {
      return axios
        .get(`${CONFIG.API_ENDPOINT}/api/images/${imageId}`, {
          responseType: "arraybuffer"
        })
        .then((response) => {
          const base64Image = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ""));
          return `data:image/jpeg;base64, ${base64Image}`;
        });
    });

    return Promise.all(imagePromises);
  };

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const currentTimeStamp = moment();
    const tokenExpiryTimeStamp = JSON.parse(localStorage.getItem("tokenExpiryTimeStamp") || "{}");
    const differenceInTime = moment(tokenExpiryTimeStamp).diff(currentTimeStamp);
    const differenceInMiliSeconds = moment.duration(differenceInTime).asMilliseconds();
    const timer = setTimeout(() => {
      localStorage.clear();
      handleShowModal();
    }, differenceInMiliSeconds);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(updateWindowWidth(window.innerWidth));
    });
  }, [dispatch]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  return (
    <>
      <Layout className="gx-app-layout">
        <AppSidebar navStyle={navStyle} />
        <Layout>
          {getNavStyles(navStyle)}
          <Content className={`gx-layout-content ${getContainerClass(navStyle)}`}>
            <Divider orientation="left">Popular Items</Divider>
            <div>
              <Row gutter={[16, 24]}>
                {products.map((product) => (
                  <Col key={product.item_id} className="gutter-row" span={6}>
                    <div>
                      <Link to={`http://127.0.0.1:5000/api/get_product/${product.item_id}`}>
                        <Card
                          style={{ width: 300 }}
                          cover={
                            <img
                              alt="example"
                              src={`http://127.0.0.1:5000/api/images/${product.image_info[0]}`}
                              width={200}
                              height={250}
                              onClick={() => {
                                fetchProductImage(product.image_info[0]);
                              }}
                            />
                          }
                        >
                          <Card.Meta avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />} title={product.item_name} description={product.descriptions} />
                        </Card>
                      </Link>
                    </div>
                  </Col>
                ))}
              </Row>
              <button onClick={handlePrevPage}>Prev Page</button>
              <button onClick={handleNextPage}>Next Page</button>
            </div>
            <Footer>
              <div className="gx-layout-footer-content">
                <div style={{ textAlign: "center" }}>
                  <a href="https://sevasahayog.org/" target="_blank" rel="noopener noreferrer">
                    About Us
                  </a>
                </div>
                <div>
                  © SevaSahayog (company). {new Date().getFullYear()}-{(new Date().getFullYear() + 1).toString().slice(2)}
                </div>
              </div>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainApp;

import { useEffect, useState } from "react";
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
// import Dashboard from "../Dashboard/Index";
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

  // HANDLERS
  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  type Product = {
    item_id: number;
    item_name: string;
    descriptions: string;
    image_info: string;
    item_category: number;
    
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imageData, setImageData] = useState('');

  // Getting the first image through category
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await axios.get(
          `${CONFIG.API_ENDPOINT}/api/get_products?page=${currentPage}&per_page=10`
        );
        setProducts(productsResponse.data.items as Product[]);
        setTotalPages(productsResponse.data.total_pages);
  
        // Fetch the first image associated with the first product's category
        //image_info in item mapped to image_category in image
        if (productsResponse.data.items.length > 0) {
          const firstProduct = productsResponse.data.items[0];
          const imageResponse = await axios.get(
            `${CONFIG.API_ENDPOINT}/api/images/category/${firstProduct.image_info}`
          );
          const firstImage = imageResponse.data.images[0];
          console.log('First Image:', firstImage)
          setImageData(firstImage.image_data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [currentPage]);
  
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) { // Check if there are more pages to fetch
      setCurrentPage(currentPage + 1);
    }
  };

  // EFFECTS

  useEffect(() => {
    /* calculate difference between two timestamps (expiry timestamp and current timestamp) */
    const currentTimeStamp = moment();
    const tokenExpiryTimeStamp: string | Record<string, never> = JSON.parse(localStorage.getItem("tokenExpiryTimeStamp") || "{}");
    const differenceInTime = moment(tokenExpiryTimeStamp).diff(currentTimeStamp);
    const differenceInMiliSeconds = moment.duration(differenceInTime).asMilliseconds();
    const timer = setTimeout(() => {
      localStorage.clear();
      handleShowModal();
    }, differenceInMiliSeconds);

    /* cleanup function which will clear old timers */
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(updateWindowWidth(window.innerWidth));
    });
  }, [dispatch]);

  return (
    <>
      <Layout className="gx-app-layout">
        <AppSidebar navStyle={navStyle} />
        <Layout>
          {getNavStyles(navStyle)}
          <Content className={`gx-layout-content ${getContainerClass(navStyle)} `}>
            {/* <Dashboard /> */}
            <Divider orientation="left">Popular Items</Divider>
            <div>
              <Row gutter={[16, 24]}>
                {products.map(product => (
                  <Col key={product.item_id} className="gutter-row" span={6}>
                    <div>
                      <Link to={`/productdescription/${product.item_id}`}>
                        <Card style={{ width: 300 }} cover={<img alt="example" src={`data:image/jpeg;base64, ${imageData}`} width={200} height={250} />}>
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

            <App />
            <Footer>
              <div className="gx-layout-footer-content">
                {/* About Us link */}
                <div style={{ textAlign:'center'}}>
                  <a href="https://sevasahayog.org/" target="_blank" rel="noopener noreferrer">About Us</a>
                </div>
                {/* get year from current year(YYYY) - next year (YY) */}
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

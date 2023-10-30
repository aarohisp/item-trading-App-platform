import { useEffect, useState } from "react";
import { Layout, Image, Button } from "antd";
import { ContactsOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import App from "../../routes/index";
import Topbar from "../Topbar";
import { NAV_STYLE_ABOVE_HEADER, NAV_STYLE_BELOW_HEADER, NAV_STYLE_DARK_HORIZONTAL, NAV_STYLE_DEFAULT_HORIZONTAL, NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_INSIDE_HEADER_HORIZONTAL, NAV_STYLE_MINI_SIDEBAR } from "../../constants/ThemeSetting";
import { updateWindowWidth } from "../../appRedux/actions";
import type { RootState } from "../../appRedux/store";
import axios from "axios";
import { useParams } from "react-router-dom";
import CONFIG from "../Config/config";
import "./index.css"; // Import the CSS file

interface ItemData {
  category: string;
  descriptions: string;
  donor_id: number;
  image_info: number[]; // Assuming image_info is an array of image IDs
  item_address: string;
  item_id: number;
  item_name: string;
  specification: string;
  time_used: number;
}

type ProdDescProps = {
  itemId: number | null;
};

const { Content, Footer } = Layout;

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

const styles: any = {
  imageCarouselContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "relative"
  },
  productDetails: {
    marginTop: "20px"
  },
  contactBtn: {
    width: "150px",
    marginTop: "10px"
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

const ProdDesc = (props: ProdDescProps) => {
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const { itemId } = useParams<{ itemId: string }>();
  const [selectedProductImage, setSelectedProductImage] = useState<string | null>(null);

  console.log("Item ID:", itemId);

  useEffect(() => {
    // Define the API endpoint for retrieving a single item
    const apiEndpoint = `http://127.0.0.1:5000/api/get_product/${itemId}`;

    console.log("Fetching item with ID:", itemId); // Log the item ID

    axios
      .get(apiEndpoint)
      .then((response) => {
        const item = response.data.item;
        setItemData(item);
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
      });
  }, [itemId]);

  // CONSTANTS
  const dispatch = useDispatch();

  // STATE
  const { navStyle } = useSelector(({ settings }: RootState) => settings);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProductImage = (imageId: number) => {
    axios
      .get(`http://127.0.0.1:5000/api/images/43`, {
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

  // HANDLERS
  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    window.location.reload();
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

  function ImageCarousel() {
    return (
      <div className="content-container">
        <div className="image-carousel-container">
          {" "}
          {/* Use the CSS class here */}
          <div className="image-container">
            {" "}
            {/* Use the CSS class here */}
            <h1>{itemData ? itemData.item_name : "Title"}</h1>
            {itemData && itemData.image_info ? (
              <img
                alt="example"
                src={`http://127.0.0.1:5000/api/images/43`}
                width={300}
                height={350}
                onClick={() => {
                  console.log("here", itemData);
                  fetchProductImage(itemData.image_info[0]);
                }}
              />
            ) : (
              <div>No image available</div>
            )}
          </div>
          <section className="details-container">
            <br />
            <br />
            <br />
            <h2>Product Details</h2>
            <p>
              <strong>Category:</strong> {itemData ? itemData.category : "Category"}
            </p>
            <p>
              <strong>Description:</strong> {itemData ? itemData.descriptions : "Description"}
            </p>
            <p>
              <strong>Address:</strong> {itemData ? itemData.item_address : "Address"}
            </p>
            <p>
              <strong>Time Used:</strong> {itemData ? itemData.time_used : "Time Used(in years): "}
            </p>
            <p>
              <strong>Specifications:</strong> {itemData ? itemData.specification : "Specifications"}
            </p>
            <Button type="primary" shape="round" icon={<ContactsOutlined />} style={styles.contactBtn}>
              Contact Donor
            </Button>
          </section>
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout className="gx-app-layout">
        <Layout>
          {getNavStyles(navStyle)}
          <Content className={`gx-layout-content ${getContainerClass(navStyle)} `}>
            <App />
            <ImageCarousel />
            <Footer>
              <div className="gx-layout-footer-content">
                <div>
                  © Seva Sahyog Foundation Ltd (company). {new Date().getFullYear()}-{(new Date().getFullYear() + 1).toString().slice(2)}
                </div>
              </div>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default ProdDesc;

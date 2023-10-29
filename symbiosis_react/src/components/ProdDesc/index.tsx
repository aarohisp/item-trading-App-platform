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

interface ItemData {
  item_id: number;
  item_name: string;
  descriptions: string;
  time_used: string; // Adjust the type if 'time_used' is a different type
  donor_id: string; // Adjust the type if 'donor_id' is a different type
  category: string; // Adjust the type if 'category' is a different type
  item_address: string;
  image_info: string;
  specification: string;
  org_id: string; // Adjust the type if 'org_id' is a different type
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
  imageDisplay: {
    display: "flex",
    alignItems: "center",
    position: "relative"
  },
  imageNavigator: {
    position: "absolute",
    right: "-30px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "24px",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    outline: "none"
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
  const [categoryImages, setCategoryImages] = useState<any[]>([]);
  const { itemId } = useParams<{ itemId: string }>();

  console.log("Item ID:", itemId);

  useEffect(() => {
    // Define the API endpoint for retrieving a single item
    const apiEndpoint = `${CONFIG.API_ENDPOINT}/api/get_product/${itemId}`;

    axios
      .get(apiEndpoint)
      .then((response) => {
        const item = response.data.item;
        setItemData(item);

        // Fetch images associated with the item's category(image_info in item)
        const categoryApiEndpoint = `${CONFIG.API_ENDPOINT}/api/images/category/${item.image_info}`;

        axios
          .get(categoryApiEndpoint)
          .then((categoryResponse) => {
            const images = categoryResponse.data.images;
            console.log("First Image:", images);
            setCategoryImages(images);
          })
          .catch((categoryError) => {
            console.error("Error fetching category images:", categoryError);
          });
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
    const IMAGE_SIZE = 350;
    const IMAGE_HEIGHT = 300;
    const AUTOPLAY_INTERVAL = 2000;
    const IMAGE_SPACING = 20;

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleArrowClick = () => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex + 2 >= categoryImages.length) return 0;
        return prevIndex + 1;
      });
    };

    useEffect(() => {
      window.addEventListener("resize", () => {
        dispatch(updateWindowWidth(window.innerWidth));
      });
      const autoplay = setInterval(() => {
        handleArrowClick();
      }, AUTOPLAY_INTERVAL);

      return () => clearInterval(autoplay); // Cleanup the interval when the component is unmounted
    }, [dispatch]);

    return (
      <div style={styles.imageCarouselContainer}>
        <h1>{itemData ? itemData.item_name : "Title"}</h1>
        <Image.PreviewGroup>
          <div style={styles.imageDisplay}>
            {categoryImages[currentIndex] && <Image width={IMAGE_SIZE} height={IMAGE_HEIGHT} src={`data:image/jpeg;base64, ${categoryImages[currentIndex].image_data}`} style={{ marginRight: `${IMAGE_SPACING}px` }} />}
            {categoryImages[currentIndex + 1] && <Image width={IMAGE_SIZE} height={IMAGE_HEIGHT} src={`data:image/jpeg;base64, ${categoryImages[currentIndex + 1].image_data}`} />}
            <button onClick={handleArrowClick} style={styles.imageNavigator}>
              ➔
            </button>
          </div>
        </Image.PreviewGroup>
        <section style={styles.productDetails}>
          <h2>Product Details</h2>
          <p>{itemData ? itemData.descriptions : "Description"}</p>
          <Button type="primary" shape="round" icon={<ContactsOutlined />} style={styles.contactBtn}>
            Contact Donor
          </Button>
        </section>
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

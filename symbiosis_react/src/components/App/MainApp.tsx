import { useEffect, useState } from "react";
import { Layout, Card, Avatar, Button, Col, Divider, Row } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import App from "../../routes/index";
import Topbar from "../Topbar";
import AppSidebar from "./AppSidebar";
import { NAV_STYLE_ABOVE_HEADER, NAV_STYLE_BELOW_HEADER, NAV_STYLE_DARK_HORIZONTAL, NAV_STYLE_DEFAULT_HORIZONTAL, NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_INSIDE_HEADER_HORIZONTAL, NAV_STYLE_MINI_SIDEBAR } from "../../constants/ThemeSetting";
import { updateWindowWidth } from "../../appRedux/actions";
import type { RootState } from "../../appRedux/store";
import CommonModal from "../Modal";
// import Dashboard from "../Dashboard/Index";

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
            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={6}>
                <div>
                  <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[
                      <Button key="add-to-cart" type="primary" icon={<ShoppingCartOutlined />}>
                        Add to Cart
                      </Button>
                    ]}
                  >
                    <Card.Meta avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />} title="Card title" description="This is the description" />
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div>
                  <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[
                      <Button key="add-to-cart" type="primary" icon={<ShoppingCartOutlined />}>
                        Add to Cart
                      </Button>
                    ]}
                  >
                    <Card.Meta avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />} title="Card title" description="This is the description" />
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div>
                  <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[
                      <Button key="add-to-cart" type="primary" icon={<ShoppingCartOutlined />}>
                        Add to Cart
                      </Button>
                    ]}
                  >
                    <Card.Meta avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />} title="Card title" description="This is the description" />
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div>
                  <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[
                      <Button key="add-to-cart" type="primary" icon={<ShoppingCartOutlined />}>
                        Add to Cart
                      </Button>
                    ]}
                  >
                    <Card.Meta avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />} title="Card title" description="This is the description" />
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div>
                  <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[
                      <Button key="add-to-cart" type="primary" icon={<ShoppingCartOutlined />}>
                        Add to Cart
                      </Button>
                    ]}
                  >
                    <Card.Meta avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />} title="Card title" description="This is the description" />
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div>
                  <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[
                      <Button key="add-to-cart" type="primary" icon={<ShoppingCartOutlined />}>
                        Add to Cart
                      </Button>
                    ]}
                  >
                    <Card.Meta avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />} title="Card title" description="This is the description" />
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div>
                  <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[
                      <Button key="add-to-cart" type="primary" icon={<ShoppingCartOutlined />}>
                        Add to Cart
                      </Button>
                    ]}
                  >
                    <Card.Meta avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />} title="Card title" description="This is the description" />
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={6}>
                <div>
                  <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[
                      <Button key="add-to-cart" type="primary" icon={<ShoppingCartOutlined />}>
                        Add to Cart
                      </Button>
                    ]}
                  >
                    <Card.Meta avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />} title="Card title" description="This is the description" />
                  </Card>
                </div>
              </Col>
            </Row>
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

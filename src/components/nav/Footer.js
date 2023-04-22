import React from 'react';
import {
    FacebookOutlined,
    TwitterOutlined,
    GoogleOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    GithubOutlined,
    HomeOutlined,
    MailOutlined,
    PhoneOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

let blue = "#6610f2"

const Footer = () => {
    return (
        <>
            <footer className="text-lg-start bg-light text-muted">
                <section className="d-flex justify-content-center justify-content-lg-between p-3 border-bottom">
                    <div className="d-none d-lg-block">
                        <span style={{fontSize:"20px"}}>mcu.in.th</span>
                    </div>
                    <div>
                        <a href style={{ color: "#3498DB", paddingLeft: "10px", fontSize:"24px" }}>
                            <FacebookOutlined />
                        </a>
                        <a href style={{ color: "#85C1E9", paddingLeft: "10px", fontSize:"24px" }}>
                            <TwitterOutlined />
                        </a>
                        <a href style={{ color: "#E74C3C", paddingLeft: "10px", fontSize:"24px" }}>
                            <GoogleOutlined />
                        </a>
                        <a href style={{ color: "#9B59B6", paddingLeft: "10px", fontSize:"24px" }}>
                            <InstagramOutlined />
                        </a>
                        <a href style={{ color: "#148F77", paddingLeft: "10px", fontSize:"24px" }}>
                            <LinkedinOutlined />
                        </a>
                        <a href style={{ color: "#2E4053", paddingLeft: "10px", fontSize:"24px" }}>
                            <GithubOutlined />
                        </a>
                    </div>
                </section>
                <section>
                    <div className="container-fluid text-md-start mt-4">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-3">
                                <h6 className="text-uppercase fw-bold mb-3">Description</h6>
                                <p>
                                    จำหน่ายอุปกรณ์อิเล็กทรอนิกส์ ไมโครคอนโทรลเลอร์ สมองกลฝังตัว  Internet of Things  Sensor หุ่นยนต์ และชุดควบคุม Module Board
                                    NodeMCU, ESP32, ESP8266, Arduino, Sensor PIC AVR
                                    (สินค้าโกดังในไทย ส่งถึงลูกค้าภายใน 1-3 วัน)
                                </p>
                            </div>
                            <div className="col-md-2 col-6 col-xl-2 mx-auto mb-3">
                                <h6 className="text-uppercase fw-bold mb-3">Products</h6>
                                <p className="mb-1"><a href="./#categories" className="text-reset">ประเภทสินค้า</a></p>
                                <p className="mb-1"><a href="./#new-arrivals" className="text-reset">สินค้าใหม่</a></p>
                                <p className="mb-1"><a href="./#best-sellers" className="text-reset">สินค้าขายดี</a></p>
                            </div>
                            <div className="col-md-3 col-6 col-xl-2 mx-auto mb-3">
                                <h6 className="text-uppercase fw-bold mb-3">About us</h6>
                                <p className="mb-1"><Link to="/shipping" className="text-reset">การจัดส่งสินค้า</Link></p>
                                <p className="mb-1"><Link to="/return-refund" className="text-reset">การคืนสินค้า/คืนเงิน</Link></p>
                                <p className="mb-1"><Link to="/order-cancel" className="text-reset">การยกเลิกการสั่งซื้อ</Link></p>
                                <p className="mb-1"><Link to="/policy" className="text-reset">นโยบายและเงื่อนไข</Link></p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-3">
                                <h6 className="text-uppercase fw-bold mb-3">Contact</h6>
                                <p className="mb-2"><HomeOutlined /> 486/25 ถนนเลียบคลองฯฝั่งเหนือ แขวงหนองแขม เขตหนองแขม กรุงเทพมหานคร 10160</p>
                                <p className="mb-1"><MailOutlined /> eleclabs@gmail.com</p>
                                <p className="mb-1"><PhoneOutlined /> 0928064949</p>
                                <p className="mb-1">ID Line: mcu.bz</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2023 Copyright : 
                    <a className="text-reset fw-bold" href="https://mcu.in.th/">https://mcu.in.th</a>
                </div>
            </footer>
        </>
    )
}



export default Footer;




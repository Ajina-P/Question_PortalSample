import React from "react";

const footerHeight = 100;
const footerEltMarginTop = 15;

const div1Style = {
    width: "100vw",
    height: `${footerHeight + footerEltMarginTop}px`,
    backgroundColor: "blue",
    marginTop: "30px",
    position: "absolute",
};

const div2Style = {
    width: "100%",
    position: "absolute",
    color: "white",
    height: `${footerHeight}px`,
    marginTop: `${footerEltMarginTop}px`,
};


export default function Footer() {
    return (
        <div style={{ width: "100%" }}>
            <div style={div1Style}></div>
            <div style={div2Style}>
                <div >
                    <h1 style={{ color: "white", textAlign: "center", alignItems: "center", marginTop: "50px" }}>
                        footer content
                    </h1>
                </div>
            </div>
        </div>
    );
}

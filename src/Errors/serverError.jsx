import { toast } from "react-toastify";

//this function is for show  500 internal server error;
export const showServerError = (message) => {
  toast.error(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h4 style={{ margin: 0, color: "#D8000C", fontWeight: "bold" }}>
        {message}
      </h4>
      <p style={{ margin: "5px 0 0", fontSize: "14px", color: "#666" }}>
        Sorry, our team is working on it. Please try again later.
      </p>
    </div>,
    {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "#FFD2D2",
        border: "1px solid #D8000C",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "10px",
      },
    }
  );
};

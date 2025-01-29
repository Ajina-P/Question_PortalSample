import { toast } from "react-toastify";

//this function is for show all errors from server, except 500 internal server error;
export const showCommonError = (message) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "12px 16px",
      borderRadius: "8px",
      backgroundColor: "#FFF7E6",
      border: "1px solid #FFA726",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
      width: "100%", // Ensures responsiveness
      maxWidth: "350px", // Limits the size for larger screens
      boxSizing: "border-box",
    },
    title: {
      margin: 0,
      color: "#D84315",
      fontWeight: "bold",
      fontSize: "16px", // Adjusted for readability
    },
    description: {
      margin: "8px 0 0",
      fontSize: "14px",
      color: "#555",
      lineHeight: "1.4",
    },
  };

  toast.error(
    <div style={styles.container}>
      <h4 style={styles.title}>{message}</h4>
      <p style={styles.description}>
        Sorry, some of your data is missing or something went wrong! Please try
        again later.
      </p>
    </div>,
    {
      position: "top-right",
      autoClose: 2500, // Slightly longer duration
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
};

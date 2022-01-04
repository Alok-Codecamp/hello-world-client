import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Contacts from "../../Components/Contacts/Contacts";
import Header from "../../Components/Header/Header";
import Navigation from "../../Components/Navigation/Navigation";
import Requests from "../../Components/Request/Requests";
import { useParams } from "react-router-dom";

const User = () => {
  let { id } = useParams();

  // load a single user
  const [singleUser, setSingleUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setSingleUser(data));
  }, [id]);

  const [userPostData, setUserPostData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => data.sort((a, b) => b.time - a.time))
      .then((data) => data.filter((x) => x.UID === id))
      .then((sortedData) => setUserPostData(sortedData));
  }, [id]);

  // convert date
  const handleDate = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${
      hours > 12 ? hours - 12 : hours
    }:${minutes}${ampm} ${day}/${month}/${year}`;
  };

  return (
    <div>
      <>
        <Header></Header>
        <Box
          sx={{
            display: { xs: "block", lg: "grid" },
            marginTop: "20px",
            marginBottom: "20px",
            gridTemplateColumns: "repeat(4,1fr)",
            gridGap: "10px",
          }}
        >
          {/* Left Rail */}
          <Box
            sx={{
              position: "relative",
              display: { xs: "block", lg: "flex" },
              justifyContent: "end",
            }}
          >
            <div>
              <Navigation></Navigation>
            </div>
          </Box>

          {/* Main Body */}
          <div
            style={{
              gridColumn: "span 2",
              padding: "20px",
            }}
          >
            <Box
              sx={{
                background: "white",
                borderRadius: "15px",
                padding: "20px",
                marginBottom: "50px",
              }}
            >
              <Box
                sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}
              >
                <Box sx={{ gridColumn: "span 2", padding: "20px" }}>
                  <Typography variant="h5">
                    {singleUser?.displayName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: "10px" }}
                  >
                    Welcome to my profile
                  </Typography>
                  <Box
                    sx={{
                      marginTop: "30px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6">500</Typography>
                      <Typography variant="overline">Likes</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6">100</Typography>
                      <Typography variant="overline">Followers</Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6">70</Typography>
                      <Typography variant="overline">Follows</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <img
                    src={singleUser?.photoURL}
                    alt="Kakku"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "15px",
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Repeat Start */}
            {userPostData.map((postData) => (
              <Box sx={{ marginBottom: "50px" }} key={postData._id}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(5,1fr)",
                      lg: "repeat(7,1fr)",
                    },
                    padding: "10px",
                    marginBottom: "5px",
                    background: "white",
                    borderRadius: "15px",
                  }}
                >
                  <Box>
                    <img
                      src={postData?.proImage}
                      alt="Kakku"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50px",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      gridColumn: { xs: "span 3", lg: "span 5" },
                      paddingLeft: { xs: "10px", lg: "0" },
                    }}
                  >
                    <Typography>{postData?.displayName}</Typography>
                    <Typography variant="caption">
                      {handleDate(postData?.time)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <IconButton
                      onClick={() => {
                        console.log("Delete");
                      }}
                      aria-label="settings"
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Box
                  sx={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "15px",
                  }}
                >
                  <Typography variant="body2">
                    {postData?.imgCaption
                      ? postData?.imgCaption
                      : postData?.postData}
                  </Typography>
                  <img
                    src={postData?.postImage}
                    alt=""
                    style={{
                      width: "100%",
                      marginTop: "20px",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              </Box>
            ))}
            {/* Repeat End */}
          </div>

          {/* Right Rail */}
          <div
            style={{
              padding: "20px",
              position: "relative",
            }}
          >
            <Requests></Requests>
            <Contacts></Contacts>
          </div>
        </Box>
      </>
    </div>
  );
};

export default User;
import React, { Fragment } from "react";
import { Grid, Typography, Paper, Box } from "@material-ui/core";
import RecipeReviewCard from "../CustomCard";
import { useMediaQuery } from "react-responsive";
import CustomCarousel from "../Carousel/Carousel";
import productService from "../../services/ProductServices";
import Skeleton from "@material-ui/lab/Skeleton";
import Pagination from "@material-ui/lab/Pagination";
import OrderFab from "../OrderFAB/OrderFab";
import CustomBackdrop from "../backdrop/CustomBackdrop";
const ShowWithSearch = (props) => {
  const [imgBuffer, setImgBuffer] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [deleted, setDeleted] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [loginProgress, setLoginProgress] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  //console.log(props);
  const apiGETproducts = () => {
    setNotFound(false);
    productService
      .getsingleProductByName(props.match.params.name, page, perPage)
      .then(function (data) {
        setProducts(data.product);
        setTotal(data.total);
        // setImgBuffer(data.img);
        setDeleted(false);
        setLoginProgress(false);
      })
      .catch(function (error) {
        setLoginProgress(false);
        setNotFound(true);
        console.log(error);
      });
  };
  React.useEffect(apiGETproducts, [props.match.params.name, deleted, page]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6} lg={4}></Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper>
            <Typography
              variant="h3"
              gutterBottom
              style={{ textAlign: "center" }}
            >
              {props.match.params.name}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}></Grid>
      </Grid>

      <Grid container spacing={1} align="center" justify="center">
        {notFound === false ? (
          products.length != 0 ? (
            products.map((product, index) => {
              return (
                <RecipeReviewCard
                  badge={props.badge}
                  setbadge={props.setbadge}
                  key={index}
                  image={product.image.data}
                  stock={product.stock}
                  product={product}
                  setProducts={setProducts}
                  setDeleted={setDeleted}
                ></RecipeReviewCard>
              );
            })
          ) : (
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((val, index) => {
              return (
                <div key={index} style={{ margin: "20px" }}>
                  <Skeleton variant="text" />
                  <Skeleton variant="circle" width={40} height={40} />
                  <Skeleton variant="rect" width={345} height={178} />
                </div>
              );
            })
          )
        ) : (
          <Typography variant="h5">
            Sorry product not found. Try with suggestions...
          </Typography>
        )}
      </Grid>
      <Grid container style={{ marginTop: "25px" }}>
        <CustomBackdrop open={loginProgress} setOpen={setLoginProgress} />
        {/* <Grid item xs={12} md={4} lg={4}></Grid>
        <Grid item xs={12} md={3} lg={3}></Grid>
        <Grid item xs={12} md={5} lg={5}>
          <Pagination
            onChange={(e, value) => {
              setPage(value);
            }}
            value={page}
            size="large"
            style={{ float: "right" }}
            count={10}
            color="secondary"
          />
        </Grid> */}
        <Grid item xs={12}>
          {/* <Box display="flex" justifyContent="" alignItems="right"> */}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Pagination
              style={{ float: "right" }}
              component="div"
              onChange={(e, value) => {
                setLoginProgress(true);
                setPage(value);
              }}
              value={page}
              size="large"
              count={Math.ceil(total / perPage)}
              color="secondary"
            />
            {/* </Box> */}
          </Box>
        </Grid>
      </Grid>
      {/* <OrderFab /> */}
    </div>
  );
};

export default ShowWithSearch;
// {products.length != 0
//   ? products.map((product, index) => {
//       return (
//         <Fragment key={index}>
//           {product.name == props.match.params.name ? (
//             <RecipeReviewCard
//               key={index}
//               badge={props.badge}
//               setbadge={props.setbadge}
//               image={product.image.data}
//               stock={product.stock}
//               product={product}
//             ></RecipeReviewCard>
//           ) : (
//             <></>
//           )}
//         </Fragment>
//       );
//     })
//   : [1, 1, 1, 1].map((val, index) => {
//       return (
//         <div key={index} style={{ margin: "20px" }}>
//           <Skeleton variant="text" />
//           <Skeleton variant="circle" width={40} height={40} />
//           <Skeleton variant="rect" width={345} height={178} />
//         </div>
//       );
//     })}
// );

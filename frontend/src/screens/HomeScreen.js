import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actionDispatchers/productsActions';
import { Col, Container, Row } from 'react-bootstrap';
import ProductCard from '../components/secondary components/ProductCard';

function HomeScreen(props) {

  const [run, setRun] = useState(false)
  const productsList = useSelector(state => state.productsList);
  const { loading, products, error } = productsList;
  const dispatcher = useDispatch()

  useEffect(() => {
  dispatcher(getProductsList());
    return () => {
          // cleanup
      }
  }, []);
  
  return (
    loading 
    ? 
    <div>Loading...</div>
    :
    error 
    ? 
    <div>{ error }</div>:
    <Container className="home-screen p-4">
      <Row>
        {
          products.map((product, index) => 
          <Col xs={12} sm={6} lg={4} key={product._id} className="p-4">
            <ProductCard key={product._id} product={product} run={run} setRun={setRun} />
          </Col> 
          ) 
        }
      </Row>
    </Container>
  )
      }



                 
              //             {/* products.map(product => 
              //                 <li key={product._id}>
              //                     <div className="product">
              //                         <div className="product-image-container">
              //                             <Link to={"/product/" + product._id}>
              //                                 <img className="product-image" src={product.image} alt='Product Pic'/>
              //                             </Link>
              //                         </div>
              //                         <Link to={"/product/" + product._id}>
              //                             <div className="product-name">{product.name}</div>
              //                         </Link>
              //                         <div className="product-brand">{product.brand}</div>
              //                         <div className="product-price">${product.price}</div>  
              //                         <div className="product-rating">{product.rating.noStars} ☆ from {product.rating.noReviews} Reviews</div>                  
              //                     </div>
              //                 </li>
              //             )
              //         }
              //     </ul>                  
              // </div> */}}
  


export default HomeScreen
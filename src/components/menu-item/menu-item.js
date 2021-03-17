import React, { useContext } from 'react';
import "semantic-ui-css/semantic.min.css";
import { Form, Button, Input, Label, Message, Dropdown,
  Grid, } from "semantic-ui-react";
import EthereumContext from "../../ethereumContext"; //no {}
import { withRouter } from 'react-router-dom';
import './menu-item.scss';
import {config} from '../../ethereum/config';
import { ReadFunc, buyNFTViaETH, buyNFTViaETHCheck, BalanceOf } from '../../ethereum/store';

const MenuItem = ({title, imageUrl, size, history, tokenIDs, match}) => {
  const compo = useContext(EthereumContext);
  let data1, isTokenOut = false;

  const tokenId = parseInt(title.replace("# ", ""));
  if(Array.isArray(tokenIDs) && tokenIDs.length > 0){
    console.log("here");
    isTokenOut  = tokenIDs.includes(tokenId);
  }
  console.log("tokenId:", tokenId, ", isTokenOut:", isTokenOut);
  
  const ItemLabel1 = (isTokenOut)?"Sold Out":"BUY NOW";
  const ItemStyle = (isTokenOut)?"SoldOut":"BUYNOW";

  if (config.isProduction !== 1) {
    imageUrl = "/img/3dgold1.png";
  }
  const buyNFTViaETH1 = async (event) => {
    event.preventDefault();
    console.log("---------== buyNFTViaETH1():", title);
    // setLoading(true);
    // setErrMsg("");

    const gasPrice = 1;
    const gasLimit = 1000000;

    data1 = await buyNFTViaETH(compo, gasPrice, gasLimit, tokenId).catch((err) => {
      //setErrMsg("buyNFTViaETH1 failed");
      return false;
    });
    console.log("txHash:", data1);
    window.location.reload();
  }
  
  return (
    <div 
      className={`${size} menu-item`} //dynamic classname
      onClick={(e)=> {
        console.log("clicked", title);
        buyNFTViaETH1(e);
        }}
      >
      
      <div className='background-image' 
      style={{backgroundImage: `url(${imageUrl})`  }} />

      <div className='content'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <span className={`${ItemStyle} subtitle`} >{ItemLabel1}</span>
      </div>

    </div>
  );
}
//export default (MenuItem);
export default withRouter(MenuItem);
/**
  onClick={()=> history.push(`${match.url}${linkUrl}`)
  
      <CustomButton onClick={()=> console.log("clicked")} inverted>
        Add to cart </CustomButton>

<div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
 */
import React, {useState, useContext, useEffect} from 'react';
import "semantic-ui-css/semantic.min.css";
import { Form, Button, Input, Label, Message, Dropdown,
  Grid, } from "semantic-ui-react";
import './homepage.scss';
import Directory from '../../components/directory/directory';
import Header from '../../components/header/header';
import EthereumContext from "../../ethereumContext"; //no {}
import {BalanceOf, CheckOwner, CheckSold } from '../../ethereum/store';
import { getTokenBalance, init, getGasData, getAFIBalance,} from '../../ethereum/ethFunc';
import { rewardsCtrtIdxes, dbSelections, config } from "../../ethereum/config";

const HomePage = ({history}) => {
  if(window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;

  const gasPriceDefault = 1;//GWei
  const gasLimitDefault = 1000000;
  const [compo, setCompo] = useState([]);

  const [gasPrice, setGasPrice] = useState(gasPriceDefault);
  const [gasLimit, setGasLimit] = useState(gasLimitDefault);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const userChoice = config.defaultUserChoice;
  let userAddrDefault;
  if(userChoice === 1) {
    userAddrDefault = config.user1;
  } else {
    userAddrDefault = config.user2;
  }
  const [userAddr, userAddrSet] = useState(userAddrDefault);

  const [contractIndex, setRewardsCtrtIndex] = useState(0);
  const [StopBettingOps1Va1, StopBettingOps1SetVa1] = useState("");
  const [StopBettingOps1ErrMsg, StopBettingOps1SetErrMsg] = useState("");

  //const compo = useContext(EthereumContext);
  const [nftBalance, nftBalanceSet] = useState(0);
  const [tokenIDs, tokenIDsSet] = useState([]);
  const [tokenIDsAvaiable, tokenIDsAvaiableSet] = useState([]);
  const [tokenIDsString, tokenIDsStringSet] = useState("");
  const [tokenIDsStrSold, tokenIDsStrSoldSet] = useState("");

  useEffect(() => {
    //cannot add async here, so make async below
    const initAction = async () => {
      const compo1 = await init().catch((err) => {
        console.error(`initAction failed: ${err}`);
        //alert(`initialization failed`);
        return;
      });
      // await BalanceOf1();
      // await CheckOwner1();
      // await CheckSold1();
      setCompo(compo1);

      if(!window.ethereum){
        console.error("window.ethereum does not exist")
        return;
      }
      const provider = window.ethereum;
      const isMetaMask2 = provider.isMetaMask;
      console.log("isMetaMask2:", isMetaMask2);
      
      provider.on('accountsChanged', (accounts) =>{
        console.log("accountsChanged:", accounts);
        if(accounts.length === 0){
          console.error("accounts are empty");
        }
        setCompo(prevCompo => [prevCompo[0], accounts, prevCompo[2], prevCompo[3]]);
      });
      
      provider.on('chainChanged', (chainId) => {
        console.log("App chainId:", chainId);
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });

    };
    initAction();
    //cannot add async here, so make async below
  }, []); //[] for running once
  
  const BalanceOf1 = async (event) => {
    if(event) event.preventDefault();
    console.log("---------== BalanceOf1()");
    // setLoading(true);
    // setErrMsg("");
    const data1 = await BalanceOf(compo).catch((err) => {
      //setErrMsg("BalanceOf1 failed");
      return false;
    });
    nftBalanceSet(data1);
  }

  const CheckOwner1 = async (event) => {
    if(event) event.preventDefault();
    console.log("---------== CheckOwner1()");
    // setLoading(true);
    // setErrMsg("");
    const data1 = await CheckOwner(compo).catch((err) => {
      //setErrMsg("CheckOwner1 failed");
      return false;
    });
    console.log("CheckOwner:", data1);
    const tokenIds = [];
    let tokenIdsString1 = "tokenIds: ";
    let tokenId = 0;
    data1.forEach((item,idx) => {
      if(item) {
        //console.log(idx);
        tokenId = idx + 1;
        tokenIds.push(tokenId);
        if(hasNumber(tokenIdsString1)){
          tokenIdsString1 += ", "+tokenId.toString();
        } else {
          tokenIdsString1 += tokenId.toString();
        }
      } else {
        
      }
    });
    console.log("tokenIds:", tokenIds, tokenIdsString1);
    tokenIDsSet(tokenIds);
    tokenIDsStringSet(tokenIdsString1);
  }

  const CheckSold1 = async (event) => {
    if(event) event.preventDefault();
    console.log("---------== CheckSold1()");
    // setLoading(true);
    // setErrMsg("");
    const data1 = await CheckSold(compo).catch((err) => {
      //setErrMsg("CheckOwner1 failed");
      return false;
    });
    console.log("CheckSold:", data1);
    const tokenIds = [];
    let tokenIdsString1 = "tokenIds: ";
    let tokenId = 0;
    data1.forEach((item,idx) => {
      if(!item) {
        //console.log(idx);
        tokenId = idx + 1;
        tokenIds.push(tokenId);
        if(hasNumber(tokenIdsString1)){
          tokenIdsString1 += ", "+tokenId.toString();
        } else {
          tokenIdsString1 += tokenId.toString();
        }
      } else {
        
      }
    });
    console.log("tokenIdsAvailable:", tokenIds, tokenIdsString1);
    tokenIDsAvaiableSet(tokenIds);
    tokenIDsStrSoldSet(tokenIdsString1);
  }
  function hasNumber(myString) {
    return /\d/.test(myString);
  }

  if (compo === undefined || compo.length !== 4) {
    console.log("compo failed");
    return <div>Connect With MetaMask</div>;
  
  } else {
  
  return (
  <div className='homepage'>
    <Header />
    <Label size={'huge'}> Under Construction </Label>
    <Form onSubmit={BalanceOf1} >
      <Button
        content="BalanceOf"
        primary
      />
      <Label size={'huge'}>{nftBalance} Freedom Reserve NFT</Label>
    </Form>
    <br></br>

    <Form onSubmit={CheckOwner1} >
      <Button
        content="Check Token Owner"
        primary
      />
      <Label size={'huge'}>{tokenIDsString}</Label>
    </Form>

    <br></br>
    <Directory rowNum={1} tokenIDs={tokenIDsAvaiable} history={history}/>
    <Directory rowNum={2} tokenIDs={tokenIDsAvaiable} history={history}/>
  </div>
  )}
};
/**
    <div>
      <ArrayBooleans array={checkOwnerArray} />
    </div>

  <HomePageHTML />
      <Header />
 */
export default HomePage;
import {
  MediaRenderer,
  useNetwork,
  useNetworkMismatch,
  useListing,
  useContract,
  useDirectListing,
  Web3Button,
  useAddress,
  useBalance,
  useTokenBalance,
} from "@thirdweb-dev/react";


import {
  ChainId,
  ListingType,
  Marketplace,
  NATIVE_TOKENS,
  NATIVE_TOKEN_ADDRESS,
} from "@thirdweb-dev/sdk";

import { BigNumber, ethers } from 'ethers';

import {
  tokenContractAddressGRD,
  tokenContractAddressUSDC,
  marketplaceContractAddress,
} from '@/config/contractAddresses';
//import { marketplaceContractAddress } from "../../addresses";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Image from '@/components/ui/image';

import LogoMomocon from '@/assets/images/logo-momocon.svg';

import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import AnchorLink from '@/components/ui/links/anchor-link';


import styles from "../../styles/Home.module.css";



const ListingPage: NextPage = () => {




  // Next JS Router hook to redirect to other pages and to grab the query from the URL (listingId)
  const router = useRouter();

  // De-construct listingId out of the router.query.
  // This means that if the user visits /listing/0 then the listingId will be 0.
  // If the user visits /listing/1 then the listingId will be 1.
  const { listingId } = router.query as { listingId: string };

  const address = useAddress();

  const { data: balance, isLoading: isLoadingBalance } = useBalance(NATIVE_TOKEN_ADDRESS);

  const { contract: tokenContractGRD } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalanceGRD } = useTokenBalance(tokenContractGRD, address);

  const { contract: tokenContractUSDC } = useContract(
    tokenContractAddressUSDC,
    'token'
  );
  const { data: tokenBalanceUSDC } = useTokenBalance(tokenContractUSDC, address);


  // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // Initialize the marketplace contract
  const { contract: marketplace } = useContract(marketplaceContractAddress, "marketplace-v3");

  // Fetch the listing from the marketplace contract
  /*
  const { data: listing, isLoading: loadingListing } = useListing(
    marketplace,
    listingId
  );
  */

  const {
    //mutateAsync: createDirectListing,
    data: directListing,
    isLoading: loadingListing,
    error,
  } = useDirectListing(marketplace, listingId);


  // Store the bid amount the user entered into the bidding textbox
  const [bidAmount, setBidAmount] = useState<string>("");



  /*
  if (loadingListing) {
    return <div className={styles.loadingOrError}>Loading...</div>;
  }

  if (!directListing) {
    return <div className={styles.loadingOrError}>Listing not found</div>;
  }
  */

  
  async function createBidOrOffer() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Polygon);
        return;
      }

      /*
      // If the listing type is a direct listing, then we can create an offer.
      if (listing?.type === ListingType.Direct) {
        await marketplace?.direct.makeOffer(
          listingId, // The listingId of the listing we want to make an offer for
          1, // Quantity = 1
          NATIVE_TOKENS[ChainId.Goerli].wrapped.address, // Wrapped Ether address on Goerli
          bidAmount // The offer amount the user entered
        );
      }
    */

      // If the listing type is an auction listing, then we can create a bid.
      /*
      if (directListing?.type === ListingType.Auction) {

        ////////await marketplace?.auction.makeBid(listingId, bidAmount);

      }
      */

      /*
      alert(
        `${
          directListing?.type === ListingType.Auction ? "Bid" : "Offer"
        } created successfully!`
      );
      */
     alert("Offer created successfully!");

    } catch (error) {
      console.error(error);
      alert(error);
    }
  }



  async function buyNft() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Polygon);
        return;
      }

      // Simple one-liner for buying the NFT
      /*
      await marketplace?.buyFromListing(listingId, 1);
      */

      // The ID of the listing you want to buy from
      //const listingId = 0;
      // Quantity of the asset you want to buy
      const quantityDesired = 1;

      const result = await marketplace?.directListings.buyFromListing(listingId, quantityDesired, address);

      console.log("result", result);

      alert("NFT bought successfully!");

    } catch (error) {
      console.error(error);
      alert(error);
    }
  }



  interface IProduct {
    trait_type: string;
    value: string;
  }

  const initialProducts: IProduct[] = [ 
  ]

  //let attributeData: AttributeListProps[];

  //const [nftData, setNftData] = useState();
  const [nftAttributes, setNftAttributes] = useState(initialProducts);

  useEffect(() => {

    const getNFT = async () => {
      
      if (directListing?.asset.uri) {
          const res = await fetch(directListing?.asset.uri);
          ///const res = await fetch('/apiBlogPosts');
          const data = await res.json();

          setNftAttributes(data?.attributes);


          console.log("data", data);
      }
      
    };

    getNFT();

  }, [directListing?.asset.uri]);
  


  return (

    <div className="mt-32 flex flex-col justify-center items-center ">

      


        {address &&
        <>

        {/*
        <h3>
          <b>
            {!balance?.value
              ? 'Loading...'
              : Number(
                  ethers.utils.formatUnits(balance?.value, 18)
                ).toFixed(2)}
          </b>{' '}
          {balance?.symbol}
        </h3>
              */}
              {/*
        <h3>
          My Balance: <b>{Number(tokenBalanceGRD?.displayValue).toFixed(2)}</b>{' '}
          {tokenBalanceGRD?.symbol}
        </h3>
            */}
        
        {/*
        <h3>
          My Balance: <b>{Number(tokenBalanceUSDC?.displayValue).toFixed(2)}</b>{' '}
          {tokenBalanceUSDC?.symbol}
        </h3>
          */}


        </>
        }
        

 

          <h2 className="mb-5">
            {directListing?.asset.name}
          </h2>

          <div className="flex flex-row">

            <div className="mb-5">
              <MediaRenderer
                src={directListing?.asset.image}
                className="bg-cover w-80 h-80 rounded-lg"
              />
            </div>

            <div className="flex flex-col ml-5">
              
              <div className="flex flex-col">

                {/*nftData?.attributes*/}

                {nftAttributes?.map((attribute, index) => (
                  <div
                    className="mb-1 flex flex-col items-left justify-center"
                    key={index}
                  >

                    <div className="flex flex-row gap-5">
                      <span>{attribute.trait_type}</span>
                      <span>{attribute.value}</span>
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

          <p className="m-5">
            Owned by{" "}
            <b>
              {/*
              {directListing.sellerAddress?.slice(0, 6) +
                "..." +
                directListing.sellerAddress?.slice(36, 40)}
              */}
                {directListing?.creatorAddress?.slice(0, 6) +
                "..." +
                directListing?.creatorAddress?.slice(36, 40)}
            </b>
          </p>

          <h2 className="m-5">
            {/*
            <b>{directListing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
            {directListing.buyoutCurrencyValuePerToken.symbol}
                */}
            <b>{directListing?.currencyValuePerToken.displayValue}</b>{" "}
            {directListing?.currencyValuePerToken.symbol}
          </h2>

          <div className="mb-10">

{/*
            <button
              style={{ borderStyle: "none" }}
              className={styles.mainButton}
              onClick={buyNft}
            >
              Buy
            </button>
          */}

          {directListing?.quantity === "0" ?
            <div>
              Sell completed.
            </div>
          :

          <Web3Button
            theme="dark"
            action={(contract) =>
              ////contract?.call('withdraw', [[nft.metadata.id]])
              buyNft()

            }
            contractAddress={marketplaceContractAddress}
          >
            Buy
          </Web3Button>

          }



            {/*
            <p style={{ color: "grey" }}>|</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <input
                type="text"
                name="bidAmount"
                className={styles.textInput}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Amount"
                style={{ marginTop: 0, marginLeft: 0, width: 128 }}
              />
              <button
                className={styles.mainButton}
                onClick={createBidOrOffer}
                style={{
                  borderStyle: "none",
                  background: "transparent",
                  width: "fit-content",
                }}
              >
                Make Offer
              </button>
            </div>
              */}

        </div>


    </div>
  );
};

export default ListingPage;

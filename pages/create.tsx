
/*
import {
  useContract,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
*/

import {
  useCreateDirectListing,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";

import {
  ChainId,
  NATIVE_TOKEN_ADDRESS,
  TransactionResult,
} from "@thirdweb-dev/sdk";

import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  marketplaceContractAddress,
} from '@/config/contractAddresses';

//import { marketplaceContractAddress } from "../addresses";

import styles from "../styles/Home.module.css";

const Create: NextPage = () => {

  // Next JS Router hook to redirect to other pages
  const router = useRouter();
  /*
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  */

  // Connect to our marketplace contract via the useContract hook
  ///const { contract: marketplace } = useContract(marketplaceContractAddress, "marketplace");

  const { contract: marketplace } = useContract(marketplaceContractAddress, "marketplace-v3");

  const {
    mutateAsync: createDirectListing,
    isLoading,
    error,
  } = useCreateDirectListing(marketplace);


  // This function gets called when the form is submitted.
  /*
  async function handleCreateListing(e: any) {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Goerli);
        return;
      }

      // Prevent page from refreshing
      e.preventDefault();

      // Store the result of either the direct listing creation or the auction listing creation
      let transactionResult: undefined | TransactionResult = undefined;

      // De-construct data from form submission
      const { listingType, contractAddress, tokenId, price } =
        e.target.elements;

      // Depending on the type of listing selected, call the appropriate function
      // For Direct Listings:
      if (listingType.value === "directListing") {
        transactionResult = await createDirectListing(
          contractAddress.value,
          tokenId.value,
          price.value
        );
      }

      // For Auction Listings:
      if (listingType.value === "auctionListing") {
        transactionResult = await createAuctionListing(
          contractAddress.value,
          tokenId.value,
          price.value
        );
      }

      // If the transaction succeeds, take the user back to the homepage to view their listing!
      if (transactionResult) {
        router.push(`/`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function createAuctionListing(
    contractAddress: string,
    tokenId: string,
    price: string
  ) {
    try {
      const transaction = await marketplace?.auction.createListing({
        assetContractAddress: contractAddress, // Contract Address of the NFT
        buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        reservePricePerToken: 0, // Minimum price, users cannot bid below this amount
        startTimestamp: new Date(), // When the listing will start
        tokenId: tokenId, // Token ID of the NFT.
      });

      return transaction;
    } catch (error) {
      console.error(error);
    }
  }

  async function createDirectListing(
    contractAddress: string,
    tokenId: string,
    price: string
  ) {
    try {
      const transaction = await marketplace?.direct.createListing({
        assetContractAddress: contractAddress, // Contract Address of the NFT
        buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        startTimestamp: new Date(0), // When the listing will start
        tokenId: tokenId, // Token ID of the NFT.
      });

      return transaction;
    } catch (error) {
      console.error(error);
    }
  }
  */


  return (


      <div className={styles.container}>



        <div className={styles.collectionContainer}>
          <h1 className={styles.ourCollection}>
            Upload your NFT to the marketplace:
          </h1>






          <Web3Button
            theme="dark"
            contractAddress={marketplaceContractAddress}
            action={() =>
              createDirectListing({
                assetContractAddress: "{{asset_contract_address}}",
                tokenId: "{{token_id}}",
                pricePerToken: "{{price_per_token}}",
                currencyContractAddress: "{{currency_contract_address}}",
                isReservedListing: false,
                quantity: "{{quantity}}",
                startTimestamp: new Date(),
                endTimestamp: new Date(
                  new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
                ),
              })
            }
          >
            Create Direct Listing
          </Web3Button>

          

        </div>
      </div>



  );

};

export default Create;

import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  MediaRenderer,
  useValidDirectListings,
  useContract,
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


import { useRouter } from "next/router";

import {
  tokenContractAddressGRD,
  tokenContractAddressUSDC,
  marketplaceContractAddress,
} from '@/config/contractAddresses';

//import { marketplaceContractAddress } from "../addresses";

import Image from '@/components/ui/image';

import LogoMomocon from '@/assets/images/logo-momocon.svg';

import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import AnchorLink from '@/components/ui/links/anchor-link';

const Home: NextPage = () => {
  const router = useRouter();

  /////const { contract: marketplace } = useContract(marketplaceContractAddress, "marketplace");

  const { contract: marketplace } = useContract(marketplaceContractAddress, "marketplace-v3");

  ////const { data: listings, isLoading: loadingListings } = useValidDirectListings(marketplace);

  const {
    data: directListings,
    isLoading: loadingListings,
    error,
  } = useValidDirectListings(marketplace);


  
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


  //console.log("directListings", directListings);

  return (
    <>

      {/* Content */}
      <div className={styles.container}>

        {/* Top Section */}
        <h3>GRANDERBY Marketplace</h3>

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
        
        <h3>
          My Balance: <b>{Number(tokenBalanceUSDC?.displayValue).toFixed(2)}</b>{' '}
          {tokenBalanceUSDC?.symbol}
        </h3>
              

        
        {/*
        <p className={styles.explain}>
          Build an NFT marketplace using{" "}
          <b>
            {" "}
            <a
              href="https://thirdweb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.purple}
            >
              thirdweb
            </a>
          </b>{" "}
          to list your ERC721 and ERC1155 tokens for auction or for direct sale.
        </p>
  */}

        </>
        }

        <hr className={styles.divider} />

{/*
        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <Link href="/create" className={styles.mainButton} style={{ textDecoration: "none" }}>
            Create A Listing
          </Link>
        </div>
*/}

        <div style={{ marginBottom: 200}}>
          {
            // If the listings are loading, show a loading message
            loadingListings ? (
              <div>Loading listings...</div>
            ) : (

              // Otherwise, show the listings
              <div className={styles.listingGrid}>
                {directListings?.map((listing) => (
                  <div
                    key={listing.id}
                    className={styles.listingShortView}
                    onClick={() => router.push(`/listing/${listing.id}`)}
                  >

                    <h2 className={styles.nameContainer}>
                      
                      <Link href={`/listing/${listing.id}`} className={styles.name}>
                      
                        {listing.asset.name}
                        
                      </Link>
                        
                    </h2>

                    <MediaRenderer
                      src={listing.asset.image}
                      style={{
                        borderRadius: 16,
                        // Fit the image to the container
                        width: "100%",
                        height: "100%",
                        padding: "10px",
                      }}
                    />



                    <p>
                      <b>{listing.currencyValuePerToken.displayValue}</b>{" "}
                      {listing.currencyValuePerToken.symbol}
                    </p>
                    
                    
                  </div>
                ))}
              </div>
            )

          }

        </div>

        <hr className={styles.divider} />

        <footer>

            <div className="flex-cols mt-10 flex items-center justify-center gap-3 bg-gray-800 pb-5 pt-10 text-white ">
              <div>Copyright ©MOMOCON</div>

{/*
              <AnchorLink href="/terms">Terms of Service</AnchorLink>

              <div>Privacy Policy</div>
        */}
            </div>

{/*
            <div className=" flex-cols flex items-center justify-center gap-3 bg-gray-800 pb-20 pt-3 text-white ">
              <div>
                <Image src={LogoMomocon} alt="MOMOCON" width={48} height={48} />
              </div>

              <AnchorLink
                href="https://www.instagram.com/nftgranderby"
                target="_blank"
                className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </AnchorLink>
              <AnchorLink
                href="https://twitter.com/nftgranderby"
                target="_blank"
                className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
              >
                <Twitter className="h-4 w-4" /> Twitter
              </AnchorLink>
            </div>
      */}



      </footer>


      </div>



    </>
  );
};

export default Home;
